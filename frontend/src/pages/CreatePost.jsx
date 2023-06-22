import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { preview } from '../assets'
import { getRandomPrompt } from '../utils'
import { FormField, Loader } from '../components'
import Navbar from '../components/Navbar'

const CreatePost = () => {
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

  const renderPostForm = () => {
    const { username } = user

    return (
      <>
        <Navbar />
        <section className=' mx-auto text-white mt-4 sm:mt-3 p-6 sm:mx-20 '>
          <div>
            <div className='flex gap-2 font-bold text-2xl justify-center md:justify-start'>
              <h2>Bienvenido </h2>
              <h2 className=' text-emerald-500'>@{username}</h2>
            </div>
            <p className='mt-2  text-[16px] text-slate-300'>
              Crea un post para compartir con la comunidad
            </p>
          </div>

          <form className='mt-4 max-w-3xl' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-5'>
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
      </>

    )
  }

  const renderUserAuth = () => {
    return (
      <>
        <Navbar />
        <section className='text-white bg-gray-900 rounded-xl p-10 mt-24 flex flex-col w-[350px] gap-4 sm:w-[700px] mx-auto '>
          <h1 className='text-2xl font-bold text-center'>
            Bienvenido a la comunidad
          </h1>
          <h2 className='text-md text-center text-gray-400'>
            Registrate o inicia sesión para poder crear imagenes y compartirlas con la comunidad
          </h2>
          <div className='flex flex-col items-center gap-4'>
            <Link
              to='/register'
              className=' bg-green-600  px-7 py-2 text-[24px] font-bold rounded-xl hover:bg-opacity-70 flex gap-3 items-center'
            >
              <p>Registrate</p>
              <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='1em' viewBox='0 0 576 512'><path d='M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm80 256h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zm256-32H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H496c8.8 0 16 7.2 16 16s-7.2 16-16 16H368c-8.8 0-16-7.2-16-16s7.2-16 16-16z' /></svg>
            </Link>

            <Link
              to='/login'
              className='  bg-cyan-600 px-4 py-2 text-[24px] font-bold rounded-xl hover:bg-opacity-70 flex gap-3 items-center text-center'
            >
              <p>Iniciar sesión</p>
              <svg xmlns='http://www.w3.org/2000/svg' fill='currentColor' height='1em' viewBox='0 0 448 512'><path d='M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z' /></svg>
            </Link>
          </div>
        </section>
      </>

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
