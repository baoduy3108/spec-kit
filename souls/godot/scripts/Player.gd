extends CharacterBody2D
## The Lamplighter.
##
## This is a port of the state machine in src/rules.js, not a reinterpretation
## of it. Every duration, cost, reach and speed is read out of Data at _ready
## and never written down here. The design law the sim is built on holds:
## recovery is longer than the active frames, so everything is punishable, and
## the wind-up is long enough to read.

signal died()
signal hp_changed(hp: float, max_hp: float)
signal stamina_changed(stam: float, max_stam: float)

enum St { IDLE, WALK, ROLL, ATTACK, GUARD, HURT, STAGGER, DRINK, DEAD }

var K: Dictionary          ## the player block out of rules.json
var state: int = St.IDLE
var t: float = 0.0         ## time in the current state
var facing: int = 1
var hp: float
var max_hp: float
var stamina: float
var max_stamina: float
var swing: int = 0
var hit_landed: bool = false
var flasks: int = 3

var _regen_lock: float = 0.0

func _ready() -> void:
	K = Data.player()
	max_hp = float(K.hp)
	max_stamina = float(K.stamina)
	hp = max_hp
	stamina = max_stamina
	hp_changed.emit(hp, max_hp)
	stamina_changed.emit(stamina, max_stamina)

func _physics_process(delta: float) -> void:
	if state == St.DEAD:
		return
	t += delta
	_regen(delta)
	_advance(delta)
	_fall(delta)
	move_and_slide()

## There was no gravity in this file at all. velocity.y was never written, so
## the figure hung wherever it was spawned and every hole in every room was
## decorative. The preview built out of godot/data caught it on the first frame
## it drew, which is the entire reason that tool exists.
func _fall(delta: float) -> void:
	if is_on_floor():
		velocity.y = 0.0
	else:
		velocity.y += float(Data.rules.gravity) * delta

# --- stamina --------------------------------------------------------------

func _regen(delta: float) -> void:
	_regen_lock = maxf(0.0, _regen_lock - delta)
	if _regen_lock > 0.0 or state == St.GUARD:
		return
	var rate: float = float(K.block.regen) * (1.0 if state != St.ROLL else 0.0)
	stamina = minf(max_stamina, stamina + rate * delta)
	stamina_changed.emit(stamina, max_stamina)

func _spend(cost: float) -> bool:
	if stamina < cost:
		return false
	stamina -= cost
	_regen_lock = 0.55
	stamina_changed.emit(stamina, max_stamina)
	return true

# --- the machine ----------------------------------------------------------

func can_act() -> bool:
	return state in [St.IDLE, St.WALK, St.GUARD]

func is_invulnerable() -> bool:
	return state == St.ROLL and t >= float(K.roll.iFrom) and t <= float(K.roll.iTo)

func _enter(s: int) -> void:
	state = s
	t = 0.0
	hit_landed = false

func _advance(delta: float) -> void:
	match state:
		St.ROLL:
			var roll: Dictionary = K.roll
			velocity.x = facing * float(roll.speed)
			if t >= float(roll.time):
				_enter(St.IDLE)
		St.ATTACK:
			var sw: Dictionary = K.swings[swing]
			velocity.x = move_toward(velocity.x, 0.0, 900.0 * delta)
			var total: float = float(sw.windup) + float(sw.active) + float(sw.recover)
			if t >= total:
				_enter(St.IDLE)
		St.HURT, St.STAGGER, St.DRINK:
			velocity.x = move_toward(velocity.x, 0.0, 1400.0 * delta)
			var lock := 0.28 if state == St.HURT else (float(K.parry.stagger) if state == St.STAGGER else 0.7)
			if t >= lock:
				_enter(St.IDLE)
		_:
			_walk(delta)

func _walk(_delta: float) -> void:
	var dir := Input.get_axis("move_left", "move_right")
	if Input.is_action_pressed("guard") and stamina > 0.0:
		if state != St.GUARD:
			_enter(St.GUARD)
		velocity.x = dir * float(K.speed) * 0.45
		if dir != 0.0:
			facing = 1 if dir > 0.0 else -1
		return
	if state == St.GUARD:
		_enter(St.IDLE)
	velocity.x = dir * float(K.speed)
	if dir != 0.0:
		# not int(dir): a stick at 0.4 truncates to 0 and the figure faces nowhere
		facing = 1 if dir > 0.0 else -1
		if state == St.IDLE:
			_enter(St.WALK)
	elif state == St.WALK:
		_enter(St.IDLE)

func _unhandled_input(event: InputEvent) -> void:
	# Test the event itself. Mixing _unhandled_input with Input.is_action_just_
	# pressed reads global state on an event frame, which double-fires on some
	# devices and drops the input entirely on others.
	if event.is_echo() or not can_act():
		return
	if event.is_action_pressed("roll") and _spend(float(K.roll.cost)):
		_enter(St.ROLL)
	elif event.is_action_pressed("attack_light"):
		_try_swing(0)
	elif event.is_action_pressed("attack_heavy"):
		_try_swing(1)
	elif event.is_action_pressed("flask") and flasks > 0:
		flasks -= 1
		hp = minf(max_hp, hp + max_hp * 0.4)
		hp_changed.emit(hp, max_hp)
		_enter(St.DRINK)

func _try_swing(which: int) -> void:
	var sw: Dictionary = K.swings[which]
	if not _spend(float(sw.cost)):
		return
	swing = which
	_enter(St.ATTACK)

## The window in which the blade is actually out. Everything before it is the
## tell the enemy gets; everything after it is the punish the player gets.
func active_now() -> bool:
	if state != St.ATTACK:
		return false
	var sw: Dictionary = K.swings[swing]
	return t >= float(sw.windup) and t < float(sw.windup) + float(sw.active)

func reach() -> Vector2:
	var sw: Dictionary = K.swings[swing]
	return Vector2(float(sw.reach[0]), float(sw.reach[1]))

func swing_damage() -> float:
	return float(K.swings[swing].damage)

# --- taking it ------------------------------------------------------------

func take(damage: float, from_x: float) -> void:
	if state == St.DEAD or is_invulnerable():
		return
	var dealt := damage
	# not signi(int(...)): a sub-pixel difference truncates to zero, and the
	# guard then silently fails at exactly the range you fight at
	var side := 1 if from_x > global_position.x else -1
	if state == St.GUARD and side == facing:
		dealt = damage * (1.0 - float(K.block.soak))
		var drain := damage * float(K.block.stamPerDamage)
		stamina = maxf(0.0, stamina - drain)
		stamina_changed.emit(stamina, max_stamina)
		if stamina <= 0.0:
			_enter(St.STAGGER)
		_regen_lock = 0.6
	else:
		_enter(St.HURT)
	hp = maxf(0.0, hp - dealt)
	hp_changed.emit(hp, max_hp)
	if hp <= 0.0:
		state = St.DEAD
		died.emit()
