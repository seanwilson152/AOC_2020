/*
AoC Day5 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/

getSeatNumber = seat => {
	// just convert the F,B,R,L into binary 1/0 and parse as int
	const binary = seat.split(/F|L/).join("0").split(/B|R/).join("1")
	const row = parseInt(binary.substring(0,7),2)
	const column = parseInt(binary.substring(7,10),2)
	return (row * 8 ) + column
}  

part1 = inputData => {
	return Math.max(...inputData.map(getSeatNumber))
}

part2 = inputData => {
	var allSeats = inputData.map(getSeatNumber).sort((a, b) => {return a-b})

	return allSeats.reduce( (acc, seat, index) => {
		return seat - 1 == allSeats[index-1] ? acc : seat -1
	})
}

module.exports = {part1, part2}