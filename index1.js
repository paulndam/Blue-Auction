const fs = require('fs')
const http = require('http')
const hello = 'hello rico';
console.log(hello)

// reading and writing to files

// Blocking Synchronous way

// takes two args, first is the path to file, and then the files
const textInput = fs.readFileSync('./txt/input.txt','utf-8')
console.log(textInput)

// writing to files

const writeInput = `Rico is the man , yeaahhh !!! ${textInput}. \n made on ${Date.now()}`
fs.writeFileSync('./txt/output.txt', writeInput)
console.log(`file have new information`)

// Non Blocking asynchronous way

fs.readFile('./txt/start.txt','utf-8',(error,data1)=>{
    if(error){
        return  console.log(`${error}🤯`)
    }
    fs.readFile(`./txt/${data1}.txt`, `utf-8`, (error, data2)=>{
        console.log(data2)
        fs.readFile('./txt/append.txt', `utf-8`,(error,data3)=>{
            console.log(data3)

            fs.writeFile(`./txt/final.txt`,`${data2}\n${data3}`,`utf-8`,(error)=>{

                console.log(`File have new updated information 😁`)
            })
        })
    })
   

})
console.log(`who comes first`)



