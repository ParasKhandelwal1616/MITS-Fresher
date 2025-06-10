import { motion } from 'framer-motion'
import React from 'react';
import Collaborate from '../assets/Collaborate.svg';
import Meeting from '../assets/Meeting.svg';
const Hero = () => {
  return (
    <section className="relative h-screen w-full">
      <div className="absolute inset-0 top-[120px] mx-auto max-w-7xl flex flex-row items-start gap-5 px-6 sm:px-16">
        <div className="flex flex-col items-center justify-center mt-5">
          <div className="w-5 h-5 rounded-full bg-violet-500" />
          <div className="w-1 h-40 sm:h-80 bg-gradient-to-b from-violet-500 to-transparent" />
        </div>

        <div>
          <h1 className='text-6xl font-bold text-white'>
            Welcome to <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-purple-500 to-cyan-500 bg-clip-text text-transparent">MITS Fresher</span>
          </h1>
          <p className="mt-4 text-lg text-gray-400 max-w-3xl">
            Your one-stop destination to explore all the exciting events, clubs, and fun activities at MITS.
            Designed specially for first-year students to help you navigate campus life.
          </p>
        </div>
      </div>

            {/* Right side SVG Image */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-6">
        <img
          src={Collaborate}
          alt="Collaborate"
          className="h-auto max-w-[600px] object-contain"
        />
      </div>
      <div className="absolute left-0 top-1/2 -translate-y-1/2 pl-6 z-30">
        <img
          src={Meeting}
          alt="Meeting"
          className="h-auto max-w-[600px] object-contain z-30"
        />
      </div>


      {/* Scroll Indicator */}
      <div className="absolute bottom-10 flex w-full items-center justify-center">
        <a href="#video-gallery">
          <div className="flex h-16 w-10 items-start justify-center rounded-3xl border-4 border-gray-400 p-2">
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="mb-1 h-3 w-3 rounded-full bg-gray-400"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
