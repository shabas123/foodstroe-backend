const mongoose = require("mongoose")

const connectionString = process.env.CONNECTIONSTRING


mongoose.connect(connectionString).then((res)=>{
    console.log(`Mongodb connected connected`);  
}).catch(err=>{
    console.log(`Mongoose Atlas failed to connection ${err}`);
    
})