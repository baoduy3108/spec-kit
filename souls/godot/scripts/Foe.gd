extends CharacterBody2D
## One foe, driven entirely by its row in foes.json.
##
## The one thing every foe in this game shares is the tell: the wind-up is long
## enough to read and the recovery is longer than the active frames. A foe that
## breaks either of those is a foe the player cannot learn, so both come out of
## the data and neither is written down here.

signal killed(essence: int)

enum St { IDLE, WALK, WINDUP, ACTIVE, RECOVER, HURT, DEAD }

var id: String
var F: Dictionary
var state: int = St.IDLE
var t: float = 0.0
var facing: int = -1
var hp: float
var poise: float
var home_x: float
var target: Node2D

const AGGRO := 260.0

func setup(foe_id: String) -> void:
	id = foe_id
	F = Data.foes[foe_id]
	hp = float(F.hp)
	poise = float(F.poise)

func _ready() -> void:
	home_x = global_position.x

func _physics_process(delta: float) -> void:
	if state == St.DEAD:
		return
	t += delta
	_think(delta)
	move_and_slide()

func _think(delta: float) -> void:
	var to_player := 9999.0
	if is_instance_valid(target):
		to_player = target.global_position.x - global_position.x
	match state:
		St.WINDUP:
			velocity.x = 0.0
			if t >= float(F.windup):
				_enter(St.ACTIVE)
		St.ACTIVE:
			velocity.x = 0.0
			if t >= 0.12:
				_enter(St.RECOVER)
		St.RECOVER:
			# Longer than the active frames. This is the whole contract: every
			# swing a foe makes is a window the player is owed.
			velocity.x = 0.0
			if t >= float(F.windup) * 0.9 + 0.2:
				_enter(St.IDLE)
		St.HURT:
			velocity.x = move_toward(velocity.x, 0.0, 1200.0 * delta)
			if t >= 0.24:
				_enter(St.IDLE)
		_:
			_patrol(to_player)

func _patrol(to_player: float) -> void:
	if absf(to_player) < AGGRO and is_instance_valid(target):
		facing = signi(int(to_player)) if to_player != 0.0 else facing
		var strike := float(F.reach) * 46.0
		if absf(to_player) <= strike:
			_enter(St.WINDUP)
			velocity.x = 0.0
			return
		velocity.x = facing * float(F.speed)
		_enter(St.WALK)
		return
	# no target in range: hold the ground it was placed on
	var drift := home_x - global_position.x
	if absf(drift) > 4.0:
		velocity.x = signf(drift) * float(F.speed) * 0.4
		facing = 1 if drift > 0.0 else -1
	else:
		velocity.x = 0.0
		_enter(St.IDLE)

func _enter(s: int) -> void:
	if state == s:
		return
	state = s
	t = 0.0

## True only while the blow is out. Drawn as the red flash; read by Game.gd.
func striking() -> bool:
	return state == St.ACTIVE

func damage() -> float:
	return float(F.damage)

func strike_reach() -> float:
	return float(F.reach) * 46.0

func take(amount: float) -> void:
	if state == St.DEAD:
		return
	hp -= amount
	poise -= amount
	if hp <= 0.0:
		state = St.DEAD
		killed.emit(int(F.essence))
		queue_free()
		return
	if poise <= 0.0:
		poise = float(F.poise)
		_enter(St.HURT)
