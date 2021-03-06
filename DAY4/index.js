/*
AoC Day4 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/
const numberInRange = require('../common').numberInRange

const passportValidation1 = passport =>{
	const fieldsToFind = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"]
	const passportFields = Object.keys(passport)
	return fieldsToFind.reduce((acc, key)=>{ return acc && passportFields.indexOf(key) > -1}, true)
}

const passportValidation2 = passport =>{
	const byrValid = numberInRange(passport.byr, 1920, 2002)
	const iyrValid = numberInRange(passport.iyr, 2010, 2020)
	const eyrValid = numberInRange(passport.eyr, 2020, 2030)
	const hclValid = /^#[a-f0-9]{6}$/.test(passport.hcl)
	const eclValid = /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(passport.ecl)
	const pidValid = /^[0-9]{9}$/.test(passport.pid)
	const hgtValid = /^((1[5-8][0-9]|19[0-3])cm)|((59|6[0-9]|7[0-6])in)$/.test(passport.hgt)
	return byrValid && iyrValid && eyrValid && hgtValid && hclValid && eclValid && pidValid
}

const processRecords = inputData =>{
	const passports = inputData.reduce((passportStream, row)=>{
		return passportStream += row === '' ? '|' : ' ' + row
	},"").split("|")

	return passports.map(passport => {
		var processedPassport = {}
		passport.split(" ").forEach( passportField => { 
			processedPassport[passportField.split(":")[0]] = passportField.split(":")[1]
		})
		return processedPassport
	})
}

part1 = inputData => {
	const passports = processRecords(inputData)
	return passports.filter(passportValidation1).length
}

part2 = inputData => {
	const passports = processRecords(inputData)
	return passports.filter(passportValidation1).filter(passportValidation2).length
}

module.exports = {part1, part2}