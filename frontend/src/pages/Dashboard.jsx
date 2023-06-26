import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'
import { Loader, DeleteCard, FormField } from '../components'
import { motion, AnimatePresence } from 'framer-motion'

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return (
      <AnimatePresence>
        {data.map((post, index) => (
          <motion.ul
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            exit={{ x: -1000, opacity: 0, transition: { duration: 0.2 } }}
            key={post._id}
          >
            <DeleteCard {...post} />
          </motion.ul>
        ))}
      </AnimatePresence>
    )
  }
  return (
    <h2 className='mt-5 font-bold  text-xl uppercase text-red-500'>{title}</h2>
  )
}

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [searchedResults, setSearchedResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)
  const loggedUserJSON = window.localStorage.getItem('loggedUser')

  useEffect(() => {
    if (loggedUserJSON) {
      const userJson = JSON.parse(loggedUserJSON)
      setUser(userJson)
    }
  }, [loggedUserJSON])

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const response = await fetch('https://airstist-backend.onrender.com/api/v1/dashboard', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.token}`
          }
        })
        if (response.ok) {
          const results = await response.json()
          setAllPosts(results.data.reverse())
        }
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [user])

  const handleSearch = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter((item) =>
          item.prompt.toLowerCase().includes(searchText.toLowerCase()) ||
          item.user.toLowerCase().includes(searchText.toLowerCase()))
        setSearchedResults(searchResults)
      }, 500)
    )
  }

  return (
    <div>
      <Navbar />
      {user
        ? (
          <section className=' max-w-7xl mx-auto text-white mt-4 p-6'>
            <div className='flex font-bold text-3xl gap-3'>
              <h1>Tus imagenes</h1>
              <h2 className='text-emerald-400'>@{user.username}</h2>
            </div>
            <p>Elimina las imagenes que ya no te gusten...</p>
            <div
              className='mt-8'
            >
              <FormField
                labelName='Buscar posts'
                type='text'
                name='text'
                placeholder='Ej. Cat'
                value={searchText}
                handleChange={handleSearch}
              />
            </div>

            <div className='mt-10'>
              {loading
                ? (<div className='flex justify-center align-middle'><Loader /></div>)
                : (
                  <>
                    {searchText && (
                      <h2 className='font-medium text-[#D8D8D8]'>Mostrando resultados para: <span className=' text-red-500'>{searchText}</span></h2>
                    )}
                    <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-6 mt-5'>
                      {searchText
                        ? (
                          <RenderCards data={searchedResults} title='No se encontraron resultados con esta busqueda' />
                          )
                        : (
                          <RenderCards data={allPosts} title='No se encontraron posts' />
                          )}
                    </div>
                  </>)}
            </div>
          </section>
          )
        : (
          <>
            <div>Inicia sesión para visualizar el dashboard.</div>
            <Link to='/login'>Login</Link>
          </>
          )}
    </div>
  )
}

export default Dashboard
