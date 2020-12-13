/*
AoC Day13 Solutions
author: seanwilson152@gmail.com
Note: These solutions should be executed via the AoC20.js launcher
*/


// modulus multiple inverse function based on Euclid GCD Algorithm
// the logic for this function is stolen from a few google searches
const modMulInv = (a, m) =>{
    const m0 = m 
    var x0 = 0n
    var x1 = 1n
    if (m == 1)  return 0
    //Apply extended Euclid Algorithm 
    while (a > 1) {
		const q = a / m     // calc quotient (bigInt being used so rounding is implicit)
        var t = m 	    	// store prev mod in t
		m = a % m   		// calc new mod
        a = t       		// assign prev mod to a
		t = x0 				// store prev x0 val in t
		x0 = x1 - q * x0    // calc next x0
        x1 = t 				// assign prev x0 to x1
	}
    //Make x1 positive 
    if (x1 < 0)  x1 = x1 + m0 
    return x1 
}

/*
Return the smallest number x, such that: 
x = rem[i] (mod num[i]), 
We assume that that all mod values are pairwise coprime (GCD for every pair is 1) 
*/
const findX = (mod, rem)=>{ 
    const prod = mod.reduce((acc,mod) =>{
		return acc * BigInt(mod)
	},1n) 

	// chinese remainder theorem
	// sum( bi, Ni, xi ) % N
    const result =  mod.reduce((acc,mod,i)=>{
		Ni = prod/BigInt(mod)
        return acc + BigInt(rem[i]) * modMulInv(Ni,BigInt(mod)) * Ni 
	},0n)
      
    return result % prod 
}

part1 = inputData => {
	targetTime = inputData[0]
	buses = inputData[1].split(',').filter(buss=>{return buss!='x'})
	busTimes = buses.map(buss=>{return targetTime/buss})

	waitingTime = busTimes.map((time, busindex) => {
		return (Math.ceil(time) * buses[busindex]) - targetTime
	});

	minWait = Math.min(...waitingTime)
	return minWait * buses[waitingTime.indexOf(minWait)]
}

part2 = inputData => {
	buses = inputData[1].split(',')
	nummbers = []
	remainders = []
	buses.forEach((bus, busindex) => {
		if(bus != 'x'){
			nummbers.push(parseInt(bus))
			remainders.push(parseInt(bus-busindex))
		}
	});

	return findX(nummbers,remainders)
}

module.exports = {part1, part2}