const Buttons = ({handleGood, handleNeutral, handleBad}) => {
  return(
    <div>
      <button onClick={handleGood}>good</button>
      <button onClick={handleNeutral}>neutral</button>
      <button onClick={handleBad}>bad</button>
    </div>
  )
  
}

export default Buttons
