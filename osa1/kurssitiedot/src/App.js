const Header = (props) =>{
  return (
    <div>
        {props.course}
    </div>
  )
}

const Content = (props) =>{
  const part1 = props.part1
  const part2 = props.part2
  const part3 = props.part3
  const exercises1 = props.exercises1
  const exercises2 = props.exercises2
  const exercises3 = props.exercises3

  return (
    <div>
      <Part part = {part1} exercises = {exercises1}/>
      <Part part = {part2} exercises = {exercises2}/>
      <Part part = {part3} exercises = {exercises3}/>
    </div>
  )
}

const Part = (props) =>
{
  return (
    <div>
      {props.part} {props.exercises}
    </div>
  )
}

const Total = (props) =>{
  const amount1 = props.amount1
  const amount2 = props.amount2
  const amount3 = props.amount3

  return(
    <div>
      Number of exercises {amount1 + amount2 + amount3}
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <h1><Header course = {course}/></h1>
      <p>
        <Content 
          part1 = {part1} exercises1 = {exercises1}
          part2 = {part2} exercises2 = {exercises2}
          part3 = {part3} exercises3 = {exercises3}
        />
      </p>
      <p>
        <Total amount1 = {exercises1} amount2 = {exercises2} amount3 = {exercises3}/>
      </p>
    </div>
  )
}

export default App
