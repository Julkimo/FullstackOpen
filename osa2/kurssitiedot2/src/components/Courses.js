const Header = ({course}) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {parts.map( part =>
        <p key={part.id}>
          <Part part={part.name} exercises={part.exercises} />
        </p>
      )}
    </>
  )
}

const Part = ({part, exercises}) => {
  return (
    <>
      {part} {exercises}
    </>
  )
}

const Total = ({parts}) => {
  const exerciseTotal = parts.reduce((exerciseSum, currentValue) => exerciseSum + currentValue.exercises, 0)
  return (
    <>
      <p> Number of exercises {exerciseTotal} </p>
    </>
  )
}

const Courses = ({courses}) => {
  return (
    <>
      {courses.map( course =>
        <div key={course.id}>
          <Header course={course.name} />
          <Content parts={course.parts} />
          <Total parts={course.parts} />
        </div>
      )}
    </>
  )
}


export default Courses
