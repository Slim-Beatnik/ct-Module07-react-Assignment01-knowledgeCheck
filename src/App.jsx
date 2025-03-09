import { useState } from 'react'
import './App.css'
import QuizSelectionForm from './components/QuizSelectionForm'

function App() {
  // Placeholder for the fetched data from the AP
  const [placeholder] = useState([])
    
  placeholder


  return (
    <>
      <h1>&#128405; Your Mom</h1>
      <QuizSelectionForm />
    </>
  )
}

export default App
