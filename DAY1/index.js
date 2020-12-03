/*
AoC Day1 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/

part1 = inputData => {
	var answer = null

	inputData.forEach(number => {
		const difference = 2020 - number
		if(inputData.indexOf(difference.toString()) != -1){
			answer = number * difference
		}
	})

	return answer
}

part2 = inputData => {
	var answer = null
	expenses = inputData.map(item=>{return parseInt(item)})

	expenses.forEach(expense1 => {
		expenses.forEach(expense2 => {
			expenses.forEach(expense3 => {
				if(answer != null) return //answer has already been found (skip the rest)
				if ( expense1 + expense2 + expense3 == 2020){
					answer = expense1 * expense2 * expense3
				}
			})
		})
	})

	return answer
}

module.exports = {part1, part2}