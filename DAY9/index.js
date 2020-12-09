/*
AoC Day9 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/
const findInvalid = (inputData, preambleLen) =>{
	var target = preambleLen

	while (target <inputData.length){
		const preamble = inputData.slice(target-preambleLen, target)
		const valid = preamble.reduce((valid,element) => {
			if(valid == true) return valid // if we have found a vaid pair we can stop the search
			const difference = inputData[target] - element
			if(difference == element) return false
			return preamble.includes(difference)
		},false);
		if(!valid) break
		target += 1
	}
	return inputData[target]
}

part1 = inputData => {
	const preambleLen = (inputData.length < 25) ? 5 : 25
	inputData = inputData.map(e=>{return parseInt(e)})
	return findInvalid(inputData, preambleLen)
}

part2 = inputData => {
	const preambleLen = (inputData.length < 25) ? 5 : 25
	inputData = inputData.map(e=>{return parseInt(e)})

	//find our target number
	const target = findInvalid(inputData, preambleLen)

	//brute force approach
	var sRange = 2
	while(sRange < 100 ){  //assuming we dont need sets of > 99 numbers 
		var sIndex = 0
		while((sIndex+sRange) < inputData.length){
			const rangeNumbers = inputData.slice(sIndex, sIndex+sRange)
			const sum = rangeNumbers.reduce((a,b)=> {return a+b},0)
			if(sum == target) return Math.max(...rangeNumbers) + Math.min(...rangeNumbers)
			sIndex += 1
		}
		sRange +=1
	}
	return null
}

module.exports = {part1, part2}