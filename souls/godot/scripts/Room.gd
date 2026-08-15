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
	_walls()

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
