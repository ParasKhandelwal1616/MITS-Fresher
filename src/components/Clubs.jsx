import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import IEEE from '../assets/IEEE.jpg';
import IETE from '../assets/IETE.jpg';
import GFG_mits from '../assets/GFG.jpg';
import GDG from '../assets/GDG.jpg';

// Full list of clubs with Instagram handles
const clubsData = [
  
  { id: 2, name: "IEEE", logo: IEEE, description: "Programs focused on technology and development.", instagram: "https://www.instagram.com/ieee_sb_mits_du/" },
  { id: 3, name: "IETE", logo: IETE, description: "Fostering creativity through animation and graphics.", instagram: "https://www.instagram.com/iete_mits_gwl/" },
  { id: 4, name: "GFG Mits Chapter", logo: GFG_mits, description: "Enhancing coding interest with amazing opportunities.", instagram: "https://www.instagram.com/geeksforgeeks_mit/" },
  { id: 5, name: "GDG Mits Chapter", logo: GDG, description: "This is student chapter to develop the grate enginners  for the fuather.", instagram: "https://www.instagram.com/gdg.mits/" }, 
  { id: 1, name: "Aerospace Club", logo: "https://via.placeholder.com/100", description: "Exploring aeronautics and astronautics.", instagram: "https://instagram.com/aerospaceclub" },
  { id: 6, name: "Asimov Club", logo: "https://via.placeholder.com/100", description: "Robotics and automation enthusiasts.", instagram: "https://instagram.com/asimovclub" },
  { id: 7, name: "Chemical Engineer’s Group, MITS", logo: "https://via.placeholder.com/100", description: "For chemical engineering enthusiasts.", instagram: "https://instagram.com/chemicalgroup" },
  { id: 8, name: "Concrete Structures Club", logo: "https://via.placeholder.com/100", description: "Concrete design and structure analysis.", instagram: "https://instagram.com/concreteclub" },
  { id: 9, name: "Connect Tech", logo: "https://via.placeholder.com/100", description: "Technology-driven collaboration and innovation.", instagram: "https://instagram.com/connecttech" },
  { id: 10, name: "Creative Architects, MITS", logo: "https://via.placeholder.com/100", description: "Architecture and design innovation.", instagram: "https://instagram.com/creativearchitects" },
  { id: 11, name: "Dance Club", logo: "https://via.placeholder.com/100", description: "For dance lovers and performers.", instagram: "https://instagram.com/danceclub" },
  { id: 12, name: "Digital Learning Group", logo: "https://via.placeholder.com/100", description: "Promoting digital education and tools.", instagram: "https://instagram.com/digitallearning" },
  { id: 13, name: "Disaster Management Awareness Club", logo: "https://via.placeholder.com/100", description: "Preparedness and awareness for disasters.", instagram: "https://instagram.com/disasterclub" },
  { id: 14, name: "Electronics Club", logo: "https://via.placeholder.com/100", description: "Electronics and embedded systems.", instagram: "https://instagram.com/electronicsclub" },
  { id: 15, name: "Energy Club", logo: "https://via.placeholder.com/100", description: "Renewable energy and sustainability.", instagram: "https://instagram.com/energyclub" },
  { id: 16, name: "Finance Club", logo: "https://via.placeholder.com/100", description: "Finance and investment strategies.", instagram: "https://instagram.com/financeclub" },
  { id: 17, name: "Fitness Club", logo: "https://via.placeholder.com/100", description: "Physical health and wellness.", instagram: "https://instagram.com/fitnessclub" },
  { id: 18, name: "Filmmaking Club", logo: "https://via.placeholder.com/100", description: "Filmmaking, directing, and storytelling.", instagram: "https://instagram.com/filmmakingclub" },
  { id: 19, name: "Fun-Tech Club", logo: "https://via.placeholder.com/100", description: "Fun with tech and creativity.", instagram: "https://instagram.com/funtechclub" },
  { id: 20, name: "Google Developer Student Club (GDSC)", logo: "https://via.placeholder.com/100", description: "Developer community for students.", instagram: "https://instagram.com/gdsc" },
  { id: 21, name: "Heritage & Tourism", logo: "https://via.placeholder.com/100", description: "Exploring India's culture and tourism.", instagram: "https://instagram.com/heritageclub" },
  { id: 22, name: "Hindi Samiti", logo: "https://via.placeholder.com/100", description: "Promotion of Hindi language and literature.", instagram: "https://instagram.com/hindisamiti" },
  { id: 23, name: "Holistic Health Club", logo: "https://via.placeholder.com/100", description: "Health and spiritual wellness.", instagram: "https://instagram.com/holistichealth" },
  { id: 24, name: "Human of MITS (HoM)", logo: "https://via.placeholder.com/100", description: "Promoting human values.", instagram: "https://instagram.com/humanofmits" },
  { id: 25, name: "Innovation & DIY Club", logo: "https://via.placeholder.com/100", description: "Innovations and do-it-yourself projects.", instagram: "https://instagram.com/innovationclub" },
  { id: 26, name: "Lafz-e-Bayan", logo: "https://via.placeholder.com/100", description: "Literature, poetry and expression.", instagram: "https://instagram.com/lafzebayan" },
  { id: 27, name: "Project Expo Club", logo: "https://via.placeholder.com/100", description: "Showcasing student projects.", instagram: "https://instagram.com/projectexpo" },
  { id: 28, name: "Mathematics Club", logo: "https://via.placeholder.com/100", description: "Mathematical thinking and problem-solving.", instagram: "https://instagram.com/mathclub" },
  { id: 29, name: "Meditation Club", logo: "https://via.placeholder.com/100", description: "Mindfulness and inner peace.", instagram: "https://instagram.com/meditationclub" },
  { id: 30, name: "MITS Career Development Club", logo: "https://via.placeholder.com/100", description: "Career guidance and training.", instagram: "https://instagram.com/mitscareer" },
  { id: 31, name: "MITS CODE WAR", logo: "https://via.placeholder.com/100", description: "Coding competitions and tech events.", instagram: "https://instagram.com/mitscodewar" },
  { id: 32, name: "MITS Journalism Society", logo: "https://via.placeholder.com/100", description: "Journalism and media activities.", instagram: "https://instagram.com/journalismclub" },
  { id: 33, name: "Multidisciplinary Learning & Research Club", logo: "https://via.placeholder.com/100", description: "Cross-disciplinary academic learning.", instagram: "https://instagram.com/mlrclub" },
  { id: 34, name: "Nature Club", logo: "https://via.placeholder.com/100", description: "Environmental conservation and awareness.", instagram: "https://instagram.com/natureclub" },
  { id: 35, name: "Nutrition Ninja Club", logo: "https://via.placeholder.com/100", description: "Healthy eating and nutrition tips.", instagram: "https://instagram.com/nutritionninja" },
  { id: 36, name: "October Sky (Rocket Club, MITS)", logo: "https://via.placeholder.com/100", description: "Rocket science and space exploration.", instagram: "https://instagram.com/octobersky" },
  { id: 37, name: "Photography & Videography Club", logo: "https://via.placeholder.com/100", description: "Capturing moments through lens.", instagram: "https://instagram.com/photoclub" },
  { id: 38, name: "Querencia (Literary Club)", logo: "https://via.placeholder.com/100", description: "Writing, reading, and literature.", instagram: "https://instagram.com/querencia" },
  { id: 39, name: "Rashtraya Club", logo: "https://via.placeholder.com/100", description: "Patriotism and national development.", instagram: "https://instagram.com/rashtraya" },
  { id: 40, name: "Red Ribbon Club", logo: "https://via.placeholder.com/100", description: "HIV/AIDS awareness and health.", instagram: "https://instagram.com/redribbon" },
  { id: 41, name: "Rotract Club", logo: "https://via.placeholder.com/100", description: "Social service and leadership.", instagram: "https://instagram.com/rotract" },
  { id: 42, name: "Science Club", logo: "https://via.placeholder.com/100", description: "Scientific curiosity and exploration.", instagram: "https://instagram.com/scienceclub" },
  { id: 43, name: "Shakhshiyat, Our Own Fashion", logo: "https://via.placeholder.com/100", description: "Fashion and styling events.", instagram: "https://instagram.com/shakhshiyat" },
  { id: 44, name: "Skyroads (Gaming) Club", logo: "https://via.placeholder.com/100", description: "Gaming and digital entertainment.", instagram: "https://instagram.com/skyroads" },
  { id: 45, name: "Soft Civil Club", logo: "https://via.placeholder.com/100", description: "Software solutions in civil engineering.", instagram: "https://instagram.com/softcivil" },
  { id: 46, name: "Spic Macay Heritage Club", logo: "https://via.placeholder.com/100", description: "Indian classical music and culture.", instagram: "https://instagram.com/spicmacay" },
  { id: 47, name: "Sports Club", logo: "https://via.placeholder.com/100", description: "Sports and physical activities.", instagram: "https://instagram.com/sportsclub" },
  { id: 48, name: "Standards Club", logo: "https://via.placeholder.com/100", description: "Promoting industrial standards.", instagram: "https://instagram.com/standardsclub" },
  { id: 49, name: "StopNot Club", logo: "https://via.placeholder.com/100", description: "Never stopping spirit of growth.", instagram: "https://instagram.com/stopnot" },
  { id: 50, name: "TEDx Club", logo: "https://via.placeholder.com/100", description: "Inspiring talks and ideas worth spreading.", instagram: "https://instagram.com/tedxclub" },
  { id: 51, name: "The AI Club", logo: "https://via.placeholder.com/100", description: "Artificial Intelligence and machine learning.", instagram: "https://instagram.com/aiclub" },
  { id: 52, name: "The Bhagwat Club", logo: "https://via.placeholder.com/100", description: "Learning through the Bhagwat Gita.", instagram: "https://instagram.com/bhagwatclub" },
  { id: 53, name: "The Speakers Club", logo: "https://via.placeholder.com/100", description: "Public speaking and communication.", instagram: "https://instagram.com/speakersclub" }
];

