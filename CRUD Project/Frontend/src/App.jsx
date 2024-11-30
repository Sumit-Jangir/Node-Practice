import { useState } from 'react'
import './App.css'
import UserData from './Components/UserData'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Todo/> */}
      <UserData/>
    </>
  )
}

export default App
