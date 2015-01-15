// Add event listener to button to solve when clicked.
window.onload = function() {
	document.getElementById('go').addEventListener('click', solve);
}

/*
 * The layout of the game board is as follows:
 *
 *	      0
 *  1   2   3   4
 *    5       6
 *  7   8   9  10
 *        11
 *
 * The puzzle is to find an arrangement of numbers
 * so that every line adds up to 26.
 */
 
var solutions = [];

function solve() {
	// Call recursive cyclePlace function on an empty starting arragement ([]).
	cyclePlace(0, []);
	
	console.log(solutions.length + ' solutions found');
}

// Function that accepts an incomplete arrangement and calls itself 12 times for
// each possible value of the next part of the arrangement added on to the current one.
// Each one of these calls then calls 12 more for the next arrangement and so on, totalling
// 12^n calls needed, which is reduced by early checks. A call at depth 11 performs a test
// on the given complete arrangement and adds it to the list of solutions if correct.
function cyclePlace(n, prev) {
	// Stop early if first checkable line is invalid. This drastically improves speed.
	if(n == 5) {
		if(prev[1] + prev[2] + prev[3] + prev[4] != 26) {
			return;
		}
	}
	
	// Again, but for second checkable line.
	if(n == 8) {
		if(prev[0] + prev[2] + prev[5] + prev[7] != 26) {
			return;
		}
	}
	
	// More checks could be added here but the program is fast enough as-is.
	
	// Perform 12 deeper calls for each of the possible permutations of the next arrangement.
	for(var i = 1; i <= 12; i++) {
		if(prev.indexOf(i) == -1) {
			// If deepest call.
			if(n == 11) {
				if(test(prev.concat(i))) {
					// Add arrangement to solutions if correct.
					solutions.push(prev.concat(i));
					console.info('SOLUTION: ' + prev.concat(i));
				};
			} else {
				cyclePlace(n + 1, prev.concat(i));
			}
		}
	}
}

// Test is given arrangement is correct.
function test(order) {
	// The indices of the numbers that make up each line.
	var lines = [
		[0, 2, 5, 7],
		[1, 5, 8, 11],
		[7, 8, 9, 10],
		[11, 9, 6, 4],
		[10, 6, 3, 0],
		[4, 3, 2, 1]
	];
	
	// Cycle through each line and ensure its sum is 26.
	for(var i = 0; i < 6; i++) {
		var line = lines[i];
		if(order[line[0]] + order[line[1]] + order[line[2]] + order[line[3]] != 26) return false;
	}
	
	// Return true if no incorrect line caused a return false first.
	return true;
}

