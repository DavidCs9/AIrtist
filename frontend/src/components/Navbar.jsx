import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])
  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  return (
    <header className='flex justify-between items-center w-full  px-8 py-4 border-b bg-[#1D212A] border-black text-white'>
      <div>
        <Link to='/' className='flex items-center gap-1 text-2xl hover:text-gray-300'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='1em' viewBox='0 0 576 512'><path d='M339.3 367.1c27.3-3.9 51.9-19.4 67.2-42.9L568.2 74.1c12.6-19.5 9.4-45.3-7.6-61.2S517.7-4.4 499.1 9.6L262.4 187.2c-24 18-38.2 46.1-38.4 76.1L339.3 367.1zm-19.6 25.4l-116-104.4C143.9 290.3 96 339.6 96 400c0 3.9 .2 7.8 .6 11.6C98.4 429.1 86.4 448 68.8 448H64c-17.7 0-32 14.3-32 32s14.3 32 32 32H208c61.9 0 112-50.1 112-112c0-2.5-.1-5-.2-7.5z' /></svg>
          <h2 className=' font-bold'>AIrtist</h2>
        </Link>
      </div>
      <div className='flex gap-4'>
        {user
          ? (
            <div className='flex gap-2 text-xs'>
              <Link to='/create-post' className='create flex items-center py-2 px-4 rounded font-semibold sm:px-8'>
                Crear
              </Link>

              <button onClick={handleLogout} className=' bg-purple-900 hover:bg-opacity-70 flex items-center py-2 px-4 rounded font-semibold sm:px-4 hover:cursor-pointer '>
                <Link to='/'>
                  Cerrar sesión
                </Link>
              </button>
            </div>

            )
          : (
            <Link to='/create-post' className='create flex items-center py-2 px-4 rounded font-semibold sm:px-8 '>
              Crear
            </Link>
            )}
      </div>
    </header>
  )
}

export default Navbar
