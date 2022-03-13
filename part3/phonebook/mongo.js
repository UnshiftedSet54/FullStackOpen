const mongoose = require('mongoose')

const password = process.argv[2]
const newuser = process.argv[3]
const newnumber = process.argv[4]

const url =
  `mongodb+srv://UnshiftedSet54:${password}@cluster0.3duf3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Persons', personSchema)

if (!newuser && !newnumber) {
  Person.find({}).then(response => {
    console.log('Phonebook:')
    response.forEach(element => console.log(`${element.name} ${element.number}`))
    mongoose.connection.close()
  }).then(() => process.exit(1))
}

if (!password && !newuser && !newnumber) {
  console.log('Please provide the username and password as an argument: node mongo.js <password> <newuser> <newnumber>')
  mongoose.connection.close()
  process.exit(1)
}

const person = new Person({ name: newuser, number: newnumber })

person.save().then(result => {
  console.log(`Added ${newuser} number ${newnumber} to phonebook`)
  console.log(result)
  mongoose.connection.close()
})
