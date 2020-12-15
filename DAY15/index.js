/*
AoC Day15 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/

const elfGame = (startingNumbers,lastTurn) => {
	var numberSpoken = new Map()
	var thisNumber = lastNumber = turn = 0
	
	//place the stating nums into the dict
	startingNumbers[0].split(',').forEach((num,index)=>{
		numberSpoken.set(parseInt(num), index)
		lastNumber = num
		turn++
	})

	//itterate through the turns
	for(; turn<lastTurn; turn++){
		const previousIndex = turn-1
		if(numberSpoken.has(lastNumber) == false){
			thisNumber = 0
		} else {
			thisNumber = previousIndex- numberSpoken.get(lastNumber)
		}
		numberSpoken.set(lastNumber, previousIndex)
		lastNumber = thisNumber
	}	
	
	return lastNumber
}

part1 = inputData => {
	return elfGame(inputData,2020)
}

part2 = inputData => {
	return elfGame(inputData,30000000)
}

module.exports = {part1, part2}