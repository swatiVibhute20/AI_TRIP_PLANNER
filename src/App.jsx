import { useState } from 'react'
import './App.css'
import { Button } from './components/ui/button'
import Hero from './components/custom/Hero'

function App() {
  const [count, setCount] = useState(0)
  // console.log(import.meta.env.VITE_GOOGLE_PLACE_API_KEY);
  return (
    <>
      {/* Hero */}
      <Hero />
    </>
  )
}

export default App
