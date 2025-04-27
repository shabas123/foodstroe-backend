const expess = require("express")
const { getAllItemsController } = require("../controllers/itemController")
const  userController  = require("../controllers/userController")
const jwtMiddleware = require("../middleware/jwtMiddleware")
const { addItem, removeAdminItem, updateAdminItem } = require("../controllers/projectController")
const multer = require("multer")
const { createOrder, getAllOrders } = require("../controllers/orderController")
const upload = multer(); 


const router = new expess.Router()
// GET ALL DATA
router.get('/all-items', getAllItemsController)

// register
router.post('/register', userController.register);

// login
router.post('/login', userController.login);

// add item
router.post('/all-items', addItem); 

//delete item
router.delete('/remove-useritem/:id', removeAdminItem)

// update item
router.put('/update-useritem/:id', upload.none(), updateAdminItem); 
//get all user
router.get('/all-user', userController.getAllUser)

// order post
router.post('/order', createOrder )

//order get admin
router.get('/all-order' , getAllOrders)

module.exports = router

