import mongoose from 'mongoose'
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

const hiddenProps = {
  imagePath: String
}

const beerSchema = new Schema(Object.assign({}, beerProperties, hiddenProps))

export {
  beerProperties,
  beerSchema
}
