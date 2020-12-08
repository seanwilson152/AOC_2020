/*
AoC Day8 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/

const executeCode = code => {
	var pc = 0
	var accumulator = 0
	var instructionExectuted = {}
	
	while(pc < code.length){
		if(instructionExectuted[pc]){
			break
		}
		const instruction = code[pc]
		const operation = instruction.substring(0,3) 
		const condition = parseInt(instruction.substring(4))
		instructionExectuted[pc] = true
		pc +=1
		switch(operation){
			case "nop":
				break
			case "acc":
				accumulator += condition
				break
			case "jmp":
				pc += condition - 1
				break
			default:
				throw "unhandled instruction : " + instruction
		}
		if(pc < 0){
			throw "PC Less than Zero"
		}
	}
	return {pc, accumulator}
}

part1 = inputData => {
	return executeCode(inputData).accumulator
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
		const executionRes = executeCode(code)
		if(executionRes.pc == code.length){
			return executionRes.accumulator
		}
	}
	
	//if we get here then we didnt find an answer for some reason
	return null
}

module.exports = {part1, part2}