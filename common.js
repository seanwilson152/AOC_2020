/*
AoC Solutions common functions
author: seanwilson152@gmail.com
*/

const numberInRange = (numberToTest, rangeLow, rangehigh) => {
	return numberToTest >= rangeLow && numberToTest <= rangehigh
}

module.exports = {numberInRange}