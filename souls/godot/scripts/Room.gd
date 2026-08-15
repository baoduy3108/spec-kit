extends Node2D
## Builds one room's collision out of the terrain profile that tools/godot.js
## exported from tools/draw.js. The blockout and the playable room are the same
## geometry — if a hole is too wide to cross in the blockout, it is too wide to
## cross here, and the test that walks all 368 rooms catches it before either.

var room: Dictionary

const WALL_H := 320.0
const DEPTH := 260.0

func build(r: Dictionary) -> void:
	room = r
	var runs := _runs(r.terrain)
	for run in runs:
		_solid(run)
	for l in r.get("ledges", []):
		_ledge(float(l[0]), float(l[1]), float(l[2]))
	_walls()

## A ledge: solid, thin, and standing off the wall. The rooms were flat until
## the sim had a jump, so none of this existed and 14 metres of ceiling was
## paint nobody could reach.
func _ledge(x0: float, x1: float, y: float) -> void:
	var body := StaticBody2D.new()
	var shape := CollisionShape2D.new()
	var rect := RectangleShape2D.new()
	rect.size = Vector2(x1 - x0, 14.0)
	shape.shape = rect
	shape.position = Vector2((x0 + x1) * 0.5, y + 7.0)
	body.add_child(shape)
	add_child(body)

	var draw := ColorRect.new()
	draw.position = Vector2(x0, y)
	draw.size = Vector2(x1 - x0, 14.0)
	draw.color = Color(0.14, 0.17, 0.22)
	add_child(draw)
	var edge := Line2D.new()
	edge.add_point(Vector2(x0, y))
	edge.add_point(Vector2(x1, y))
	edge.width = 2.5
	edge.default_color = Color(0.36, 0.44, 0.55)
	add_child(edge)

## Split the profile at its holes: each run is one unbroken piece of floor.
func _runs(terrain: Array) -> Array:
	var runs: Array = []
	var cur: Array = []
	for p in terrain:
		if p == null:
			if cur.size() >= 2:
				runs.append(cur)
			cur = []
			continue
		cur.append(Vector2(float(p[0]), float(p[1])))
	if cur.size() >= 2:
		runs.append(cur)
	return runs

func _solid(run: Array) -> void:
	var body := StaticBody2D.new()
	var poly := CollisionPolygon2D.new()
	var pts: PackedVector2Array = PackedVector2Array()
	for p in run:
		pts.append(p)
	pts.append(Vector2(run[run.size() - 1].x, DEPTH))
	pts.append(Vector2(run[0].x, DEPTH))
	poly.polygon = pts
	body.add_child(poly)
	add_child(body)

	var draw := Polygon2D.new()
	draw.polygon = pts
	draw.color = Color(0.12, 0.15, 0.20)
	add_child(draw)
	var edge := Line2D.new()
	for p in run:
		edge.add_point(p)
	edge.width = 3.0
	edge.default_color = Color(0.33, 0.40, 0.50)
	add_child(edge)

## How high the floor is at a given x, in Godot's coordinates. Everything that
## has to be placed in a room — the player, every foe — asks this instead of
## guessing, because guessing is how they ended up hanging in the air.
## Returns NAN over a hole, which is a thing callers must handle rather than
## quietly fall through.
func floor_at(x: float) -> float:
	var best := NAN
	for run in _runs(room.terrain):
		if x < run[0].x or x > run[run.size() - 1].x:
			continue
		var prev: Vector2 = run[0]
		for p in run:
			if p.x >= x:
				# the profile is a stair of flat treads; take the one you are on
				best = prev.y
				break
			prev = p
		if is_nan(best):
			best = run[run.size() - 1].y
	return best

## The nearest x to `from` that has floor under it, searched outward in both
## directions. Searching forward only was quietly relocating fights: a foe
## placed on a missing tread walked several metres up the stair to find ground,
## which is not where the room was designed to be fought.
func standing_x(from: float) -> float:
	if not is_nan(floor_at(from)):
		return from
	var w := Data.room_width()
	var step := 4.0
	while step < w:
		if from - step > 0.0 and not is_nan(floor_at(from - step)):
			return from - step
		if from + step < w and not is_nan(floor_at(from + step)):
			return from + step
		step += 4.0
	return from

func _walls() -> void:
	var w := Data.room_width()
	for x in [-8.0, w + 8.0]:
		var body := StaticBody2D.new()
		var shape := CollisionShape2D.new()
		var rect := RectangleShape2D.new()
		rect.size = Vector2(16.0, WALL_H * 2.0)
		shape.shape = rect
		shape.position = Vector2(x, -WALL_H * 0.5)
		body.add_child(shape)
		add_child(body)
