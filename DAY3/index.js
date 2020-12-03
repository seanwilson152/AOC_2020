
/*
AoC Day3 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/

findNumCollisions = (forest, slope) =>{
	var numCollisions = 0
	var position = {x:0, y:0}

	while(position.x < forest.length) {

		if(forest[position.x][position.y] === '#'){
			numCollisions += 1
		}

		position.x += slope.down
		position.y += slope.right

		if(position.y > forest[0].length -1 ){
			position.y = position.y - forest[0].length
		}
	}

	return numCollisions
}

part1 = inputData=> {

	const forest = inputData.map(row=>{return row.split('')})
	const slope = {right:3, down:1 }

	return findNumCollisions(forest, slope)
}

part2 = inputData=> {

	const forest = inputData.map(row=>{return row.split('')})
	slopesToCheck = [
		{right:1, down:1},
		{right:3, down:1},
		{right:5, down:1},
		{right:7, down:1},
		{right:1, down:2}
	]
	
	collisions = slopesToCheck.map(slope => { return findNumCollisions(forest, slope) }) 
	return collisions.reduce((a,b)=>{return a*b})
}

module.exports = {part1, part2}