
function negation_map_by_pos(x, y, w_n, h_n) 
{
	var x_moves = String(Number(x).toString(2))
	var y_moves = String(Number(y).toString(2))
	
	x_moves = '0'.repeat(w_n-x_moves.length) + x_moves
	y_moves = '0'.repeat(h_n-y_moves.length) + y_moves

	console.log(x_moves, y_moves, x, y)

	var neg_map = Array(w_n + h_n)
	for (var i=0; i < w_n+h_n; i++) {
		if (i % 2 == 0) neg_map[i] = +x_moves[Math.floor(i/2)] ^ 1
		else neg_map[i] = +y_moves[Math.floor(i/2)] ^ 1
	}

	return neg_map
}

function img_to_expr(truth_map) {
	var w = truth_map[0].length
	var h = truth_map.length
	var w_n = Math.log(w) / Math.LN2
	var h_n = Math.log(h) / Math.LN2

	for (var y=0; y < h; y++) {
		for (var x=0; x < w; x++) {
			if (truth_map[y][x] == 1) {
				console.log(negation_map_by_pos(x, y, w_n, h_n))
			}
		}
	}

	return ''
}
