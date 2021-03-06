import queryString from 'querystring'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Card from 'react-bootstrap/Card'
import Login from './Login'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const styles = {
    loginContainer: {
        display: 'flex',
        width: '30rem',
        height: '30rem',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1rem',
    }
}

function Home({ isLoggedIn }) {
	const [quizzes, setQuizzes] = useState([])
	useEffect(() => {
		async function fetchQuizzes() {
			const params = queryString.parse(window.location.search.replace(/^\?/, ''))
			console.log('params from Home.js: ', params)
			const response = await axios('http://localhost:3000/quizzes', {
        headers: {
          token: localStorage.token
        }
      })
	  		setQuizzes(response.data)
		}
		fetchQuizzes()
	}, []);
	
	 if (!isLoggedIn) {
		return (
		<section style={styles.loginContainer}>
			<Login />
		</section>
		)
	}
	return (
		<section className="main-content">
			<h1>Quizzes</h1>
			<Row xs={1} sm={2} md={3} lg={4} className="g-3" >
					{quizzes.map(q => (
						<Col>
							<Link 
								to={'/quizzes/' + q.id}
								style={{
									textDecoration: "none",
									color: "black"
								}}
							>
								<Card style={{ maxWidth: '18rem', minHeight: '11rem'}}>
									<Card.Body>
									<Card.Title>
										{q.name}
									</Card.Title>
									<Card.Text style={{ fontSize: '80%' }}>
										This is information about the quiz that would ideally entered dynamically.
									</Card.Text>
									</Card.Body>
									<Card.Footer style={{ fontSize: '60%' }}>
										<small className="text-muted">Last Updated: {q.updatedAt}</small>
									</Card.Footer>
								</Card>
							</Link>
						</Col>
					))}
			</Row>
		</section>
	)
	
}

export default Home