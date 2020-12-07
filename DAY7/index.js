/*
AoC Day7 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/

const removeLeadingTrailingSpaces = text =>{
	var txtArr = text.split('')
	while(txtArr[0] === ' ') {
		txtArr.shift()
	}
	while(txtArr[txtArr.length -1] === ' ') {
		txtArr.pop()
	}
	return txtArr.join('')
}

const parseBagRules = inputData => {
	return inputData.map(rule => {
		rule = rule.split("contain" ).join('').split(",").join('')
		rule = rule.split(/bags|bag/)
		rule.pop()
		var exportedRule = {
			parent:  removeLeadingTrailingSpaces(rule.shift()),
			children : rule.map(element=> {
				child = removeLeadingTrailingSpaces(element)
				if(child == "no other"){
					return null
				}
				return {occurance: child.substring(0,1), bag: child.substring(2)}
			})
		}
		return exportedRule
	});
}

const findAllChildren = (rules, parentBag) => {
	var allChildren = []
	const immediateChildren = rules.filter(rule => {return rule.parent == parentBag})[0].children
	if(immediateChildren[0] == null ){
		return allChildren
	} else {
		allChildren.push(...immediateChildren)
		immediateChildren.forEach(child => {
			allChildren.push(...findAllChildren(rules,child.bag))
		});
	}
	return [... new Set(allChildren)]
}

const findNumberBags = (rules, parentBag) => {
	const immediateChildren = rules.filter(rule => {return rule.parent == parentBag})[0].children
	if(immediateChildren[0] == null ){
		return 0
	} else {
		return immediateChildren.reduce((acc,child) => {
			return acc + parseInt(child.occurance) + (parseInt(child.occurance) * findNumberBags(rules,child.bag))
		},0);
	}
}

part1 = inputData => {
	const bagRules = parseBagRules(inputData)
	return bagRules.reduce((acc,rule)=>{
		const bags = findAllChildren(bagRules, rule.parent).map(children => {return children.bag})
		return bags.indexOf("shiny gold")>-1 ? acc+1: acc
	},0)
}

part2 = inputData => {
	const bagRules = parseBagRules(inputData)
	return findNumberBags(bagRules, "shiny gold")
}

module.exports = {part1, part2}