const Header = (props) =>{
  return (
    <>
        <h1>{props.course}</h1>
    </>
  )
}

const Content = (props) =>{
  const part1 = props.parts[0].name
  const part2 = props.parts[1].name
  const part3 = props.parts[2].name
  const exercises1 = props.parts[0].exercises
  const exercises2 = props.parts[1].exercises
  const exercises3 = props.parts[2].exercises

  return (
    <>
      <p><Part part = {part1} exercises = {exercises1}/></p>
      <p><Part part = {part2} exercises = {exercises2}/></p>
      <p><Part part = {part3} exercises = {exercises3}/></p>
    </>
  )
}

const Part = (props) =>
{
  return (
    <>
      {props.part} {props.exercises}
    </>
  )
}

const Total = (props) =>{
  const amount1 = props.parts[0].exercises
  const amount2 = props.parts[1].exercises
  const amount3 = props.parts[2].exercises

  return(
    <>
      <p>Number of exercises {amount1 + amount2 + amount3}</p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App
