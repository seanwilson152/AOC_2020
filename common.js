/*
AoC Solutions common functions
author: seanwilson152@gmail.com
*/

const numberInRange = (numberToTest, rangeLow, rangehigh) => {
	return numberToTest >= rangeLow && numberToTest <= rangehigh
}

const separateInputByBlankRows = inputData =>{
	return inputData.reduce((dataStream, row,currentIndex)=>{
		var newDataStream = dataStream
		if(row === ''){
			newDataStream += '|'
		} else {
			if(currentIndex === 0 || inputData[currentIndex-1] == ''){
				newDataStream += row
			} else {
				newDataStream += ' ' + row
			}
		}
		return newDataStream
	},"").split("|")
}


module.exports = {numberInRange, separateInputByBlankRows}