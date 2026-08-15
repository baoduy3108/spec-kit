extends Node2D
## The game. Walks the rooms of an area in order, builds each one out of the
## exported data, spawns whatever world.js says lives there, and resolves hits
## against the reaches the sim uses.

const AREA := "undercroft"

var rooms: Array = []
var index: int = 0
var room_node: Node2D
var player: CharacterBody2D
var foes: Array = []
var essence: int = 0

var _hud: CanvasLayer
var _hp_bar: ColorRect
var _st_bar: ColorRect
var _caption: Label

func _ready() -> void:
	rooms = Data.rooms_of(AREA)
	_build_hud()
	_spawn_player()
	_enter_room(0)

# --- rooms ----------------------------------------------------------------

func _enter_room(i: int) -> void:
	index = clampi(i, 0, rooms.size() - 1)
	if room_node:
		room_node.queue_free()
	for f in foes:
		if is_instance_valid(f):
			f.queue_free()
	foes.clear()

	var r: Dictionary = rooms[index]
	room_node = preload("res://scripts/Room.gd").new()
	add_child(room_node)
	room_node.build(r)

	player.global_position = Vector2(Data.units_per_metre() * 2.2, -90.0)
	player.velocity = Vector2.ZERO
	_spawn_foes(r)
	_light(r)
	_caption.text = "%s — %s" % [_vi(r.name, r.id), _vi(r.line, "")]

func _vi(d: Variant, fallback: String) -> String:
	if d is Dictionary and d.has("vi"):
		return str(d["vi"])
	return fallback

## Where a foe stands, from the room's own layout tag. The table is not here —
## it is the same one tools/draw.js draws the blockout with, exported into
## rules.json, so the sheet and the level cannot disagree about where a fight
## takes place.
func _spawn_foes(r: Dictionary) -> void:
	var at: Array = Data.rules.placement[r.layout]
	var i := 0
	for foe_id in r.foes:
		var f := CharacterBody2D.new()
		f.set_script(preload("res://scripts/Foe.gd"))
		var shape := CollisionShape2D.new()
		var cap := CapsuleShape2D.new()
		var tall := 34.0 if Data.foes[foe_id].family == "hound" else 58.0
		cap.height = tall
		cap.radius = 13.0
		shape.shape = cap
		shape.position = Vector2(0, -tall * 0.5)
		f.add_child(shape)
		var body := ColorRect.new()
		body.size = Vector2(26.0, tall)
		body.position = Vector2(-13.0, -tall)
		body.color = Color(0.78, 0.33, 0.25, 0.85)
		f.add_child(body)
		add_child(f)
		f.setup(foe_id)
		f.global_position = Vector2(at[i % at.size()] * Data.units_per_metre(), -60.0)
		f.target = player
		f.killed.connect(_on_killed)
		foes.append(f)
		i += 1

func _on_killed(gained: int) -> void:
	essence += gained

func _light(r: Dictionary) -> void:
	# no fallback on purpose: the exporter guarantees every tag is here, and
	# a default would turn a missing one into a room that is quietly wrong
	var lit: float = Data.rules.light_levels[r.light]
	RenderingServer.set_default_clear_color(Color(0.04, 0.05, 0.07).lerp(Color(0.10, 0.12, 0.16), lit))

# --- player ---------------------------------------------------------------

func _spawn_player() -> void:
	player = CharacterBody2D.new()
	player.set_script(preload("res://scripts/Player.gd"))
	var shape := CollisionShape2D.new()
	var cap := CapsuleShape2D.new()
	cap.height = 68.0
	cap.radius = 14.0
	shape.shape = cap
	shape.position = Vector2(0, -34.0)
	player.add_child(shape)
	var body := ColorRect.new()
	body.size = Vector2(28.0, 68.0)
	body.position = Vector2(-14.0, -68.0)
	body.color = Color(0.49, 0.83, 0.91, 0.9)
	player.add_child(body)
	add_child(player)
	player.hp_changed.connect(func(hp, mx): _hp_bar.size.x = 260.0 * hp / mx)
	player.stamina_changed.connect(func(s, mx): _st_bar.size.x = 200.0 * s / mx)
	player.died.connect(func(): _caption.text = "Bạn đã chết. R để thử lại.")

# --- the loop -------------------------------------------------------------

func _physics_process(_delta: float) -> void:
	_resolve_hits()
	_check_exit()

func _resolve_hits() -> void:
	if player.active_now() and not player.hit_landed:
		var reach := player.reach()
		for f in foes:
			if not is_instance_valid(f):
				continue
			var dx := (f.global_position.x - player.global_position.x) * player.facing
			if dx >= reach.x and dx <= reach.y:
				f.take(player.swing_damage())
				player.hit_landed = true
	for f in foes:
		if not is_instance_valid(f) or not f.striking():
			continue
		var dx: float = absf(player.global_position.x - f.global_position.x)
		if dx <= f.strike_reach():
			player.take(f.damage(), f.global_position.x)

func _check_exit() -> void:
	var w := Data.room_width()
	if player.global_position.x > w - 24.0 and index < rooms.size() - 1:
		_enter_room(index + 1)
	elif player.global_position.x < 24.0 and index > 0:
		_enter_room(index - 1)

func _unhandled_key_input(event: InputEvent) -> void:
	if event.is_pressed() and event is InputEventKey and event.keycode == KEY_R:
		get_tree().reload_current_scene()

# --- hud ------------------------------------------------------------------

func _build_hud() -> void:
	_hud = CanvasLayer.new()
	add_child(_hud)
	var back := ColorRect.new()
	back.position = Vector2(24, 22)
	back.size = Vector2(260, 14)
	back.color = Color(0.1, 0.05, 0.05)
	_hud.add_child(back)
	_hp_bar = ColorRect.new()
	_hp_bar.position = Vector2(24, 22)
	_hp_bar.size = Vector2(260, 14)
	_hp_bar.color = Color(0.72, 0.24, 0.2)
	_hud.add_child(_hp_bar)

	var sback := ColorRect.new()
	sback.position = Vector2(24, 42)
	sback.size = Vector2(200, 9)
	sback.color = Color(0.06, 0.09, 0.07)
	_hud.add_child(sback)
	_st_bar = ColorRect.new()
	_st_bar.position = Vector2(24, 42)
	_st_bar.size = Vector2(200, 9)
	_st_bar.color = Color(0.52, 0.68, 0.4)
	_hud.add_child(_st_bar)

	_caption = Label.new()
	_caption.position = Vector2(24, 660)
	_caption.size = Vector2(1200, 40)
	_caption.add_theme_color_override("font_color", Color(0.78, 0.82, 0.88))
	_hud.add_child(_caption)

	var cam := Camera2D.new()
	cam.position = Vector2(Data.room_width() * 0.5, -120.0)
	cam.zoom = Vector2(1.35, 1.35)
	add_child(cam)
	cam.make_current()
