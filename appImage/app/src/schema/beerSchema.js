const mongoose = require('mongoose')
const Schema = mongoose.Schema

const beerProperties = {
  name: String,
  text: String,
  type: String,
  category: String,
  alcoholPercentage: String,
  IBU: String,
  OG: String,
  servingTemperature: String
}

const beerSchema = new Schema(beerProperties)

export {
  beerProperties,
  beerSchema
}
