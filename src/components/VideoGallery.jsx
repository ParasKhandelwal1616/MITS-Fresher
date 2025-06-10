import { useState } from 'react'
import { motion } from 'framer-motion'

// Sample data - replace with your actual videos
const sampleVideos = {
  events: [
    {
      id: 1,
      title: "MITS Annual Fest 2024",
      thumbnail: "/api/placeholder/400/320",
      videoId: "P9bLGxwGwL8", // Extracted from URL
      url: "https://www.youtube.com/watch?v=P9bLGxwGwL8"
    },
    {
      id: 2,
      title: "Freshers Welcome 2024",
      thumbnail: "/api/placeholder/400/320",
      videoId: "zrZWDbN9aRs", // Extracted from URL
      url: "https://www.youtube.com/watch?v=zrZWDbN9aRs&ab_channel=ArmaanPatelVlogs"
    },
    {
      id: 3,
      title: "Technical Symposium",
      thumbnail: "/api/placeholder/400/320",
      videoId: "CAW-qQO5zN8", // Extracted from URL
      url: "https://www.youtube.com/watch?v=CAW-qQO5zN8&ab_channel=SanjeevMishraVlogs"
    },
    {
      id: 4,
      title: "Sports Day Highlights",
      thumbnail: "/api/placeholder/400/320",
      videoId: "Vwdc8JFbgrY", // Extracted from URL
      url: "https://www.youtube.com/watch?v=Vwdc8JFbgrY&ab_channel=NEETESHSHARMA"
    },
    {
      id: 5,
      title: "Orientation Day",
      thumbnail: "/api/placeholder/400/320",
      videoId: "GVzMkCYaxQ4", // Extracted from URL
      url: "https://www.youtube.com/watch?v=GVzMkCYaxQ4&t=4s&ab_channel=viktalks"
    },
    {
      id: 6,
      title: "Guest Lecture Series",
      thumbnail: "/api/placeholder/400/320",
      videoId: "PgIUo4LVCJw", // Extracted from URL
      url: "https://www.youtube.com/watch?v=PgIUo4LVCJw"
    }
  ],
  fun: [
    {
      id: 1,
      title: "Campus Talent Show",
      thumbnail: "/api/placeholder/400/320",
      videoId: "SdQ03GEVisQ", // Extracted from URL
      url: "https://www.youtube.com/watch?v=SdQ03GEVisQ"
    },
    {
      id: 2,
      title: "Dorm Life Vlog",
      thumbnail: "/api/placeholder/400/320",
      videoId: "Sv3e-CwBusc", // Extracted from URL
      url: "https://www.youtube.com/watch?v=Sv3e-CwBusc"
    },
    {
      id: 3,
      title: "Fun with Friends",
      thumbnail: "/api/placeholder/400/320",
      videoId: "YcpTPva9LG4", // Extracted from URL
      url: "https://www.youtube.com/watch?v=YcpTPva9LG4&ab_channel=NEETESHSHARMA"
    },
    {
      id: 4,
      title: "Hostel Day Celebrations",
      thumbnail: "/api/placeholder/400/320",
      videoId: "KGd8n9488Ps", // Extracted from URL
      url: "https://www.youtube.com/watch?v=KGd8n9488Ps"
    },
    {
      id: 5,
      title: "Campus Tour",
      thumbnail: "/api/placeholder/400/320",
      videoId: "yyC2keQqzx4", // Extracted from URL
      url: "https://www.youtube.com/watch?v=yyC2keQqzx4&ab_channel=FrameFlicks"
    },
    {
      id: 6,
      title: "College Festivals",
      thumbnail: "/api/placeholder/400/320",
      videoId: "YjWfF7-phLo", // Extracted from URL
      url: "https://www.youtube.com/watch?v=YjWfF7-phLo"
    }
  ]
};

const VideoCard = ({ title, thumbnail, videoId, index }) => {
  const [showVideo, setShowVideo] = useState(false);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative w-full rounded-2xl bg-gradient-to-r from-purple-900 to-blue-900 p-1 shadow-xl sm:w-[360px]"
    >
      <div className="rounded-2xl bg-gray-900 p-5 min-h-[280px] flex flex-col">
        <div className="relative w-full h-[180px] cursor-pointer" onClick={() => setShowVideo(true)}>
          {!showVideo ? (
            <>
              <img src={thumbnail} alt={title} className="w-full h-full object-cover rounded-lg" />
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
        <p className="mt-2 text-gray-400 text-sm">Watch and enjoy this amazing event at MITS</p>
      </div>
    </motion.div>
  );
};

const VideoGallery = ({ category }) => {
  const videos = sampleVideos[category] || [];
  const title = category === 'events' ? 'Event Videos' : 'Fun Activities';
  
  return (
    <section id="video-gallery" className="mt-20 min-h-screen">
      <div>
        <h2 className="text-4xl font-bold text-center text-white">{title}</h2>
        <p className="mt-3 text-gray-400 text-center max-w-3xl mx-auto">
          Explore {category === 'events' ? 'the exciting events' : 'fun activities and memories'} from MITS campus.
          Click on any video to watch!
        </p>
        
        <div className="mt-16 flex flex-wrap gap-10 justify-center">
          {videos.map((video, index) => (
            <VideoCard 
              key={video.id}
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