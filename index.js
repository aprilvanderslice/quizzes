const express = require('express')
const app = express()
const quizzesCtrl = require('./src/controllers/quizzes')
const questionsCtrl = require('./src/controllers/questions')
const choicesCtrl = require('./src/controllers/choices')
const authCtrl = require('./src/controllers/auth')
const session = require('express-session')
const res = require('express/lib/response')
app.use(session({
    saveUninitialized: false,
    secret: 'keyboard cat',
    cookie: { maxAge: 60000 }
}))

app.set('views', __dirname + '/src/views') //current directory that this file is in
// set view engine to twig
app.set('view engine', 'twig')

app.get(
    '/', (request, response, next) => { response.render('home/home')}
)

//mount router at certain endpoint. 
app.use('/quizzes', quizzesCtrl)
app.use('/questions', questionsCtrl)
app.use('/choices', choicesCtrl)
app.use('/auth', authCtrl)

// tell the app to listen to requests on a port
app.listen(3000)