/*
AoC Day14 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/
const sumMemory = memory =>{
	return Object.keys(memory).reduce((acc,address)=>{
		return acc+memory[address]
	},0n)
}

part1 = inputData => {
	memory = {}
	maskOr = maskAnd = 0n
	inputData.forEach(instruction => {
		const opperation = instruction.split(' = ')[0]	
		const opperand = instruction.split(' = ')[1]	
		if(opperation === "mask"){
			maskOr = BigInt(parseInt(opperand.split('X').join('0'),2))
			maskAnd = BigInt(parseInt(opperand.split('X').join('1'),2))
		} else {
			address = opperation.split('[')[1].split("]")[0]
			memory[address] = (BigInt(opperand) | maskOr) & maskAnd
		}
	});
	return sumMemory(memory)
}
part2 = inputData => {
	memory = {}
	maskOr = []
	maskAnd = 0n
	inputData.forEach(instruction => {
		const opperation = instruction.split(' = ')[0]	
		const opperand = instruction.split(' = ')[1]	
		if(opperation === "mask"){
			//calculate AND/OR vals
			maskOr = [BigInt(parseInt(opperand.split('X').join('0'),2))] // init maskOr to all X=0
			maskAnd = (68719476735n).toString(2).split('')               // 68719476735n is just all 1's 
			opperand.split('').reverse().forEach((val,index)=>{          // find floating in mask and update numeric masks
				if(val=='X'){
					maskAnd[35-index]= '0'
					maskOr.forEach(mask=>{
						maskOr.push(BigInt(mask | 1n<<BigInt(index)))
					})
				}
			})
			maskAnd = BigInt(parseInt(maskAnd.join(''),2))
		} else {
			//apply mask to address and load data in memory
			maskOr.forEach((mask)=>{
				address = BigInt(opperation.split('[')[1].split("]")[0])   // get the address from file
				address &= maskAnd                                         // clear masked bits
				address |= mask                                            // set masked bits
				memory[address] = BigInt(parseInt(opperand))               // place value in memory 
			})
		}
	});
	return sumMemory(memory)
}

module.exports = {part1, part2}