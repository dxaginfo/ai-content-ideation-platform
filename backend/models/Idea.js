const mongoose = require('mongoose');

const IdeaSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
    trim: true
  },
  type: {
    type: String,
    enum: ['blog', 'video', 'social'],
    required: [true, 'Please specify the content type']
  },
  keywords: {
    type: [String],
    default: []
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  isSaved: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create index for faster queries
IdeaSchema.index({ user: 1, type: 1 });
IdeaSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Idea', IdeaSchema);
