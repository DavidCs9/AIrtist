import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'
import { login } from '../services/login'

const CreatePost = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    prompt: '',
    photo: ''
  })
  const [generatingImg, setGeneratingImg] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.prompt && form.photo) {
      setLoading(true)

      try {
        const { token } = user
        const response = await fetch('http://localhost:8080/api/v1/post', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify(form)
        })

        await response.json()
        navigate('/')
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    } else {
      console.log('Please enter a prompt and an image')
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSurpriseMe = () => {
    const randomPrompt = getRandomPrompt(form.prompt)
    setForm({ ...form, prompt: randomPrompt })
  }

  const generateImage = async () => {
    if (form.prompt) {
      try {
        setGeneratingImg(true)
        const { token } = user
        const response = await fetch('http://localhost:8080/api/v1/dalle', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ prompt: form.prompt })
        })
        const data = await response.json()
        setForm({ ...form, photo: `data:image/jpeg;base64,${data.photo}` })
      } catch (error) {
        console.log(error)
      } finally {
        setGeneratingImg(false)
      }
    } else {
      console.log('Please enter a prompt')
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await login({ username, password })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setPassword('')
      setUsername('')
    } catch (error) {
      console.log(error)
    }
  }

  const renderLoginForm = () => {
    return (
      <section className='h-[850px] mb-4 bg-black bg-opacity-80 flex justify-center align-middle'>
        <form onSubmit={handleLogin} className='flex flex-col gap-3 w-60'>
          <h1 className='text-white text-[32px]'>Login</h1>
          <p className='text-white text-[16px]'>Login to your account</p>
          <input
            type='text'
            value={username}
            name='username'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            value={password}
            name='password'
            placeholder='password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='bg-green-600 text-white mt-4 py-2 px-4 rounded'>
            Login
          </button>

        </form>
      </section>
    )
  }

  const renderPostForm = () => {
    return (
      <section className=' max-w-7xl mx-auto text-white'>
        <div>
          <h1 className='font-bold  text-[32px]'>Crear post</h1>
          <p className='mt-2  text-[16px] text-slate-300'>
            Crea un post para compartir con la comunidad
          </p>
        </div>

        <form className='mt-4 max-w-3xl' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-5'>
            <FormField
              labelName='Tu nombre'
              type='text'
              name='name'
              placeholder='David Castro'
              value={form.name}
              handleChange={handleChange}
            />
            <FormField
              labelName='Prompt'
              type='text'
              name='prompt'
              placeholder='A cute cat, digital art'
              value={form.prompt}
              handleChange={handleChange}
              isSurpriseMe
              handleSurpriseMe={handleSurpriseMe}
            />
            <div className='p-3 relative bg-gray-50 border border-gray-300 rounded-lg
   text-sm focus:ring-blue-500 focus:border-blue-500 w-64 h-64
  flex justify-center items-center'
            >
              {form.photo
                ? (
                  <img src={form.photo} alt={form.prompt} className='w-full h-full object-contain' />
                  )
                : (
                  <img src={preview} alt='preview' className='w-9/12 h-9/12 object-contain opacity-40' />
                  )}

              {generatingImg && (
                <div className='absolute inset-0 z-0 flex justify-center items-center rounded-lg bg-black/60'>
                  <Loader />
                </div>
              )}
            </div>
          </div>

          <div className='mt-5 flex gap-5'>
            <button
              type='button'
              onClick={generateImage}
              className='create text-white font-medium rounded-md text-sm w-full sm:w-[200px] px-5 py-2.5 text-center'
            >
              {generatingImg ? 'Generando...' : 'Generar'}
            </button>
          </div>

          <div className='mt-10'>
            <p className=' text-[14px] text-slate-300'>
              Una vez creada la imagen que te gusta, compartela con la comunidad
            </p>
            <button
              type='submit'
              className='mt-3 text-white bg-emerald-700 font-medium rounded-md text-sm w-full sm:w-[200px] px-5 py-2.5 text-center hover:bg-opacity-60'
            >
              {loading ? 'Compartiendo...' : 'Compartir'}
            </button>
          </div>

        </form>
      </section>
    )
  }

  const renderUserAuth = () => {
    return (
      <section className='flex justify-center items-center'>
        <div>
          <Link to='/register'>
            Registrarse
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      {user
        ? renderPostForm()
        : renderUserAuth()}

    </>
  )
}

export default CreatePost
