import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const VideoCard = ({ title, url, description, index }) => {
  const [showVideo, setShowVideo] = useState(false);
  const videoId = url.split('v=')[1];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative w-full rounded-2xl bg-gradient-to-r from-purple-900 to-blue-900 p-1 shadow-xl sm:w-[360px] h-[400px]"
    >
      <div className="rounded-2xl bg-gray-900 p-5 min-h-[280px] flex flex-col">
        <div className="relative w-full h-[180px] cursor-pointer" onClick={() => setShowVideo(true)}>
          {!showVideo ? (
            <>
              <img src={`https://img.youtube.com/vi/${videoId}/0.jpg`} alt={title} className="w-full h-full object-cover rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center opacity-80">
                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-white border-b-8 border-b-transparent ml-1"></div>
                </div>
              </div>
            </>
          ) : (
            <iframe 
              width="100%" 
              height="100%" 
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          )}
        </div>
        
        <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
        <p className="mt-2 text-gray-400 text-sm">{description}</p>
      </div>
    </motion.div>
  );
};

const VideoGallery = () => {
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState('events'); // Default category

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
    <section id="video-gallery" className="mt-20 min-h-screen">
      <div>
        <h2 className="text-4xl font-bold text-center text-white">{title}</h2>
        <p className="mt-3 text-gray-400 text-center max-w-3xl mx-auto">
          Explore {category === 'events' ? 'the exciting events' : 'fun activities and memories'} from MITS campus.
          Click on any video to watch!
        </p>
        
        <div className="mt-16 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videos.map((video, index) => (
            <VideoCard 
              key={video._id}
              index={index}
              {...video}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VideoGallery;