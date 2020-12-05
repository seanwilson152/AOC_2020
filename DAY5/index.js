/*
AoC Day5 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/

getSeatNumber = seat => {
	// just convert the F,B,R,L into binary 1/0 and parse as int
	var row = seat.substring(0,7).split("F").join("0").split("B").join("1")
	row = parseInt(row,2)

	var column = seat.substring(7,10).split("R").join("1").split("L").join("0")
	column = parseInt(column, 2)

	return (row * 8 ) + column
}  

part1 = inputData => {
	return inputData.reduce((acc,seat) =>{
		const seatNumber = getSeatNumber(seat)
		return  seatNumber > acc ? seatNumber : acc
	}, 0)
}

part2 = inputData => {
	var allSeats = inputData.map(seat=>{return getSeatNumber(seat)})
	allSeats = allSeats.sort((a, b) => {return a-b})

	return allSeats.reduce( (acc, seat, index) => {
		return seat - 1 == allSeats[index-1] ? acc : seat -1
	})
}

module.exports = {part1, part2}