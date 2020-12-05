// Launcher app for all AoC solution.
const fs = require('fs')

const about = `
***********************************
   Advent Of Code 2020 Solutions
   SeanWilson152@gmail.com
***********************************`

loadpuzzleInput = (dayNum, isDebug) => {
	const inputFile =  `./day${dayNum}/${isDebug ? 'debug.txt' : 'input.txt'}`
	if(fs.existsSync(inputFile)){
		const data = fs.readFileSync(inputFile, 'UTF-8')
		return data.split(/\r?\n/)
	} else {
		console.log("[ERROR] cant find the input data for that puzzle.")
		return null
	}
}

main = () => {
	console.log(about)
	const cmdArgs = process.argv.slice(2)
	
	// get the "day to run" from the cmd line arg
	const dayArgId = cmdArgs.indexOf("--day") +1
	if( dayArgId === 0){
		console.log("[ERROR] The --day must be specified (e.g. 'node AoC20 --day 1')")
		return 1
	}
	const puzzleDay = cmdArgs[dayArgId]

	//load input data for that days puzzle
	const debugArg = cmdArgs.indexOf("--debug") != -1
	console.log(`[INFO] Launching DAY${puzzleDay} puzzle!`)
	if(debugArg) console.log(`[INFO] Using debug input data for puzzle`)
	const inputData = loadpuzzleInput(puzzleDay, debugArg)
	if(inputData === null){
		return 1
	}

	//dynamically load the puzzle code for the day specified
	const puzzle = require(`./DAY${puzzleDay}/index`)

	//execute puzzle and print results
	var hrstart = process.hrtime()

	console.log(`\r\n[INFO] Executing part 1`)
	const part1Result = puzzle.part1(inputData)
	console.log(`Part1 Result:\r\n ${part1Result}\r\n`)

	console.log(`[INFO] Executing part 2`)
	const part2Result = puzzle.part2(inputData)
	console.log(`Part2 Result:\r\n ${part2Result}\r\n`)

	hrend = process.hrtime(hrstart)
 	console.log('[INFO] Execution time: %ds %dms', hrend[0], hrend[1] / 1000000)
}

main()