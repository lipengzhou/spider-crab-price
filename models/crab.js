const mongoose = require('mongoose')

const crabSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  unit: {
    type: String,
    required: true
  },
  change: {
    type: String,
    required: true
  }
})

module.exports = crabSchema
