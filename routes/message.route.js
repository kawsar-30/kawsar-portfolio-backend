const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth.middleware')

const {
  createMessage,
  getAllMessages,
  getMessageById,
  updateMessage,
  deleteMessage
} = require('../controller/message.controller');

// Public route: send message
router.post('/', createMessage);

// Admin routes: manage messages
router.get('/',protect,admin, getAllMessages);
router.get('/:id',protect,admin, getMessageById);
router.put('/:id',protect,admin, updateMessage);
router.delete('/:id',protect,admin, deleteMessage);

module.exports = router;
