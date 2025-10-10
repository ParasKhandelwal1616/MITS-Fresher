const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Club = require('./models/Club');
const Event = require('./models/Event');
const Video = require('./models/Video');
const bcrypt = require('bcryptjs');

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Club.deleteMany();
    await Event.deleteMany();
    await Video.deleteMany();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('123456', salt);

    const adminUser = await User.create({
      name: 'paras khandelwal',
      email: 'paras@admin.com',
      password: hashedPassword,
      role: 'admin',
    });

    const clubAdminUser = await User.create({
        name: 'Club Admin User',
        email: 'clubadmin@example.com',
        password: hashedPassword,
        role: 'clubAdmin',
      });

    const studentUser = await User.create({
      name: 'Student User',
      email: 'student@example.com',
      password: hashedPassword,
      role: 'student',
    });

    const club1 = await Club.create({
        name: 'Coding Club',
        description: 'A club for coding enthusiasts.',
        image: '/uploads/coding.jpg',
        createdBy: clubAdminUser._id,
      });

      clubAdminUser.associatedClub = club1._id;
      await clubAdminUser.save();


    const club2 = await Club.create({
      name: 'Robotics Club',
      description: 'A club for robotics enthusiasts.',
      image: '/uploads/robotics.jpg',
      createdBy: adminUser._id,
    });

    await Event.create({
        title: 'Hackathon',
        posterUrl: '/uploads/hackathon.png',
        googleFormLink: 'https://forms.gle/12345',
        createdBy: clubAdminUser._id,
        clubId: club1._id,
      });

    await Video.create([
        {
          title: 'React Tutorial',
          url: 'https://www.youtube.com/watch?v=SqcY0GlETPk',
          description: 'A great tutorial for React beginners.',
        },
        {
          title: 'Node.js Tutorial',
          url: 'https://www.youtube.com/watch?v=f2EqECiTBL8',
          description: 'A great tutorial for Node.js beginners.',
        },
      ]);


    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
    try {
      await User.deleteMany();
      await Club.deleteMany();
      await Event.deleteMany();
      await Video.deleteMany();

      console.log('Data Destroyed!');
      process.exit();
    } catch (error) {
      console.error(`${error}`);
      process.exit(1);
    }
  };

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
