const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = async (req, res) => {
  const { name, email, password, role, associatedClub } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user && user.isVerified) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if (role === 'clubAdmin') {
      if (!associatedClub) {
        return res.status(400).json({ message: 'Please select a club.' });
      }
      const clubIsTaken = await User.findOne({ associatedClub: associatedClub, isVerified: true });
      if (clubIsTaken) {
        return res.status(400).json({ message: 'This club already has an admin.' });
      }
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    if (user && !user.isVerified) {
      user.name = name;
      user.password = hashedPassword;
      user.role = role;
      user.associatedClub = role === 'clubAdmin' ? associatedClub : undefined;
      user.otp = crypto.createHash('sha256').update(otp).digest('hex');
      user.otpExpires = otpExpires;
      await user.save();
    } else {
      user = await User.create({
        name,
        email,
        password: hashedPassword,
        role,
        ...(role === 'clubAdmin' && associatedClub && { associatedClub }),
        otp: crypto.createHash('sha256').update(otp).digest('hex'),
        otpExpires,
      });
    }

    try {
      await sendEmail({
        email,
        subject: 'OTP for Study Notation',
        message: `Your OTP for Study Notation is ${otp}`,
      });
      res.status(201).json({
        success: true,
        message: 'OTP sent to your email.',
      });
    } catch (error) {
      console.error(error);
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();
      return res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Verify OTP
// @route   POST /api/auth/verify-otp
// @access  Public
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const hashedOtp = crypto.createHash('sha256').update(otp).digest('hex');
    const user = await User.findOne({
      email,
      otp: hashedOtp,
      otpExpires: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid OTP or OTP has expired' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Resend OTP
// @route   POST /api/auth/resend-otp
// @access  Public
exports.resendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }
    if (user.isVerified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    const otp = otpGenerator.generate(4, {
      upperCaseAlphabets: false,
      specialChars: false,
    });
    const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

    user.otp = crypto.createHash('sha256').update(otp).digest('hex');
    user.otpExpires = otpExpires;
    await user.save();

    try {
      await sendEmail({
        email,
        subject: 'New OTP for Study Notation',
        message: `Your new OTP for Study Notation is ${otp}`,
      });
      res.status(200).json({
        success: true,
        message: 'New OTP sent to your email.',
      });
    } catch (error) {
      console.error(error);
      user.otp = undefined;
      user.otpExpires = undefined;
      await user.save();
      return res.status(500).json({ message: 'Email could not be sent' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (!user.isVerified) {
      return res.status(401).json({ message: 'Please verify your email to login.' });
    }

    if (await bcrypt.compare(password, user.password)) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    // req.user is set by the protect middleware
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};