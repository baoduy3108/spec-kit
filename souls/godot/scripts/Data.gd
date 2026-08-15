extends Node
## Autoload. The whole design, loaded once, straight out of the JSON that
## tools/godot.js generates from src/. Nothing in this project may hard-code a
## number that also lives in src/ — if it does, the two drift and the tests that
## guard the design stop guarding anything.

var rules: Dictionary
var world: Dictionary
var foes: Dictionary
var hero: Dictionary
var abilities: Dictionary

var rooms_by_id: Dictionary = {}
var areas_by_id: Dictionary = {}

func _ready() -> void:
	rules = _load("rules")
	world = _load("world")
	foes = _load("foes")
	hero = _load("hero")
	abilities = _load("abilities")
	for r in world.rooms:
		rooms_by_id[r.id] = r
	for a in world.areas:
		areas_by_id[a.id] = a
	print("[data] %d khu · %d phòng · %d loại quái" % [world.areas.size(), world.rooms.size(), foes.size()])

func _load(name: String) -> Dictionary:
	var path := "res://data/%s.json" % name
	var f := FileAccess.open(path, FileAccess.READ)
	assert(f != null, "thiếu %s — chạy `npm run godot`" % path)
	var parsed: Variant = JSON.parse_string(f.get_as_text())
	assert(parsed is Dictionary, "%s hỏng" % path)
	return parsed

## The player's constants, verbatim from rules.js KNIGHT.
func player() -> Dictionary:
	return rules.player

func units_per_metre() -> float:
	return float(rules.units_per_metre)

func room_width() -> float:
	return float(rules.room_width)

func rooms_of(area_id: String) -> Array:
	var out: Array = []
	for r in world.rooms:
		if r.area == area_id:
			out.append(r)
	return out
