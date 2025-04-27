// models/MenuItem.js
const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  varients: {
    type: [String],
    required: true,
    varients: ['small', 'medium', 'large']
  },
  prices: [{
    small: {
      type: Number,
      required: true
    },
    medium: {
      type: Number,
      required: true
    },
    large: {
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

const items = mongoose.model('items', itemSchema);

module.exports = items