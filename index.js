const express = require('express')
const app = express()
const quizzesCtrl = require('./src/controllers/quizzes')
const questionsCtrl = require('./src/controllers/questions')
const choicesCtrl = require('./src/controllers/choices')

app.get('/', (request, response) => {
    response.send('Home Page GET')
})

//mount router at certain endpoint. 
app.use('/quizzes', quizzesCtrl)
app.use('/questions', questionsCtrl)
app.use('/choices', choicesCtrl)

// tell the app to listen to requests on a port
app.listen(3000)