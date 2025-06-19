const express = require('express');
const {
  generateIdeas,
  saveIdea,
  getIdeas,
  getIdea,
  updateIdea,
  deleteIdea
} = require('../controllers/ideaController');

const { protect } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.post('/generate', generateIdeas);

// Protected routes
router.route('/')
  .post(protect, saveIdea)
  .get(protect, getIdeas);

router.route('/:id')
  .get(protect, getIdea)
  .put(protect, updateIdea)
  .delete(protect, deleteIdea);

module.exports = router;
