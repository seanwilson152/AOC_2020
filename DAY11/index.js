/*
AoC Day11 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/

const adjacentSeats = (seat, state) => {
	const relativePos = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
	return relativePos.reduce((acc,pos)=>{
		const position = [seat[0]+pos[0], seat[1]+pos[1]]
		if(position[0]>=0 && position[0]<state.length && position[1]>=0 && position[1]<state[0].length){
			if(state[position[0]][position[1]] == "#") return acc + 1
		}
		return acc
	},0)
}

const seatsInSight = (seat, state) => {
	const directions = [[-1,-1],[-1,0],[-1,1],[0,-1],[0,1],[1,-1],[1,0],[1,1]]
	var seatsOccupied = 0
	directions.forEach(dir=>{
		var position = [seat[0]+dir[0], seat[1]+dir[1]]
		while(position[0]>=0 && position[0]<state.length && position[1]>=0 && position[1]<state[0].length){
			if(state[position[0]][position[1]] == "#"){
				seatsOccupied +=1
				break
			}
			if(state[position[0]][position[1]] == "L"){
				break
			}
			position = [position[0]+dir[0], position[1]+dir[1]]
		}
	})
	return seatsOccupied
}

part1 = inputData => {
	var simStable = false
	var thisState = nextState = inputData.map(line=>{return line.split('')})
	while(!simStable){
		simStable = true
		thisState = [...nextState.map(row=> {return [...row]})]
		thisState.forEach((row,rowIndex) =>{
			row.forEach((col,colIndex) =>{
				if(col != '.'){
					const occupiedAdjacent = adjacentSeats([rowIndex,colIndex], thisState)
					if(col == 'L' && occupiedAdjacent==0){
						nextState[rowIndex][colIndex] = '#'
						simStable = false
					}
					if(col == '#' && occupiedAdjacent>3){
						nextState[rowIndex][colIndex] = 'L'
						simStable = false
					}	
				}
			})
		})
	}
	return nextState.reduce((acc,row)=>{
		return acc += row.filter(seat=>{return seat=='#'}).length
	},0)
}

part2 = inputData => {
	var simStable = false
	var thisState = nextState = inputData.map(line=>{return line.split('')})
	while(!simStable){
		simStable = true
		thisState = [...nextState.map(row=> {return [...row]})]
		thisState.forEach((row,rowIndex) =>{
			row.forEach((col,colIndex) =>{
				if(col != '.'){
					const occupiedAdjacent = seatsInSight([rowIndex,colIndex], thisState)
					//console.log(occupiedAdjacent)
					if(col == 'L' && occupiedAdjacent==0){
						nextState[rowIndex][colIndex] = '#'
						simStable = false
					}
					if(col == '#' && occupiedAdjacent>4){
						nextState[rowIndex][colIndex] = 'L'
						simStable = false
					}	
				}
			})
		})
	}
	return nextState.reduce((acc,row)=>{
		return acc += row.filter(seat=>{return seat=='#'}).length
	},0)
}

module.exports = {part1, part2}