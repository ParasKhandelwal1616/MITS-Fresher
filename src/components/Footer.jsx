const Footer = () => {
    return (
      <footer className="mt-20 bg-black bg-opacity-20 backdrop-blur-md py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-xl font-bold text-white">MITS Fresher</h3>
              <p className="mt-2 text-gray-400">
                Your gateway to campus life and activities at MITS.
                Designed for first-year students to explore and engage.
              </p>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white">Quick Links</h3>
              <ul className="mt-2 space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
                <li><a href="#video-gallery" className="text-gray-400 hover:text-white">Events</a></li>
                <li><a href="#video-gallery" className="text-gray-400 hover:text-white">Fun Videos</a></li>
                <li><a href="#clubs" className="text-gray-400 hover:text-white">Clubs & Societies</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-xl font-bold text-white">Contact</h3>
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
      </footer>
    );
  };
  
  export default Footer;