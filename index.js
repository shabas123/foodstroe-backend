// 1 .import dotenv
require("dotenv").config()

// 2.import expess
const express = require("express")

// 3.import cors
const cors = require("cors")

// 10.import connection
require('./config/connection')

// 11. import router
const router = require('./router/router')

const appMiddleware = require('./middleware/appMiddleware')
// 4.create server
const foodstoreServer = express()

// 5.tell server use cors to communicate with request
foodstoreServer.use(cors())

// 6.conver json to parse json formate to js
foodstoreServer.use(express.json())

foodstoreServer.use(appMiddleware)
// 12. tell server to use router
foodstoreServer.use(router)


// 7. set port
const PORT = 3000 || process.env.PORT  //available port

// 8.run server / isten server
foodstoreServer.listen(PORT, ()=>{
    console.log(`Food store server inside port ${PORT} `);
    
})
// 9.check server is working
foodstoreServer.get('/' , (req,res)=>{
    res.status(200).send(`<h1 style="color: blue;">foodstore sever </h1>`)
})