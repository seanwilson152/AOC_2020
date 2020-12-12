/*
AoC Day12 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/

const rotate = (waypoint, dir, num) =>{
	for(var i=0;i<num;i++){
		const PrVN = waypoint.north
		const PrVE = waypoint.east
		waypoint.north = dir == 'L' ? PrVE:-PrVE
		waypoint.east = dir == 'L' ? -PrVN: PrVN
	}
	return waypoint
}

part1 = inputData => {
	var dir = 90
	position ={north:0, east:0}
	inputData.forEach(element => {
		const instruction1 = element.slice(0,1)
		const instruction2 = parseInt(element.slice(1))
		switch(instruction1){
			case "F":
				switch(dir){
					case 0:
						position.north -= instruction2
						break
					case 180:
						position.north += instruction2
						break
					case 90:
						position.east += instruction2
						break
					case 270:
						position.east -= instruction2
						break
				}
				break
			case "N":
				position.north -= instruction2
				break
			case "S":
				position.north += instruction2
				break
			case "E":
				position.east += instruction2
				break
			case "W":
				position.east -= instruction2
				break
			case "R":
				dir += instruction2
				break
			case "L":
				dir -= instruction2
		}
		if(dir >= 360) dir -= 360
		if(dir < 0) dir += 360
	});
	return position.north + position.east
}

part2 = inputData => {
	waypoint = {north:1, east:10}
	position = {north:0, east:0}
	inputData.forEach(element => {
		const instruction1 = element.slice(0,1)
		const instruction2 = parseInt(element.slice(1))
		switch(instruction1){
			case "F":
				position.north -= instruction2 * waypoint.north
				position.east += instruction2 * waypoint.east
				break
			case "N":
				waypoint.north += instruction2
				break
			case "S":
				waypoint.north -= instruction2
				break
			case "E":
				waypoint.east += instruction2
				break
			case "W":
				waypoint.east -= instruction2
				break
			case "R":
			case "L":
				waypoint = rotate(waypoint,instruction1,instruction2/90)
		}
	});
	return position.north + position.east
}

module.exports = {part1, part2}