const Contacts = ({persons, search, handleDelete}) => {
  return persons.filter(person => {
    if(!search) return true
    return person.name.toLowerCase().includes(search.toLowerCase())
  }).map(person => <div key={person.id}>{person.name} {person.number} <button value={person.id} onClick={handleDelete}>delete</button></div>)
}

export default Contacts