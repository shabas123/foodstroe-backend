const users = require("../models/userModel")

// register
exports.register = async (req, res)=>{
  console.log(`inside register controller`);
  
  // logic
  const {username, email, password} = req.body
  console.log(username, email, password);
    try {
        //  find existing users
          const existingUser = await users.findOne({email})
          if(existingUser){
            res.status(406).json(`user alredy exists`)
          }else{
            const newUser = new users({
              username,
              email,
              password
            })
            await newUser.save()
            res.status(200).json(newUser)
          }
      
      } catch (error) {
          res.status(400).json(error)
      }
  }

// login
exports.login = async (req, res)=>{
  console.log(`inside register controller`);
  
  // logic
  const {email, password} = req.body
  console.log(email, password);
    try {
        //  find existing users
          const existingUser = await users.findOne({email, password })
          if(existingUser){
            res.status(200).json(existingUser)
          }else{
             res.status(405).json('Incorrect Details')
             
          }
      
      } catch (error) {
          res.status(400).json(error)
      }
  }

  //get all user
  exports.getAllUser = async(req, res)=>{
    console.log(`Inside All user controller`);

    try {
      const allUser = await users.find()
      res.status(200).json(allUser)
    } catch (error) {
             res.status(400).json(error)
    }
    
  }
