import { useState } from "react"

const Part = ({part, exercises}) => {
  return (
    <p>
    {part} {exercises}
  </p>
  )
}

const Header = ({course}) => {
  return (
    <>
      <h1>{course}</h1>
    </>
  )
}


const Content = ({part1, part2, part3, exercises1, exercises2, exercises3}) => {
  return (
    <>
      <Part part={part1} exercise={exercises1}/>
      <Part part={part2} exercise={exercises2}/>
      <Part part={part3} exercise={exercises3}/>
    </>
  )
}

const Total = ({exercises1, exercises2, exercises3}) => {
  return (
    <>
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    </>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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
  
  const [counter, setCounter] = useState(0)

  return (
    <div>
     <Header course={course} />
     <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>
        plus
      </button>
     <Total 
      exercises1 = {parts[0].exercises}
      exercises2 = {parts[1].exercises}
      exercises3 = {parts[2].exercises}
     />
    </div>
  )
}


export default App;
