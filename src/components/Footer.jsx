import { motion } from 'framer-motion';

const Footer = () => {
    return (
      <motion.footer 
        className="mt-20 bg-black bg-opacity-20 backdrop-blur-md py-10"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">MITS Fresher</h3>
              <p className="mt-2 text-gray-400">
                Your gateway to campus life and activities at MITS.
                Designed for first-year students to explore and engage.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li><motion.a whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }} href="#" className="text-gray-400 hover:text-white">Home</motion.a></li>
                <li><motion.a whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }} href="#video-gallery" className="text-gray-400 hover:text-white">Events</motion.a></li>
                <li><motion.a whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }} href="#video-gallery" className="text-gray-400 hover:text-white">Fun Videos</motion.a></li>
                <li><motion.a whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 400 }} href="#clubs" className="text-gray-400 hover:text-white">Clubs & Societies</motion.a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">Contact</h3>
              <p className="mt-2 text-gray-400">
                Email: info@mitsfresher.edu<br />
                Phone: +123-456-7890<br />
                Address: MITS Campus, University Road
              </p>
            </div>
          </div>
          
          <div className="mt-10 border-t border-gray-700 pt-5">
            <p className="text-center text-gray-400">
              © {new Date().getFullYear()} MITS Fresher. All rights reserved.
            </p>
          </div>
        </div>
      </motion.footer>
    );
  };
  
  export default Footer;