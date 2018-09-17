const QuestionSchema = require('../models/Question');
const mongoose = require("mongoose");
const Question = mongoose.model('Question', QuestionSchema)

module.exports = (app) => {
    app.post('/api/createQuestion', (req, res, next) => {
        const { questionText, duration, complexity, answers } = req.body;
            const newQuestion = new Question();
            newQuestion.questionText = questionText;
            newQuestion.duration = duration;
            newQuestion.complexity = complexity;
            newQuestion.answers = answers;
            newQuestion.save((err, Question) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Question added',
                    question:Question
                });
            });
    });

    app.get('/api/getQuestions', (req, res) => {
        Question.find({}, (err, questions) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error in fetching questions'
                });
            }
            return res.send({
                success: true,
                message: 'Question added',
                questions
            });
        })
    
      })
    app.delete('/api/deleteQuestions', (req, res) => {
    Question.deleteOne({ _id: req.body._id }, (err, del) => {
        if (err) {
            return res.send({
                success: false,
                message: 'Error: Server error in deletin questions'
            });
        }
        return res.send({
            success: true,
            message: 'Question deleted'
        });
    })

    })

      app.put('/api/editQuestion', (req, res) => {
          const { questionText, duration, complexity, answers } = req.body;
          Question.findById(req.body._id, function (err, question) {
            if (err) return handleError(err);
            question.set({ questionText, duration, complexity, answers });
            question.save(function (err, updatedquestion) {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Error: Server error in deletin questions'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Question updated',
                    question:updatedquestion

                });
            });
          });
    })
};
