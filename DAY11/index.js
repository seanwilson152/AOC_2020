/*
AoC Day11 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/

const adjacentSeats = (seat, state) => {
	const relativePos = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
	const positions = relativePos.map(pos=>{
		return [seat[0]+pos[0], seat[1]+pos[1]]
	}).filter(seat =>{return seat[0]>=0 && seat[0]<state.length && seat[1]>=0 })
	return positions.map(pos =>{return state[pos[0]][pos[1]]})
}

const checkSeat = lineofsight=> {
	var seatfound = 0
	var index = 0
	//console.log(lineofsight)
	while(!seatfound && index<lineofsight.length){
		if(lineofsight[index]=='L'){
			return 0
		}
		if(lineofsight[index]=='#'){
			return 1
		}
		index +=1
	}
	return 0
}

const seenSeats = (seat, state) => {
	seatsright = checkSeat(state[seat[0]].slice(seat[1]+1))
	seatsleft =  checkSeat(state[seat[0]].slice(0,seat[1]).reverse())
	seatsdown =  checkSeat(state.map(row=>{return row[seat[1]]}).slice(seat[0]+1))
	seatsup =  checkSeat(state.map(row=>{return row[seat[1]]}).slice(0,seat[0]).reverse())
	diag1 = checkSeat(state.map((col, index)=>{return col[seat[1]-seat[0]+index]}).slice(seat[0]+1))
	diag2 = checkSeat(state.map((col, index)=>{return col[seat[1]-seat[0]+index]}).slice(0,seat[0]).reverse())
	diag3 = checkSeat(state.map((col, index)=>{return col[seat[1]+seat[0]-index]}).slice(seat[0]+1))
	diag4 = checkSeat(state.map((col, index)=>{return col[seat[1]+seat[0]-index]}).slice(0,seat[0]).reverse())
	//console.log(seatsright, seatsleft , seatsdown , seatsup , diag1 , diag2 , diag3 , diag4)
	return seatsright + seatsleft + seatsdown + seatsup + diag1 + diag2 + diag3 + diag4
	throw ""
}

part1 = inputData => {
	const startingState = inputData.map(line=>{return line.split('')})
	var simStable = false
	var thisState 
	var nextState = JSON.parse(JSON.stringify(startingState))
	//console.log(adjacentSeats([0,0]))
	while(!simStable){
		simStable = true
		thisState = JSON.parse(JSON.stringify(nextState))
		//console.log(thisState[-1][-1])
		thisState.forEach((row,rowIndex) =>{
			row.forEach((col,colIndex) =>{
				const myAdjacentSeats = adjacentSeats([rowIndex,colIndex], thisState)
				const occupiedAdjacent = myAdjacentSeats.filter(seat=>{return seat=='#'}).length
				//console.log(...occupiedAdjacent)
				if(col == 'L' && occupiedAdjacent==0){
					nextState[rowIndex][colIndex] = '#'
					simStable =false
				}
				if(col == '#' && occupiedAdjacent>3){
					nextState[rowIndex][colIndex] = 'L'
					simStable = false
				}
			})
			//console.log(thisState)
		})
		//console.log(nextState)
		
		//throw ""
	}
	
	return nextState.reduce((acc,row)=>{
		return acc += row.filter(seat=>{return seat=='#'}).length
	},0)
}

part2 = inputData => {


	const startingState = inputData.map(line=>{return line.split('')})
	var simStable = false
	var thisState 
	var nextState = JSON.parse(JSON.stringify(startingState))

	var test =[ [ '#', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', '#' ],
  [ '#', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L' ],
  [ 'L', '.', 'L', '.', 'L', '.', '.', 'L', '.', '.' ],
  [ 'L', 'L', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L' ],
  [ 'L', '.', 'L', 'L', '.', 'L', 'L', '.', 'L', 'L' ],
  [ 'L', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', 'L' ],
  [ '.', '.', 'L', '.', 'L', '.', '.', '.', '.', '.' ],
  [ 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', 'L', '#' ],
  [ '#', '.', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L' ],
  [ '#', '.', 'L', 'L', 'L', 'L', 'L', '.', 'L', '#' ] ]

  	// console.log(seenSeats([0,3], test))
	// while(true){

	// }

	//console.log(seenSeats([3,4], nextState))
	while(!simStable){
		simStable = true
		thisState = JSON.parse(JSON.stringify(nextState))
		//console.log(thisState[-1][-1])
		thisState.forEach((row,rowIndex) =>{
			row.forEach((col,colIndex) =>{
				//console.log("hey")
				const occupiedAdjacent = seenSeats([rowIndex,colIndex], thisState)
				//const occupiedAdjacent = myAdjacentSeats.filter(seat=>{return seat=='#'}).length
				
				if(col == 'L' && occupiedAdjacent==0){
					nextState[rowIndex][colIndex] = '#'
					simStable =false
				}
				if(col == '#' && occupiedAdjacent>4){
					nextState[rowIndex][colIndex] = 'L'
					simStable = false
				}
			})
			//console.log(thisState)
		})
		//console.log(nextState)

		 //sleep(1000)
		//throw ""
	}
	
	return nextState.reduce((acc,row)=>{
		return acc += row.filter(seat=>{return seat=='#'}).length
	},0)
}

module.exports = {part1, part2}