const items = require("../models/itemModel");

exports.addItem = async (req, res)=>{
  console.log(`inside Add item controller`);

  const {name, category, varients, image, prices}=  req.body
  console.log(name, category, varients, image, prices);
  
console.log(req.body);

  try {
    const existingItem = await items.findOne({name})
      if(existingItem){
        res.status(406).json(`item already added`)
      }else{
        const newItem = new items({
          name, category, varients,image ,prices
        })
        await newItem.save()
        res.status(200).json(newItem)
      }
    
  } catch (error) {
    res.status(401).json(`item added failed ${error}`)
    
  }
  
}

//delete items
exports.removeAdminItem = async(req, res)=>{
  console.log(`Inside Delete items `);
  const {id} = req.params
  try {
    await items.findByIdAndDelete({_id : id})
    res.status(200).json(`Item deleted`)
  } catch (error) {
    res.status(401).json(error)
  }
  
}

//update items

exports.updateAdminItem = async (req, res) => {
  console.log(`Inside Edit User`);
  const { id } = req.params;
  const userId = req.payload;

  try {
    let { name, category, varients, prices, image } = req.body;

    console.log("Raw body from FormData:", req.body);

  
    varients = JSON.parse(varients);
    prices = JSON.parse(prices);

    const updatedItem = await items.findByIdAndUpdate(
      { _id: id },
      { name, category, varients, prices, image },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    await updatedItem.save();

    return res.status(200).json({ success: true, data: updatedItem });

  } catch (error) {
    console.error(" Error updating item:", error.message);
    return res.status(400).json({ success: false, message: "Item update failed", error: error.message });
  }
};

