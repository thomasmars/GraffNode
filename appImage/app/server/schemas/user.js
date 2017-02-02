import mongoose from 'mongoose'
import bcrypt from 'bcrypt-nodejs'

const Schema = mongoose.Schema

const userProperties = {
  username: String,
  password: String
}

const userSchema = new Schema(userProperties)
userSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

userSchema.methods.validPassword = (password, otherPassword) => {
  return bcrypt.compareSync(password, otherPassword)
}

const User = mongoose.model('User', userSchema)

export {
  userSchema,
  User
}
