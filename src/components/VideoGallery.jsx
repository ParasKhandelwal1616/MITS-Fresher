import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const VideoCard = ({ title, url, description, index }) => {
  const [showVideo, setShowVideo] = useState(false);
  const videoId = url ? url.split('v=')[1] : null;

  if (!videoId) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="group relative w-full h-[350px] rounded-3xl overflow-hidden"
    >
      {/* Gradient Border */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" style={{ padding: '2px' }}>
        <div className="absolute inset-[2px] bg-gray-900 rounded-3xl" />
      </div>

      {/* Card Content */}
      <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-white/10 backdrop-blur-sm p-4 h-full flex flex-col justify-between shadow-2xl">
        {/* Video Section */}
        <div className="relative w-full h-48 cursor-pointer rounded-2xl overflow-hidden" onClick={() => setShowVideo(true)}>
          {!showVideo ? (
            <>
              <motion.img
                src={`https://img.youtube.com/vi/${videoId}/0.jpg`}
                alt={title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
              
              {/* Play Button */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 1 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="relative w-20 h-20 bg-gradient-to-br from-red-600 to-red-700 rounded-full flex items-center justify-center cursor-pointer shadow-2xl shadow-red-500/50"
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {/* Pulse Effect */}
                  <motion.div
                    className="absolute inset-0 bg-red-500 rounded-full"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <svg className="relative w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </motion.div>
              </motion.div>

              {/* Duration Badge */}
              <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                <span className="text-white text-xs font-semibold flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                  </svg>
                  Video
                </span>
              </div>
            </>
          ) : (
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-2xl"
            ></iframe>
          )}
        </div>

        {/* Video Info */}
        <div className="mt-4 flex-grow">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300"
          >
            {title}
          </motion.h3>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.4 }}
            className="text-gray-400 text-sm line-clamp-3"
          >
            {description}
          </motion.p>
        </div>

        {/* Shimmer Effect */}
        <motion.div
          initial={{ x: "-100%" }}
          whileHover={{ x: "100%" }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none"
        />

        {/* Glow Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-t from-purple-600/10 to-transparent rounded-3xl pointer-events-none"
        />
      </div>
    </motion.div>
  );
};

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState('events');
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
    const fetchVideos = async () => {
      try {
        const { data } = await axios.get('/api/videos');
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  const title = category === 'events' ? 'Event Videos' : 'Fun Activities';

  return (
    <section id="video-gallery" className="relative min-h-screen w-full overflow-hidden bg-black py-20">
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
              {title}
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
              Explore {category === 'events' ? 'the exciting events' : 'fun activities and memories'} from MITS campus.
              Click on any video to watch!
            </motion.p>
          </div>
        </div>

        {/* Videos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <VideoCard 
              key={video._id}
              index={index}
              {...video}
            />
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

export default VideoGallery;