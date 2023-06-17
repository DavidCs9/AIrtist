import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import { logo } from './assets'
import { Home, CreatePost } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <header className='flex justify-between items-center w-full  px-8 py-4 border-b'>
        <Link to='/' className='flex items-center'>
          <img src={logo} alt='logo' className='w-28 object-contain' />
        </Link>
        <Link to='/create-post' className='flex items-center bg-green-700 py-2 px-4 rounded text-white'>
          Create
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-neutral-300 min-h-[calc(100vh-73px)]'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
