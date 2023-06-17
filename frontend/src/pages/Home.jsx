import React, { useState, useEffect } from 'react'

import { Loader, Card, FormField } from '../components'

const RenderCards = ({ data, title }) => {
  if (data?.length > 0) {
    return data.map((post) => <Card key={post._id} {...post} />)
  }
  return (
    <h2 className='mt-5 font-bold  text-xl uppercase text-red-500'>{title}</h2>
  )
}

const Home = () => {
  const [loading, setLoading] = useState(false)
  const [allPosts, setAllPosts] = useState(null)
  const [searchText, setSearchText] = useState('')
  const [searchedResults, setSearchedResults] = useState(null)
  const [searchTimeout, setSearchTimeout] = useState(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      try {
        const response = await fetch('https://airstist-backend.onrender.com/api/v1/post', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
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
  }, [])

  const handleSearch = (e) => {
    clearTimeout(searchTimeout)
    setSearchText(e.target.value)

    setSearchTimeout(
      setTimeout(() => {
        const searchResults = allPosts.filter((item) =>
          item.name.toLowerCase().includes(searchText.toLowerCase()) ||
          item.prompt.toLowerCase().includes(searchText.toLowerCase()))
        setSearchedResults(searchResults)
      }, 500)
    )
  }

  return (
    <section className=' max-w-7xl mx-auto text-white'>
      <h1 className='font-bold  text-[32px]'>Imagenes de la comunidad</h1>

      <div className='mt-8'>
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
          ? (<div><Loader /></div>)
          : (
            <>
              {searchText && (
                <h2 className='font-medium text-[#D8D8D8]'>Mostrando resultados para: <span className=' text-red-500'>{searchText}</span></h2>
              )}
              <div className='grid lg:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-3 mt-5'>
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
}

export default Home
