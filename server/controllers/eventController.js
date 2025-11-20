const Event = require('../models/Event');
const Club = require('../models/Club');

// @desc    Get all events for a specific club
// @route   GET /api/events/club/:clubId
// @access  Private
exports.getEventsByClub = async (req, res) => {
  try {
    const events = await Event.find({ clubId: req.params.clubId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create an event for a club
// @route   POST /api/events/club/:clubId
// @access  Admin, ClubAdmin
exports.createEvent = async (req, res) => {
  const { title, googleFormLink, promoVideoUrl } = req.body;
  const posterUrl = req.files.poster ? `/uploads/${req.files.poster[0].filename}` : '';
  const mainImageUrl = req.files.mainImage ? `/uploads/${req.files.mainImage[0].filename}` : '';

  try {
    const club = await Club.findById(req.params.clubId);
    if (!club) {
      return res.status(404).json({ message: 'Club not found' });
    }

    if (req.user.role !== 'admin' && (req.user.role !== 'clubAdmin' || !req.user.associatedClub || req.user.associatedClub.toString() !== club._id.toString())) {
      return res.status(403).json({ message: 'User not authorized to create an event for this club' });
    }

    const event = new Event({
      title,
      posterUrl,
      mainImageUrl,
      googleFormLink,
      promoVideoUrl,
      createdBy: req.user._id,
      clubId: req.params.clubId,
    });

    const createdEvent = await event.save();
    club.events.push(createdEvent);
    await club.save();

    res.status(201).json(createdEvent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update an event
// @route   PATCH /api/events/:id
// @access  Admin, ClubAdmin
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const club = await Club.findById(event.clubId);
    if (!club) {
        return res.status(404).json({ message: 'Associated club not found' });
    }

    if (req.user.role !== 'admin' && (req.user.role !== 'clubAdmin' || !req.user.associatedClub || req.user.associatedClub.toString() !== club._id.toString())) {
      return res.status(403).json({ message: 'User not authorized to update this event' });
    }

    const { title, googleFormLink, promoVideoUrl } = req.body;
    event.title = title || event.title;
    event.googleFormLink = googleFormLink || event.googleFormLink;
    event.promoVideoUrl = promoVideoUrl || event.promoVideoUrl;

    if (req.files.poster) {
      event.posterUrl = `/uploads/${req.files.poster[0].filename}`;
    }

    if (req.files.mainImage) {
      event.mainImageUrl = `/uploads/${req.files.mainImage[0].filename}`;
    }

    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Admin, ClubAdmin
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (event) {
      const club = await Club.findById(event.clubId);
      if (!club) {
        return res.status(404).json({ message: 'Associated club not found' });
      }

      if (req.user.role !== 'admin' && (req.user.role !== 'clubAdmin' || !req.user.associatedClub || req.user.associatedClub.toString() !== club._id.toString())) {
        return res.status(403).json({ message: 'User not authorized to delete this event' });
      }

      await event.remove();
      res.json({ message: 'Event removed' });
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};