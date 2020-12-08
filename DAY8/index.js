/*
AoC Day8 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/

const executeGameConsole = require('../common').gameConsole

part1 = inputData => {
	return executeGameConsole(inputData).accumulator
}

part2 = inputData => {

	//Find the index of all jmp instructions
	const jmpInstructions = inputData.reduce((acc,instruction,index) => {
		if(instruction.substring(0,3) == "jmp"){
				acc.push(index)
		}
		return acc
	},[])

	//Replace each with a nop and test execution PC reaches end of code
	while(jmpInstructions.length > 0){
		var code = [...inputData]
		code[jmpInstructions.pop()] = "nop"
		const executionRes = executeGameConsole(code)
		if(executionRes.pc == code.length){
			return executionRes.accumulator
		}
	}
	
	//if we get here then we didnt find an answer for some reason
	return null
}

module.exports = {part1, part2}