/*
AoC Day7 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/

const parseBagRules = inputData => {
	var rules = {}
	inputData.forEach(rule => {
		rule = rule.split("contain" )
		parent = rule[0].split(' bags')[0] //discard the word 'bags'
		children = {}
		rule[1].split(",").forEach(child =>{
			if(!child.includes("no other")){
				const childDetails = child.split(' ')
				children[childDetails.slice(2,4).join(' ')] = parseInt(childDetails[1])
			}
		})
		rules[parent] = children
	});
	return rules
}

const findAllChildren = (rules, parentBag) => {
	var allChildren = new Set()
	const immediateChildren = Object.keys(rules[parentBag])
	immediateChildren.forEach(child =>{
		allChildren.add(child)
		const childsChildren = findAllChildren(rules, child)
		allChildren =new Set([...allChildren, ...childsChildren])
	})
	return allChildren
}

const findNumberBags = (rules, parentBag) => {
	const immediateChildren = Object.keys(rules[parentBag])
	return immediateChildren.reduce((acc,child) => {
		return acc + rules[parentBag][child] + (rules[parentBag][child] * findNumberBags(rules,child))
	},0)
}

part1 = inputData => {
	const bagRules = parseBagRules(inputData)
	const allBagsTypes = Object.keys(bagRules)
	return allBagsTypes.reduce((acc,parent)=>{
		const bag = findAllChildren(bagRules, parent)
		return bag.has("shiny gold") ? acc+1: acc
	},0)
}

part2 = inputData => {
	const bagRules = parseBagRules(inputData)
	return findNumberBags(bagRules, "shiny gold")
}

module.exports = {part1, part2}