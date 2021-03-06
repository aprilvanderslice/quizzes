
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Routes,
  Route,
  BrowserRouter as Router
} from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import Logout from './pages/Logout'
import Quiz from './Quiz'
import queryString from 'querystring'

const styles = {
  appContainer: {
    height: '100vh',
    // margin: '0 auto',
    // display: 'flex',
    // flexDirection: 'column',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  mainContainer: {
      display: 'flex',
      width: '100%',
      
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '1rem',

  }
}


function App() {
  const [jwt, setJwt] = useState('')
  
  useEffect(() => {
    async function fetchJwt() {
      const params = queryString.parse(window.location.search.replace(/^\?/, ''))

      localStorage.token = params.token
      const response = await axios('http://localhost:3000/auth/token/', {
        headers: {
          token: localStorage.token
        }
      })
      setJwt(response.data.token)
      console.log(response.data.token)
    }
    fetchJwt()
  }, [])

  

  return (
    <Router>  
      <div style={styles.appContainer}>
        <Navigation isLoggedIn={jwt ? true : false} setJwt/>
        <main style={styles.mainContainer}>
          <Routes>
            <Route exact path='/' element={<Home isLoggedIn={jwt ? true : false} />} />
            <Route exact path='/quizzes/:id' element={<Quiz />} />
            <Route exact path='/logout' element={<Logout />}></Route>
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
