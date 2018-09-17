const mongoose = require('mongoose');
const AnswerSchema = require('./Answer');

const QuestionSchema = new mongoose.Schema({
  questionText: {
    type: String
  },
  duration: {
    type: Number,
    default: 60
  },
  complexity: {
    type: Number,
    default: 1
  },
  answers:[AnswerSchema]

});

module.exports = QuestionSchema;
