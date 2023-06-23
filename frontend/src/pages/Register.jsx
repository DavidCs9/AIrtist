import React, { useState } from 'react'
import { register } from '../services/register'
import { useNavigate, Link } from 'react-router-dom'

const Register = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')

  const navigate = useNavigate()

  const handleRegister = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setPassword('')
      setconfirmPassword('')
      window.alert('Las contraseñas no coinciden')
      return
    }
    try {
      const user = await register({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      navigate('/create-post')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <section className='px-6 py-8'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='flex items-center mb-6 text-2xl font-semibold text-white'>
          Registraste
        </h1>
        <div
          className='w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800
          border-gray-700'
        >
          <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
            <h1 className='text-xl font-bold leading-tight tracking-tight  md:text-2xl text-white'>
              Crear una cuenta
            </h1>
            <form className='space-y-4 md:space-y-6' onSubmit={handleRegister}>
              <div>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Tu usuario
                </label>
                <input
                  type='text'
                  name='username'
                  value={username}
                  className=' border   sm:text-sm rounded-lg
                  focus:ring-primary-600 before:focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600
                placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                  placeholder='Usuario123'
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Contraseña
                </label>
                <input
                  type='password'
                  name='password'
                  id='password'
                  value={password}
                  placeholder='••••••••'
                  className=' border  sm:text-sm rounded-lg
                  focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600
                placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500'
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-white'>
                  Confirmar contraseña
                </label>
                <input
                  type='password'
                  name='confirm-password'
                  id='confirm-password'
                  value={confirmPassword}
                  placeholder='••••••••'
                  className=' border  sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600
                placeholder-gray-400
                text-white focus:ring-blue-500 focus:border-blue-500'
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </div>
              <button
                type='submit'
                className='w-full text-white create hover:bg-primary-700 focus:ring-4 focus:outline-none
              focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center
              dark:hover:bg-primary-700 dark:focus:ring-primary-800'
              >
                Crear una cuenta
              </button>
              <p className='text-sm font-light text-gray-400'>
                Ya tienes una cuenta?
                <Link to='/login' className='font-medium  hover:underline text-cyan-300 '> Inicia sesión aqui
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
