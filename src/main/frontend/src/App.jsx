import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './components/Header'
import AppBody from './components/AppBody'

function App() {

  return (
    <div className='app'>
      <Header />
      <AppBody />
    </div>
  )
}

export default App
