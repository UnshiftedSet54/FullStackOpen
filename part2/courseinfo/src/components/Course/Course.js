import Header from '../Header/Header'
import Content from '../Content/Content'
import Total from '../Total/Total'

const Course = ({course}) => {
  return(
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total total={course.parts.reduce((prev, current) => prev + current.exercises, 0)}/>
    </div>
  )
}

export default Course