
function calculate_logical_expression(expr, vars) {
	/*
	The variable is a single latin letter, takes the value 0 or 1
	The binary functions:
	~ negation
	* conjunction
	+ disjunction
	^ exclusive disjunction
	-> material implication, <- converse implication
	= biconditional
	*/
	
	// remove spaces and replace variables with their values
	expr = expr.split(' ').join('')
	for (const var_name in vars) expr = expr.replaceAll(var_name, vars[var_name])
	
	// open the brackets by recursion
	for (let i=0; i<expr.length; i++) {
		if (expr[i] == '(') {
			let from = ++i
			let brc = 1
			for (; brc != 0; i++) {
				if (expr[i] == ')') brc--
				else if (expr[i] == '(') brc++
				
				if (i > expr.length-1 && brc != 0) return null
			}
			brc_expr_res = calculate_logical_expression(expr.slice(from, i-1), vars)
			if (brc_expr_res == null) return null
			
			expr = expr.slice(0, from-1) + brc_expr_res + expr.substr(i)
			i = from-1
		}
		else if (expr[i] == ')') return null
	}

	for (let i=0; i<expr.length-1; i++) {
		if (/^\d+$/.test(expr[i])) {
			if (expr[i] > 1 || /^\d+$/.test(expr[i+1])) return null
		}
	}

	for (let i=0; i<expr.length; i++) {
		if (expr[i] == '~') { expr = expr.slice(0, i).concat(expr[i+1]^1, expr.substr(i+2)); i-=1 }
	}

	for (let i=0; i<expr.length; i++) {
		if (expr[i] == '*') { expr = expr.slice(0, i-1).concat(+expr[i-1]*+expr[i+1], expr.substr(i+2)); i-=1 }
	}

	for (let i=0; i<expr.length; i++) {
		if (expr[i] == '+') { expr = expr.slice(0, i-1).concat(Math.min(+expr[i-1]+ +expr[i+1], 1), expr.substr(i+2)); i-=1 }
	}

	for (let i=0; i<expr.length; i++) {
		if (expr[i] == '^') { expr = expr.slice(0, i-1).concat(+expr[i-1]^+expr[i+1], expr.substr(i+2)); i-=1 }
	}

	for (let i=0; i<expr.length-1; i++) {
		if (expr.substr(i, 2) == '<-') { expr = expr.slice(0, i-1).concat(expr[i-1] >= expr[i+2], expr.substr(i+3)); i-=2 }
		if (expr.substr(i, 2) == '->') { expr = expr.slice(0, i-1).concat(expr[i-1] <= expr[i+2], expr.substr(i+3)); i-=2 }
	}

	for (let i=0; i<expr.length; i++) {
		if (expr[i] == '=') { expr = expr.slice(0, i-1).concat(expr[i-1] == expr[i+1], expr.substr(i+2)); i-=1 }
	}

	return expr
}
