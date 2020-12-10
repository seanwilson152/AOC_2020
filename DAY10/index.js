/*
AoC Day10 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/

const findJoltageSteps = inputData => {
	inputData = inputData.map(e => {return parseInt(e)})
	inputData = inputData.sort((a,b)=>{return a-b})
	inputData.push(inputData[inputData.length-1]+3)
	return diffs = inputData.map((joltage, index)=>{
		if(index == 0) return joltage
		return joltage - inputData[index-1]
	})
} 

part1 = inputData => {
	const joltageSteps = findJoltageSteps(inputData)
	const diff3 = joltageSteps.filter(diff => {return diff == 3}).length
	const diff1 = joltageSteps.filter(diff => {return diff == 1}).length
	return diff1 * diff3
}

part2 = inputData => {

	const joltageSteps = findJoltageSteps(inputData)
	var permutations = 1 // we start with the most expansive permutation
	var index = 0

	//next run though the array joltageSteps looking for consecutive 1's. every time we get two 
	// or more consecutive 1's we multiply or permutations by the number of dif ways of removing an adapter
	while(index < joltageSteps.length){
		var consecutiveOnes = 0
		while(diffs[index] == 1){
			index+=1
			consecutiveOnes +=1
		}
		// i spent way too long tring to come up with a formula to calulate this number. 
		// in the end i looked at my data set and realixed there are no more than 4 consecutive 1s. so hard coded the factors
		switch(consecutiveOnes){
			case 0:
			case 1: 
			permutations *= 1 
			break
			case 2: 
			permutations *= 2  
			break
			case 3:
			permutations *= 4
			break
			case 4:
			permutations *= 7 
			break
			default:
				throw "unhandled : " + consecutiveOnes
		}
		index+=1
	}
	return permutations 
}

module.exports = {part1, part2}