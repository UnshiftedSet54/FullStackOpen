import './App.css'
import { useState, useEffect } from 'react'
//import axios from 'axios'
import db from './services/db'
import Form from './components/Form/Form'
import Contacts from './components/Contacts/Contacts'
import Filter from './components/Filter/Filter'
import Notification from './components/Notification/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ search, setSearch ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState({mdg: '', error: false})

  useEffect(() => {
    db.getPersons().then(data => setPersons(data))
  },[])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const foundPerson = persons.filter(person => person.name === newName)
    if(foundPerson.length > 0 && window.confirm(`${newName} already exists. Do you want to update the number?`)){
      return db.updatePerson(foundPerson[0].id, {name: newName, number: newNumber})
      .then(({data}) => {
        const newPersonState = persons.map(person => person.id === foundPerson[0].id ? {id: person.id, name: newName, number: newNumber}:person)
        setPersons(newPersonState)
        setErrorMessage({msg: `${newName} updated successfully.`, error: false})
        setTimeout(() => {
          setErrorMessage({msg: '', error: false})
        }, 5000)
      })
      .catch(error => {
        if(error.response.status === 404){
          setErrorMessage({msg: `${newName} already deleted from the server.`, error: true})
          setTimeout(() => {
            setErrorMessage({msg: '', error: false})
            window.location.reload()
          }, 5000)
          return
        }
        return setErrorMessage({msg: error.response.message, error: true})
      })  
    }

    const newId = Math.max(...persons.map(person => person.id)) + 1
    if(newName){
      db.postPerson({name: newName, number: newNumber})
      .then(() => {
        setPersons([...persons, {name: newName, number: newNumber, id: newId}])
        setErrorMessage({msg: `${newName} added successfully.`, error: false})
        setTimeout(() => {
          setErrorMessage({msg: '', error: false})
        }, 5000)
      })
    }
  }

  const handleDelete = (event) => {
    //console.log(JSON.parse(event.target.value))
    const id = Number(event.target.value)
    let deletedPerson = ''
    const updatedPersons = persons.filter(person => {
      if(person.id === id){
        deletedPerson = person.name
        return false
      }
      return true
    }) 
    if(window.confirm(`Delete ${deletedPerson}?`)) db.deletePerson(id).then(() => {
      setPersons(updatedPersons)
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch}/>
      <h2>add a new</h2>
      <Notification message={errorMessage} />
      <Form handleSubmit={handleSubmit} handleNewName={handleNewName} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <Contacts persons={persons} search={search} handleDelete={handleDelete}/>
    </div>
  )
}

export default App;
