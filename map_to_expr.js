
function img_to_expr(truth_map) {
	var w = truth_map[0].length
	var h = truth_map.length
	var w_n = Math.log(w) / Math.LN2
	var h_n = Math.log(h) / Math.LN2
	
	var row_vals = [].concat(...truth_map)
	
	var ops = []
	for (var i=0; i < row_vals.length/4; i++) {
		var r = row_vals.slice(i*4, i*4 + 4).join('')
		var r_n = parseInt(r, 2)
		ops = ops.concat(r_n)
	}
	
	var alphabet = 'abcdefghijklmnopqrstuvwxyz'

	var a1 = '', a2 = '';
	for (var i=0; i < w_n + h_n; i++) {
		if (i % 2 == 0) a1 = alphabet[i] + a1
		else a2 = alphabet[i] + a2
	}
	
	var alph = a1 + a2
	
	function rs_to_form(ops, n=0) {
		if (ops.length == 1) {
			switch (ops[0]) {
			case 0: return '0'
			case 1: return alph[0] + '∧' + alph[1]
			case 2: return '¬' + alph[0] + '∧' + alph[1] 
			case 3: return alph[1]
			case 4: return alph[0] + '∧¬' + alph[1]
			case 5: return alph[0]
			case 6: return alph[0] + '⨁' + alph[1]
			case 7: return alph[0] + '∨' + alph[1]
			// case 8: return alph[0] + '↓' + alph[1]
			case 8: return '¬' + alph[0] + '∧¬' + alph[1]
			case 9: return alph[0] + '≡' + alph[1]
			case 10: return '¬' + alph[0]
			// case 11: return alph[0] + '→' + alph[1]
			case 11: return '¬' + alph[0] + '∨' + alph[1]
			case 12: return '¬' + alph[1]
			// case 13: return alph[0] + '←' + alph[1]
			case 13: return alph[0] + '∨¬' + alph[1]
			// case 14: return alph[0] + '↑' + alph[1]
			case 14: return '¬' + alph[0] + '∨¬' + alph[1]
			case 15: return '1'
			default: return alph[0] + 'R_' + ops[0] + alph[1]
			}
		}

		var l = ops.slice(0, ops.length/2)
		var r = ops.slice(ops.length/2)

		var p_l = rs_to_form(l, n+1)
		var p_r = rs_to_form(r, n+1)

		var n_symb = alph[alph.length-n-1]

		if (p_l == '0' || p_l == '') p_l = ''
		else if (p_l == '1') p_l = '¬' + n_symb
		else if (p_l.length < 3) p_l = p_l + '∧¬' + n_symb
		else p_l = `(${p_l})∧¬${n_symb}`
		
		if (p_r == '0' || p_r == '') p_r = ''
		else if (p_r == '1') p_r = n_symb
		else if (p_r.length < 3) p_r = p_r + '∧' + n_symb
		else p_r = `(${p_r})∧${n_symb}`

		if (p_l != '' && p_r != '') return p_l + '∨' + p_r 
		if (p_l != '') return p_l
		if (p_r != '') return p_r

		return ''
	}
	
	var res = rs_to_form(ops)

	return res
}
