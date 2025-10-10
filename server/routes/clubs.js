const express = require('express');
const router = express.Router();
const {
  getClubs,
  getClubById,
  getAvailableClubs,
  createClub,
  updateClub,
  deleteClub,
} = require('../controllers/clubController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.get('/available', getAvailableClubs);

router
  .route('/')
  .get(getClubs)
  .post(protect, authorize('admin'), createClub);

router
  .route('/:id')
  .get(getClubById)
  .patch(protect, authorize('admin', 'clubAdmin'), updateClub)
  .delete(protect, authorize('admin'), deleteClub);

module.exports = router;
