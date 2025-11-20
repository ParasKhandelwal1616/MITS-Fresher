import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import IEEE from '../assets/IEEE.jpg';
import IETE from '../assets/IETE.jpg';
import GFG_mits from '../assets/GFG.jpg';
import GDG from '../assets/GDG.jpg';
import { Link } from 'react-router-dom';
import axios from 'axios';

// Full list of clubs with Instagram handles
const clubsData = [
  { id: 2, name: "IEEE", logo: IEEE, description: "Programs focused on technology and development.", instagram: "https://www.instagram.com/ieee_sb_mits_du/" },
  { id: 3, name: "IETE", logo: IETE, description: "Fostering creativity through animation and graphics.", instagram: "https://www.instagram.com/iete_mits_gwl/" },
  { id: 4, name: "GFG Mits Chapter", logo: GFG_mits, description: "Enhancing coding interest with amazing opportunities.", instagram: "https://www.instagram.com/geeksforgeeks_mit/" },
  { id: 5, name: "GDG Mits Chapter", logo: GDG, description: "This is student chapter to develop the grate enginners  for the fuather.", instagram: "https://www.instagram.com/gdg.mits/" }, 
  { id: 1, name: "Aerospace Club", logo: "https://via.placeholder.com/100", description: "Exploring aeronautics and astronautics.", instagram: "https://instagram.com/aerospaceclub" },
  { id: 6, name: "Asimov Club", logo: "https://via.placeholder.com/100", description: "Robotics and automation enthusiasts.", instagram: "https://instagram.com/asimovclub" },
  { id: 7, name: "Chemical Engineer's Group, MITS", logo: "https://via.placeholder.com/100", description: "For chemical engineering enthusiasts.", instagram: "https://instagram.com/chemicalgroup" },
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

const Clubs = () => {
  const [clubs, setClubs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

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
    <section id="clubs" className="relative min-h-screen w-full overflow-hidden bg-black py-20">
      {/* Animated Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(139, 92, 246, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(139, 92, 246, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }} />
      </div>

      {/* Gradient Orbs with Mouse Parallax */}
      <motion.div
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
        }}
        transition={{ 
          x: { type: "spring", stiffness: 20, damping: 30 },
          y: { type: "spring", stiffness: 20, damping: 30 },
          scale: { duration: 8, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 20, repeat: Infinity, ease: "linear" }
        }}
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur-3xl opacity-30"
      />
      
      <motion.div
        animate={{
          x: -mousePosition.x,
          y: -mousePosition.y,
          scale: [1, 1.3, 1],
          rotate: [0, -90, 0],
        }}
        transition={{ 
          x: { type: "spring", stiffness: 20, damping: 30 },
          y: { type: "spring", stiffness: 20, damping: 30 },
          scale: { duration: 10, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 25, repeat: Infinity, ease: "linear" }
        }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full blur-3xl opacity-30"
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 1, 0.2],
            scale: [1, 1.5, 1],
          }}
          
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 sm:px-16">
        {/* Title Section */}
        <div className="flex items-start gap-5 mb-12">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg shadow-violet-500/50"
            />
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "8rem" }}
              transition={{ duration: 1, delay: 0.4 }}
              className="w-1 bg-gradient-to-b from-violet-500 via-purple-500 to-transparent"
            />
          </div>

          <div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-4"
            >
              Clubs & Societies
            </motion.h2>
            
            {/* Animated Underline */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 1, delay: 0.8 }}
              className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full mb-6"
            />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg text-gray-400 max-w-3xl"
            >
              Discover the various clubs and societies at MITS where you can pursue your interests,
              develop skills, and make new friends with similar passions.
            </motion.p>
          </div>
        </div>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clubs.map((club, index) => (
            <motion.div
              key={club._id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -10 }}
              className="relative rounded-3xl overflow-hidden group h-[450px] flex flex-col"
            >
              {/* Gradient Border */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" style={{ padding: '2px' }}>
                <div className="absolute inset-[2px] bg-gray-900 rounded-3xl" />
              </div>

              {/* Card Content */}
              <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-white/10 backdrop-blur-sm overflow-hidden h-full flex flex-col">
                {/* Club Image */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                  <motion.img 
                    src={club.image} 
                    alt={club.name} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                  
                  {/* Floating Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 + 0.3 }}
                    className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </motion.div>
                </div>

                {/* Club Info */}
                <div className="p-6 flex flex-col flex-grow">
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.4 }}
                    className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300"
                  >
                    {club.name}
                  </motion.h3>
                  
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 + 0.5 }}
                    className="text-gray-400 mb-4 flex-grow line-clamp-3"
                  >
                    {club.description}
                  </motion.p>

                  {/* Action Buttons */}
                  <div className="flex gap-3 mt-auto">
                    <motion.a
                      href={club.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2.5 rounded-xl font-semibold text-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-500/20"
                    >
                      Explore
                    </motion.a>
                    
                    {isLoggedIn && (
                      <Link to={`/clubs/${club._id}/events`}>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg shadow-purple-500/20 flex items-center justify-center"
                        >
                          Events
                        </motion.div>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Shimmer Effect */}
                <motion.div
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                />

                {/* Glow Effect */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent rounded-3xl pointer-events-none"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Corner Decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="absolute top-0 left-0 w-64 h-64 border-l-4 border-t-4 border-purple-500/30 rounded-tl-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-0 right-0 w-64 h-64 border-r-4 border-b-4 border-cyan-500/30 rounded-br-3xl"
      />
    </section>
  );
};

export default Clubs;