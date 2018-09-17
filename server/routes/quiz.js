
const QuizSchema = require('../models/Quiz');
const mongoose = require("mongoose");
const Quiz = mongoose.model('Quiz', QuizSchema)

module.exports = (app) => {
    app.post('/api/createQuiz', (req, res, next) => {
        const { quizName, quizDesc, questionsAdded } = req.body;
            const newQuiz = new Quiz();
            newQuiz.quizName = quizName;
            newQuiz.quizDesc = quizDesc;
            newQuiz.questions = questionsAdded;
            newQuiz.save((err, Quiz) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error in saving quiz'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Question added',
                    quiz:Quiz
                });
            });
    });

    app.get('/api/getQuizzes', (req, res) => {
        Quiz.find({}, (err, quizzes) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error in fetching questions'
                });
            }
            return res.send({
                success: true,
                message: 'Quizzes fetched',
                quizzes
            });
        })
    
    });
    app.delete('/api/deleteQuiz', (req, res) => {
        Quiz.deleteOne({ _id: req.body._id }, (err, del) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error in deleting quiz'
            });
        }
        return res.send({
            success: true,
            message: 'Quiz deleted'
        });
    });
})

   
};