const ClubCard = ({ name, logo, description, instagram, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="w-full max-w-md rounded-2xl bg-gradient-to-r from-blue-900 to-purple-900 p-1 shadow-xl"
    >
      <div className="rounded-2xl bg-gray-900 p-5 min-h-[200px] flex flex-col sm:flex-row gap-5 hover:shadow-blue-400 hover:shadow-lg hover:scale-105 transition-all duration-300">
        <img src={logo} alt={`Logo of ${name}`} className="w-20 h-20 rounded-full object-cover" />
        <div>
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="mt-2 text-gray-400">{description}</p>
          <a
            href={instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Explore
          </a>
        </div>
      </div>
    </motion.div>
  );
};


import axios from 'axios';
import { Link } from 'react-router-dom';

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }

    const fetchClubs = async () => {
      try {
        const { data } = await axios.get('/api/clubs');
        setClubs(data);
      } catch (error) {
        console.error('Error fetching clubs:', error);
      }
    };

    fetchClubs();
  }, []);

  return (
    <section id="clubs" className="mt-20 min-h-screen">
      <div>
        <h2 className="text-4xl font-bold text-center text-white">Clubs & Societies</h2>
        <p className="mt-3 text-gray-400 text-center max-w-3xl mx-auto">
          Discover the various clubs and societies at MITS where you can pursue your interests,
          develop skills, and make new friends with similar passions.
        </p>

        <div className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clubs.map((club) => (
<div key={club._id} className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col h-[450px]">
            <img src={club.image} alt={club.name} className="w-full h-48 object-cover flex-shrink-0" />
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold mb-2 text-white">{club.name}</h3>
              <p className="text-gray-300 mb-4 flex-grow">{club.description}</p>
              <div className="flex space-x-4 mt-auto">
                  <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
                    Explore
                  </button>
                  {isLoggedIn && (
                    <Link to={`/clubs/${club._id}/events`} className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-300">
                      Events
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Clubs;
