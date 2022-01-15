const express = require('express')
const app = express()
const quizzesCtrl = require('./src/controllers/quizzes')
const questionsCtrl = require('./src/controllers/questions')
const choicesCtrl = require('./src/controllers/choices')

app.set('views', __dirname + '/src/views') //current directory that this file is in
// set view engine to twig
app.set('view engine', 'twig')

app.get('/', async (request, response) => {
    response.render('home/home')
})

//mount router at certain endpoint. 
app.use('/quizzes', quizzesCtrl)
app.use('/questions', questionsCtrl)
app.use('/choices', choicesCtrl)

// tell the app to listen to requests on a port
app.listen(3000)