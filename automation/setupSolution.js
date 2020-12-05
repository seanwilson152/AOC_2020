const request = require('request')
const fs = require('fs')

const generateFiles = (puzzelDay,puzzelInput)=>{
    //create a new folder for the solution
    const folderPath = `./DAY${puzzelDay}` 
    if(fs.existsSync(folderPath)) {
        console.log(`[ERROR] DAY${puzzelDay} already exists`)
        return 1
    } else {
        fs.mkdir(folderPath, err =>{})
    }

    //generate the index.js and input.txt file
    var indexTemplate = fs.readFileSync("./automation/indexTemplate.txt", "UTF-8")
    indexTemplate = indexTemplate.replace("${puzzelDay}", puzzelDay)
    fs.writeFileSync(`${folderPath}/index.js`, indexTemplate)
    fs.writeFileSync(`${folderPath}/input.txt`,puzzelInput)
    fs.writeFileSync(`${folderPath}/debug.txt`, "")
}

const sessionToken = fs.readFileSync("./automation/session.txt", "UTF-8")
if(sessionToken.charAt(0) === '{'){
    console.log("[ERROR]: you must setup the AoC cookie session ID in session.txt")
    return 1
}

// get the "day to run" from the cmd line arg
const cmdArgs = process.argv.slice(2)
const dayArgId = cmdArgs.indexOf("--day") +1
if( dayArgId === 0){
    console.log("[ERROR] The --day must be specified (e.g. 'node AoC20 --day 1')")
    return 1
}
const puzzelDay = cmdArgs[dayArgId]

const url = `https://adventofcode.com/2020/day/${puzzelDay}/input`
const cj = request.jar();
cj.setCookie(request.cookie(`session=${sessionToken}`),url)

request(
    url, 
    { jar: cj },
    (error, response, body)=>{
       if(response.statusCode == 200){
        generateFiles(puzzelDay, body)
       } else {
           console.log("[ERROR] couldn't download puzzelInput")
           return 1
       }
    }
);