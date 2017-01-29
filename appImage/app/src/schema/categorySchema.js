const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categoryProperties = {
  name: String,
  color: String
}

const categorySchema = new Schema(categoryProperties)

export {
  categoryProperties,
  categorySchema
}
