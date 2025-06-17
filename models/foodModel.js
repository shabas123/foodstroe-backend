const mongoose = require("mongoose");

const foodSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  varients: {
    type: [String],
    required: true,
    enum: ['Quater', 'Half', 'Full']
  },
  prices: [{
    Quater: {
      type: Number,
      required: true
    },
    Half: {
      type: Number,
      required: true
    },
    Full: {
      type: Number,
      required: true
    }
  }],
  category: {
    type: String,
    required: true,
    enum: ['Pizza', 'Burger', 'Sandwich', 'Pasta', 'Salad', 'Sides', 'Dessert']
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: v => /^https?:\/\/.+\..+/.test(v),
      message: props => `${props.value} is not a valid URL!`
    }
  }
});


const food = mongoose.model('food', foodSchema)
module.exports = food