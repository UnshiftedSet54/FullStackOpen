const Form = ({handleSubmit, handleNewName, handleNewNumber}) => {
  return(
    <form onSubmit={handleSubmit}>
      <div>name: <input onChange={handleNewName}/></div>
      <div>number: <input onChange={handleNewNumber}/></div>
      <div><button type="submit">add</button></div>
    </form>
  )
}

export default Form