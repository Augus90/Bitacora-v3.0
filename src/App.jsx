// import { useState } from 'react'
// import './App.css'
import Content from './Components/tableTask/paperbase/Content'
import Header from './Components/tableTask/paperbase/Header'
import Paperbase from './Components/tableTask/paperbase/Paperbase'
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
