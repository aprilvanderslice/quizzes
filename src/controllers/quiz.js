const express = require('express')
const quizCtlr = express.Router()
const { Quiz, Question, Choice } = require('../models')
const { quizIsValid } = require('../middlewares/forms')
const isAuthenticated = require('../middlewares/auth')

quizCtlr.get('/', async (req, res) => {
    const quizzes = await Quiz.findAll({
        include: [
            {model: Question, include: [Choice] }
        ]
    })
    res.json(quizzes)
})

quizCtlr.post('/', async (req, res) => {
    // if (req.errors.length > 0) {
    //     res.render('quizzes/create', {
    //         errors: req.errors
    //     })
    // } else {
        const quiz = await Quiz.create(req.body)
        res.redirect('/quizzes')
    // }
})

quizCtlr.get('/new', (req, res) => {
    res.render('quizzes/create')
})

quizCtlr.get('/:id', async (req, res) => {
    const quiz = await Quiz.findByPk( Number(req.params.id), {
        include: [
            {model: Question, include: [Choice] }
        ]
    })
    res.json(quiz)
})


quizCtlr.post('/:id', async(req, res) => {
    // if(req.errors.length === 0) {
        let quiz = await Quiz.update(req.body, {
            where: { id: Number(req.params.id) }
        })
    // }
    res.json(quiz) 
    // res.render('quizzes/edit', { quiz})
    // { quiz, errors: req.errors }
    
})

quizCtlr.get('/:id/edit', async (req, res) => {
    let quiz = await Quiz.update(req.body, {
        where: { id: Number(req.params.id) }
    })
    // instructor repo included an extra definition of quiz
    // let quiz = await Quiz.findByPk( Number(req.params.id) )
    res.render('quizzes/edit', { quiz })
})

quizCtlr.delete('/:id', async(req, res) => {
    const deleted = await Question.destroy({
        where: { id: Number(req.params.id) }
    })
    res.json(deleted)
})

// // original: 
// quizCtlr.get('/:id/delete', async (req, res) => {
//     const deleted = await Quiz.destroy({ 
//         where: { id: Number(req.params.id) }
//     })
//     res.redirect('/quizzes')
// })

module.exports = quizCtlr