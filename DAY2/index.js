
/*
AoC Day2 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/

processPasswordRecord = passwordRecord =>{
	const record_fields = passwordRecord.split(" ")
	return {
		password:record_fields[2].split(''),
		requiredChar: record_fields[1][0],
		policyReq1:record_fields[0].split("-")[0],
		policyReq2:record_fields[0].split("-")[1]
	}
}

XOR = (a,b) =>{
	return (a || b) && !(a && b)
}

part1 = inputData=> {
	var answer = 0 

	inputData.forEach(unprocessedPwRecord => {
		const passwordRecord = processPasswordRecord(unprocessedPwRecord)
		const numCharInstances = passwordRecord.password.filter(char => { return char == passwordRecord.requiredChar }).length
		const pwCheck =  numCharInstances >= passwordRecord.policyReq1 && numCharInstances <= passwordRecord.policyReq2
		answer = pwCheck ? answer + 1 : answer
	})

	return answer
}

part2 = inputData=> {
	var answer = 0 

		inputData.forEach(unprocessedPwRecord=> {
			const passwordRecord = processPasswordRecord(unprocessedPwRecord)
			const firstIndex = passwordRecord.policyReq1-1
			const secondIndex = passwordRecord.policyReq2-1
			const pwCheck = XOR(
				passwordRecord.password[firstIndex] == passwordRecord.requiredChar,
				passwordRecord.password[secondIndex] == passwordRecord.requiredChar,
				)
				answer = pwCheck ? answer + 1 : answer
		})

	return answer
}

module.exports = {part1, part2}