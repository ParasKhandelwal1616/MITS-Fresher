const express = require('express');
const router = express.Router();
const {
  getEventsByClub,
  createEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/eventController');
const { protect, authorize } = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

router
  .route('/club/:clubId')
  .get(protect, getEventsByClub)
  .post(protect, authorize('admin', 'clubAdmin'), upload.fields([{ name: 'poster', maxCount: 1 }, { name: 'mainImage', maxCount: 1 }]), createEvent);

router
  .route('/:id')
  .patch(protect, authorize('admin', 'clubAdmin'), upload.fields([{ name: 'poster', maxCount: 1 }, { name: 'mainImage', maxCount: 1 }]), updateEvent)
  .delete(protect, authorize('admin', 'clubAdmin'), deleteEvent);

module.exports = router;