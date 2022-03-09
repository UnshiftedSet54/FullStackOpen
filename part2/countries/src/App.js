import './App.css';
import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter/Filter'
import Countries from './components/Countries/Countries'

const App = () => {

  const [ countries, setCountries ] = useState([])
  const [ search, setSearch ] = useState('')

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all').then(({data}) => setCountries(data)).catch(error => console.log(error))
  }, [])

  const handleSearch = event => {
    setSearch(event.target.value)
  }

  return(
    <div>
      <Filter handleSearch={handleSearch}/>
      <Countries countries={countries} search={search} handleSearch={handleSearch}/>
    </div>
  )
}

export default App;
