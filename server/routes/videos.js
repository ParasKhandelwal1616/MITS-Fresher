const express = require('express');
const router = express.Router();
const { getVideos, createVideo, updateVideo, deleteVideo } = require('../controllers/videoController');
const { protect, authorize } = require('../middleware/authMiddleware');

router.route('/').get(getVideos).post(protect, authorize('admin'), createVideo);
router.route('/:id').patch(protect, authorize('admin'), updateVideo).delete(protect, authorize('admin'), deleteVideo);

module.exports = router;
