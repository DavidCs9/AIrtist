import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'

const Dashboard = () => {
  const [user, setUser] = useState(null)
  const loggedUserJSON = window.localStorage.getItem('loggedUser')

  useEffect(() => {
    if (loggedUserJSON) {
      const userJson = JSON.parse(loggedUserJSON)
      setUser(userJson)
    }
  }, [loggedUserJSON])

  return (
    <div>
      <Navbar />
      {user
        ? (
          <div>Welcome to the dashboard {user.username}</div>
          )
        : (
          <div>Loading...</div>
          )}
    </div>
  )
}

export default Dashboard
