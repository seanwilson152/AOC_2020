/*
AoC Day6 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/

const parseCustomsForms  = require("../common").separateInputByBlankRows

part1 = inputData => {
	return parseCustomsForms(inputData).reduce((acc,form) =>{
		const allCharsUsedInForm = form.split(' ').join('') //join all responses in form without spaces
		const uniqueQuestions = [...new Set(allCharsUsedInForm.split('')) ]
		return acc + uniqueQuestions.length
	},0)
}

part2 = inputData => {
	return parseCustomsForms(inputData).reduce((acc,form) => {
		const formReponses = form.split(' ')
		const numPeopleInForm = formReponses.length
		const uniqueQuestions = [...new Set(formReponses.join('')) ]
		return acc + uniqueQuestions.reduce((acc,find) => {
			if(formReponses.join('').split('').filter(item =>{ return item ===find}).length == numPeopleInForm){
				return acc + 1
			}
			return acc
		},0)
	},0)
}

module.exports = {part1, part2}