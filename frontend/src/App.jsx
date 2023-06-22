import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { Home, CreatePost, Register, Login } from './pages'

const App = () => {
  return (
    <BrowserRouter>

      <main className=' w-full bg-[#252A34] min-h-screen '>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
