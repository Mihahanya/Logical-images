
function calculate_logical_expression(expr, vars) {
	/*
	The variable is a single latin varter, takes the value 0 or 1
	The binary functions:
	~ negation
	* conjunction
	+ disjunction
	^ exclusive disjunction
	-> implication
	= biconditional
	*/
	
	// remove spaces and replace variables with their values
	expr = expr.split(' ').join('')
	for (const var_name in vars) expr = expr.replaceAll(var_name, vars[var_name])
	
	// open the brackets by recursion
	
	function find_brackets_content(str) {
		// assumed that the first character is an opening bracket
		for (var i=1; i<str.length; i++) {
			for (var brc=1; brc != 0 && i<str.length; i++) {
				if 		(str[i] == '(') brc++	
				else if (str[i] == ')') brc--
			}
			if (brc != 0) return null

			return str.slice(1, i-1)
		}
	}

	for (var i=0; i<expr.length; i++) {
		if (expr[i] == '(') {
			var brc_content = find_brackets_content(expr.substr(i)); 			if (brc_content == null) return null
			var brc_expr_res = calculate_logical_expression(brc_content, vars);	if (brc_expr_res == null) return null
			
			expr = expr.slice(0, i) + brc_expr_res + expr.substr(i+brc_content.length+2)
		}
		else if (expr[i] == ')') return null
	}

	// linear transformations
	const operations = [
		{ reg: /~[01]/, 		func: (_, a) => (a^1) }, 
		{ reg: /[01]\*[01]/, 	func: (a, b) => (+a * +b) }, 
		{ reg: /[01]\+[01]/, 	func: (a, b) => (Math.min(+a + +b, 1)) }, 
		{ reg: /[01]\^[01]/, 	func: (a, b) => (a ^ b) }, 
		{ reg: /[01]->[01]/, 	func: (a, b) => (+(a <= b)) }, 
		{ reg: /[01]=[01]/, 	func: (a, b) => (+(a == b)) }, 
	]

	for (var op in operations) {
		op = operations[op]
		var match = expr.match(op.reg)
		
		while (match != null) {
			expr = expr.replace(op.reg, op.func(match[0][0], match[0].slice(-1)))
			match = expr.match(op.reg)
		}
	}

	// some syntax error
	if (expr.length > 1 || !/\d/.test(expr)) return null

	return expr
}
