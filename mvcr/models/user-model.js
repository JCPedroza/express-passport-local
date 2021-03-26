const { Schema, model } = require('mongoose')
const { isEmail } = require('validator')

const { schemaOptions, modelNames } = require('./model-config')

const username = {
  type: String,
  unique: true,
  required: true,
  minlength: 4,
  maxlength: 64
}

const password = {
  type: String,
  required: true
}

const email = {
  type: String,
  required: true,
  maxlength: 128,
  validate: {
    validator: isEmail,
    message: 'Invalid email.'
  }
}

const user = {
  username,
  password,
  email
}

const userSchema = new Schema(user, schemaOptions)

const User = model(modelNames.user, userSchema)

module.exports = User
