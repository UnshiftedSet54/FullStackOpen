import axios from 'axios'
const baseUrl = '/api/persons'

const getPersons = () => {
  return axios.get(baseUrl).then(({data}) => data)
}

const postPerson = body => {
  return axios.post(baseUrl, body).then(({data}) => data)
}

const updatePerson = (id, body) => {
  return axios.put(`${baseUrl}/${id}`, body).then(({data}) => data)
}

const deletePerson = id => {
  return axios.delete(`${baseUrl}/${id}`).then(({data}) => data)
}

const db = {getPersons, postPerson, updatePerson, deletePerson}

export default db