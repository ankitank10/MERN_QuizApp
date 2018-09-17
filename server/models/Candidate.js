const mongoose = require('mongoose');
const {Schema} = mongoose;
const CandidateSchema = new Schema({
    name: {
      type: String
      
    },
    email:{
        type:String
    },
    contact:{
        type: Number,
    },
    score:{
        type: String,
        default:0
    },
    quizId:{
        type:String
    }
})
module.exports = CandidateSchema;
