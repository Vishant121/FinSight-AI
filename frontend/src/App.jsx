import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Header from './components/Header.jsx'
import LandingPage from './components/LandingPage.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import Dashboard from './components/Dashboard.jsx'
import TransactionTable from './components/visuals/TransactionTable.jsx'






const App = () => {
  
  return (
    <div>
      
       <Routes> 
          
          <Route path='/' element={<LandingPage/>} />
          <Route path='/sign-in' element={<SignIn/>} />
          <Route path='/sign-up' element={<SignUp/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
          <Route path='/transaction' element={<TransactionTable/>} />
          
          
          
          
       </Routes>

    </div>
  )
}

export default App
