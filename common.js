/*
AoC Solutions common functions
author: seanwilson152@gmail.com
*/

const numberInRange = (numberToTest, rangeLow, rangehigh) => {
	return numberToTest >= rangeLow && numberToTest <= rangehigh
}

const separateInputByBlankRows = inputData =>{
	return inputData.reduce((dataStream, row,currentIndex)=>{
		var newDataStream = dataStream
		if(row === ''){
			newDataStream += '|'
		} else {
			if(currentIndex === 0 || inputData[currentIndex-1] == ''){
				newDataStream += row
			} else {
				newDataStream += ' ' + row
			}
		}
		return newDataStream
	},"").split("|")
}

const gameConsole = code => {
	var pc = 0
	var accumulator = 0
	var instructionsExectuted = new Set()
	
	while(pc < code.length){
		//check if we have already executed this instruction (we dont support loops yet)
		if(instructionsExectuted.has(pc)) break
		instructionsExectuted.add(pc)

		//decode the instruction
		const instruction = code[pc]
		const operation = instruction.substring(0,3) 
		const opperand = parseInt(instruction.substring(4))

		//increment the program counter
		pc +=1

		//execute the instruction
		switch(operation){
			case "nop":
				break
			case "acc":
				accumulator += opperand
				break
			case "jmp":
				pc += (opperand - 1)
				break
			default:
				throw "Unhandled instruction : " + instruction
		}

		//check if program counter has gone out of bounds
		if(pc < 0) throw "Program counter out of bounds"
	}
	return {pc, accumulator}
}


module.exports = {numberInRange, separateInputByBlankRows, gameConsole}