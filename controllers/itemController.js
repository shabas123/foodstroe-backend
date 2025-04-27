const items = require("../models/itemModel")

// get all items
exports.getAllItemsController = async (req, res)=>{
    try {
        const allItems = await items.find()
        res.status(200).json(allItems)
    } catch (error) {
        res.status(400).json(error)
    }
}

