const Club = require('../models/Club');
const User = require('../models/User');

// @desc    Get all clubs
// @route   GET /api/clubs
// @access  Public
exports.getClubs = async (req, res) => {
  try {
    const clubs = await Club.find({});
    res.json(clubs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single club
// @route   GET /api/clubs/:id
// @access  Public
exports.getClubById = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (club) {
      res.json(club);
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get clubs that are not yet associated with a club admin
// @route   GET /api/clubs/available
// @access  Public
exports.getAvailableClubs = async (req, res) => {
  try {
    const clubAdmins = await User.find({ 
      role: 'clubAdmin', 
      associatedClub: { $exists: true, $ne: null } 
    });
    const assignedClubIds = clubAdmins.map(admin => admin.associatedClub);
    const availableClubs = await Club.find({ _id: { $nin: assignedClubIds } });
    res.json(availableClubs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a club
// @route   POST /api/clubs
// @access  Admin
exports.createClub = async (req, res) => {
  const { name, description, image, instagram } = req.body;
  try {
    const club = new Club({
      name,
      description,
      image,
      instagram,
      createdBy: req.user._id,
    });
    const createdClub = await club.save();
    res.status(201).json(createdClub);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a club
// @route   PATCH /api/clubs/:id
// @access  Admin, ClubAdmin
exports.updateClub = async (req, res) => {
  const { name, description, image, instagram } = req.body;
  try {
    const club = await Club.findById(req.params.id);
    if (club) {
      if (req.user.role !== 'admin' && (req.user.role !== 'clubAdmin' || !req.user.associatedClub || req.user.associatedClub.toString() !== club._id.toString())) {
        return res.status(403).json({ message: 'User not authorized to update this club' });
      }
      club.name = name || club.name;
      club.description = description || club.description;
      club.image = image || club.image;
      club.instagram = instagram || club.instagram;
      const updatedClub = await club.save();
      res.json(updatedClub);
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a club
// @route   DELETE /api/clubs/:id
// @access  Admin
exports.deleteClub = async (req, res) => {
  try {
    const club = await Club.findById(req.params.id);
    if (club) {
      await Club.findByIdAndDelete(req.params.id);
      res.json({ message: 'Club removed' });
    } else {
      res.status(404).json({ message: 'Club not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
