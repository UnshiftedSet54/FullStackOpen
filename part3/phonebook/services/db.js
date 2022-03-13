const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.DB_URI

mongoose.connect(url)
  .then(() => console.log('connected to database.'))
  .catch(error => console.log('error connecting to database.', error.message))

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    length: 8,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /\d{3}-\d{5}/.test(v)
      },
      message: props => `${props.value} is not a valid phone number!`
    },
    required: true
  }
})

module.exports = mongoose.model('Persons', personSchema)
