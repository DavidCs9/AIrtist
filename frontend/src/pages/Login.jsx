import React, { useState } from 'react'
import { login } from '../services/login'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from '../components/Navbar'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleBadLogin = () => {
    window.alert('Usuario o contraseña incorrectos')
    setUsername('')
    setPassword('')
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      navigate('/dashboard')
    } catch (error) {
      handleBadLogin()
      console.log(error)
    }
  }
  return (
    <>
      <Navbar />
      <section className=''>
        <div className='flex flex-col items-center justify-center px-6 py-8 '>
          <h1 className='flex items-center mb-6 text-2xl font-semibold text-white'>
            Iniciar sesión
          </h1>
          <div className='w-full  rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700'>
            <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
              <h1 className='text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white'>
                Inicia sesión con tu cuenta
              </h1>
              <form className='space-y-4 md:space-y-6' onSubmit={handleLogin}>
                <div>
                  <label className='block mb-2 text-sm font-medium text-white'>Tu usuario</label>
                  <input
                    type='text'
                    name='username'
                    id='username'
                    value={username}
                    className=' border  sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600
                  placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                    placeholder='Usuario123'
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <label for='password' className='block mb-2 text-sm font-medium  text-white'>Contraseña</label>
                  <input
                    type='password' name='password' id='password' placeholder='••••••••' value={password}
                    className=' border  sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600
                  placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className='flex items-center justify-between'>
                  <div className='flex items-start'>
                    <div className='flex items-center h-5'>
                      <input
                        id='remember'
                        aria-describedby='remember'
                        type='checkbox'
                        className='w-4 h-4 border rounded  focus:ring-3 focus:ring-primary-300
                    bg-gray-700 border-gray-600 focus:ring-primary-600 ring-offset-gray-800' required=''
                      />
                    </div>
                    <div className='ml-3 text-sm'>
                      <label for='remember' className='text-gray-300'>Recuerdame</label>
                    </div>
                  </div>
                  <Link to='#' className='text-sm font-medium hover:underline text-cyan-300 '>Olvidaste la contraseña?</Link>
                </div>
                <button
                  type='submit'
                  className='create w-full text-white  focus:ring-4 focus:outline-none
                 font-medium rounded-lg text-sm px-5 py-2.5 text-center'
                >iniciar sesión
                </button>
                <p className='text-sm font-light text-gray-400'>
                  No tienes una cuenta todavia?
                  <Link
                    to='/register'
                    className='font-medium  hover:underline text-cyan-300'
                  > Registrate
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

    </>

  )
}

export default Login
