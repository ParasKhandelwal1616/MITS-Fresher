const express = require('express');
const router = express.Router();
const { getUsers, approveClubAdmin } = require('../controllers/adminController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/users', protect, authorize('admin'), getUsers);
router.patch('/users/:id/approve', protect, authorize('admin'), approveClubAdmin);

module.exports = router;
