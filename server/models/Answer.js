const mongoose = require('mongoose');
const {Schema} = mongoose;
const AnswerSchema = new Schema({
    ansId: {
      type: String
    },
    isCorrect:{
        type:Boolean,
        default:false
    },
    ansText:{
        type: String,

    }
})
module.exports = AnswerSchema;
