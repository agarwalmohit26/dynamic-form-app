const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  text: { type: String, required: true }
});

const QuestionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [OptionSchema],
  type: { type: String, required: true }
});

const FormSchema = new mongoose.Schema({
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Form', FormSchema);
