const mongoose = require('mongoose');
const QuestionSchema = require('./Question');

const QuizSchema = new mongoose.Schema({
  quizName: {
    type: String
  },
  quizDesc: {
    type: String
  },
  date:{
    type: Date, 
    default: Date.now
  },
  contact:{
      type: Number
  },
  questions:[QuestionSchema]

});

module.exports = QuizSchema;
