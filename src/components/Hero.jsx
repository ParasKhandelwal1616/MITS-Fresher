import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Meeting from '../assets/Meeting.svg';

const Hero = () => {
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

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
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
      {[...Array(30)].map((_, i) => (
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
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-6 sm:px-16 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="relative z-10">
              {/* Decorative Elements */}
              <div className="flex items-start gap-5 mb-8">
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-5 h-5 rounded-full bg-gradient-to-r from-violet-500 to-purple-600 shadow-lg shadow-violet-500/50"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "20rem" }}
                    transition={{ duration: 1, delay: 0.4 }}
                    className="w-1 bg-gradient-to-b from-violet-500 via-purple-500 to-transparent"
                  />
                </div>

                <div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white leading-tight mb-4">
                      Welcome to
                    </h1>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="relative inline-block"
                  >
                    <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent mb-6">
                      MITS Fresher
                    </h1>
                    
                    {/* Animated Underline */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 1, delay: 1 }}
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full"
                    />
                  </motion.div>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="text-lg sm:text-xl text-gray-400 max-w-2xl leading-relaxed mb-8"
                  >
                    Your <span className="text-purple-400 font-semibold">one-stop destination</span> to explore all the exciting events, clubs, and fun activities at MITS. Designed specially for{' '}
                    <span className="text-cyan-400 font-semibold">first-year students</span> to help you navigate campus life.
                  </motion.p>


                </div>
              </div>
            </div>

            {/* Right Visual Element */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative hidden lg:block"
            >
{/* 3D Card Stack Effect */}
              <div className="relative w-full h-[600px]">
                {[
                  { bg: "from-purple-600 to-pink-600", delay: 0, rotate: -6, z: 30 },
                  { bg: "from-blue-600 to-cyan-600", delay: 0.1, rotate: -3, z: 20 },
                  { bg: "from-violet-600 to-purple-600", delay: 0.2, rotate: 0, z: 10 },
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50, rotateZ: 0 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0, 
                      rotateZ: card.rotate,
                    }}
                    transition={{ 
                      duration: 0.8, 
                      delay: card.delay,
                    }}
                    whileHover={{ 
                      rotateZ: 0, 
                      scale: 1.05,
                      z: 50,
                    }}
                    style={{ zIndex: card.z }}
                    className={`absolute inset-0 bg-gradient-to-br ${card.bg} rounded-3xl shadow-2xl p-8 border border-white/10 backdrop-blur-sm cursor-pointer`}
                  >
                    <div className="flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                          </div>
                          <div>
                            <div className="text-white/80 text-sm">Campus </div>
                            
                          </div>
                        </div>

                        {/* --- NEW IMAGE PLACEMENT START --- */}
                        <div className="mb-6 rounded-xl overflow-hidden shadow-lg">
                          <img 
                            src={Meeting} // Replace with your actual image path
                            alt={`Card Image ${i + 1}`}
                            className="w-full h-80 object-cover" // Ensures the image fills the space nicely
                          />
                        </div>
                        {/* --- NEW IMAGE PLACEMENT END --- */}

                        <div className="space-y-4">
                          {[...Array(3)].map((_, j) => (
                            <motion.div
                              key={j}
                              initial={{ width: 0 }}
                              animate={{ width: "100%" }}
                              transition={{ delay: 1 + j * 0.1, duration: 0.5 }}
                              className="h-3 bg-white/20 rounded-full overflow-hidden"
                            >
                              <motion.div
                                initial={{ width: "0%" }}
                                animate={{ width: `${60 + j * 15}%` }}
                                transition={{ delay: 1.5 + j * 0.1, duration: 0.8 }}
                                className="h-full bg-white/40 rounded-full"
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>

                     <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 bg-white/20 backdrop-blur-md rounded-xl font-semibold text-white border border-white/30 hover:bg-white/30 transition-all"
                      onClick={() => {
                        window.location.href = "https://web.mitsgwalior.in/";
                      }}
                    >
                      Learn More
                    </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Floating Icons */}
              {[
                { icon: "🎓", x: -20, y: -20, delay: 1.5 },
                { icon: "🎉", x: 120, y: 50, delay: 1.7 },
                { icon: "🎨", x: -40, y: 200, delay: 1.9 },
                { icon: "⚡", x: 100, y: 300, delay: 2.1 },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -10, 0],
                  }}
                  transition={{
                    opacity: { delay: item.delay },
                    scale: { delay: item.delay },
                    y: { duration: 2, repeat: Infinity, delay: item.delay }
                  }}
                  style={{
                    position: 'absolute',
                    left: `${item.x}px`,
                    top: `${item.y}px`,
                  }}
                  className="text-4xl filter drop-shadow-lg"
                >
                  {item.icon}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
      >
        <a href="#video-gallery">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="relative"
          >
            <div className="flex h-16 w-10 items-start justify-center rounded-3xl border-4 border-purple-500/50 p-2 backdrop-blur-sm bg-black/20 shadow-lg shadow-purple-500/20">
              <motion.div
                animate={{ y: [0, 24, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
                className="mb-1 h-3 w-3 rounded-full bg-gradient-to-b from-purple-400 to-cyan-400"
              />
            </div>
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -inset-4 border-2 border-purple-500/30 rounded-full"
            />
          </motion.div>
        </a>
      </motion.div>

      {/* Corner Decorations */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2 }}
        className="absolute top-0 left-0 w-64 h-64 border-l-4 border-t-4 border-purple-500/30 rounded-tl-3xl"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 2.2 }}
        className="absolute bottom-0 right-0 w-64 h-64 border-r-4 border-b-4 border-cyan-500/30 rounded-br-3xl"
      />
    </section>
  );
};

export default Hero;