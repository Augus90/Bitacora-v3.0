// import { useState } from 'react'
// import './App.css'
import Content from './Components/TabsBitacora/Content'
import Header from './Components/Header'
import Paperbase from './Components/Paperbase'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'



function App() {

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Paperbase/>
      </LocalizationProvider>
    </>
  )
}

export default App
