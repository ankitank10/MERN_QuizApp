
const CandidateSchema = require('../models/Candidate');
const mongoose = require("mongoose");
const Candidate = mongoose.model('Candidate', CandidateSchema);
const QuizSchema = require('../models/Quiz');
const Quiz = mongoose.model('Quiz', QuizSchema)

module.exports = (app) => {

    app.post('/api/candidateLogin', (req, res, next) => {
        const { name, email, contactNo, quizId } = req.body;
            const newCandidate = new Candidate();
            newCandidate.name = name;
            newCandidate.email = email;
            newCandidate.quizId = quizId;
            newCandidate.contactNo = contactNo;
            newCandidate.save((err, Candidate) => {
                if (err) {
                    return res.send({
                        success: false,
                        message: 'Candidate login failed'
                    });
                }
                return res.send({
                    success: true,
                    message: 'Candidate added',
                    candidate:Candidate
                });
            });
    });

    app.get('/api/fetchCandQues', (req, res) => {
        const { quizId } = req.query;
        Quiz.findOne({_id:quizId}, (err, quiz) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Error: Server error in fetching questions'
                });
            }
            return res.send({
                success: true,
                message: 'Quiz fetched',
                quiz
            });
        })
    
      })

      app.put('/api/submitResult', (req, res) => {
        const { score, id } = req.body;
        Candidate.findById(id, function (err, candidate) {
          if (err) return handleError(err);
          candidate.set({ score});
          candidate.save(function (err, updatedCandidate) {
              if (err) {
                  return res.send({
                      success: false,
                      message: 'Error: Server error in editing candidate'
                  });
              }
              return res.send({
                  success: true,
                  message: 'Score updated',
                  candidate:updatedCandidate

              });
          });
        });
  })
};
