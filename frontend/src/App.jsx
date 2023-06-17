import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'

import { Home, CreatePost } from './pages'

const App = () => {
  return (
    <BrowserRouter>
      <header className='flex justify-between items-center w-full  px-8 py-4 border-b bg-[#1D212A] border-black text-white'>
        <Link to='/' className='flex items-center gap-1 text-2xl'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='1em' viewBox='0 0 576 512'><path d='M339.3 367.1c27.3-3.9 51.9-19.4 67.2-42.9L568.2 74.1c12.6-19.5 9.4-45.3-7.6-61.2S517.7-4.4 499.1 9.6L262.4 187.2c-24 18-38.2 46.1-38.4 76.1L339.3 367.1zm-19.6 25.4l-116-104.4C143.9 290.3 96 339.6 96 400c0 3.9 .2 7.8 .6 11.6C98.4 429.1 86.4 448 68.8 448H64c-17.7 0-32 14.3-32 32s14.3 32 32 32H208c61.9 0 112-50.1 112-112c0-2.5-.1-5-.2-7.5z' /></svg>
          <h2 className=' font-bold'>AIrtist</h2>
        </Link>
        <Link to='/create-post' className='create flex items-center bg-[#801E1E] py-2 px-4 rounded font-semibold sm:px-8 '>
          Create
        </Link>
      </header>
      <main className='sm:p-8 px-6 py-2 w-full bg-[#252A34] min-h-[calc(100vh-73px)] '>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/create-post' element={<CreatePost />} />
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
