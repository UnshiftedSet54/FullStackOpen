import Weather from "../Weather/Weather"

const Countries = ({countries, search, handleSearch}) => {
  
  const filter = countries.filter(country => {
    if(!search) return true
    return country.name.official.toLowerCase().includes(search.toLowerCase())
  })

  if(filter.length > 10) return <div>Too many countries, specify a filter.</div>

  if(filter.length === 1) return(
    <div>
      <h1>{filter[0].name.official}</h1>
      <div>capital: {filter[0].capital[0]}</div>
      <div>area: {filter[0].area}</div>
      <h3>Languages:</h3>
      <ul>
        {Object.values(filter[0].languages).map((lang, index) => <li key={index}>{lang}</li>)}
      </ul>
      <img src={filter[0].flags.png} alt={`${filter[0].name.official} flag`}/>
      <Weather latlng={filter[0].latlng}/>
    </div>
  )

  return filter.map(country => {return(
    <div key={country.name.official}>
      {country.name.official} 
      <button value={country.name.official.toLowerCase()} onClick={handleSearch}>show</button>
    </div>
  )})
}

export default Countries