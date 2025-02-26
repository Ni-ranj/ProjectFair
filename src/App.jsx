import { useContext, useState } from 'react'

import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Authentication from './pages/Authentication'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Footer from './components/Footer'
import { ToastContainer, toast } from 'react-toastify';
import { isAuthorizedContext } from './Context/ContextAPI'


function App() {
  const {isAuhtorized}=useContext(isAuthorizedContext)

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Authentication />} />
        <Route path='/register' element={<Authentication insideRegister={true} />} />
        <Route path='/dashboard' element={isAuhtorized?<Dashboard />:<Navigate to={'/login'}/>} />
        <Route path='/projects' element={isAuhtorized?<Projects />:<Navigate to={'/login'}/>} />


      </Routes>
      <Footer />
    </>
  )
}

export default App
