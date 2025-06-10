import { useState } from 'react'
import bell from '../assets/bell (1).png'
import { motion } from 'framer-motion'

const Navbar = ({ setActiveSection }) => {
  const [active, setActive] = useState('');
  const [toggle, setToggle] = useState(false);

  const navLinks = [
    { id: 'events', title: 'Event Videos' },
    { id: 'fun', title: 'Fun Videos' },
    { id: 'clubs', title: 'Clubs & Societies' },
    
  ];

  return (
    <nav className="fixed top-0 z-20 flex w-full items-center bg-black bg-opacity-30 px-6 py-5 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-10 w-10 bg-blue-500 rounded-full"></div>
          <p className="flex cursor-pointer text-xl font-bold text-white">
            MITS Fresher &nbsp;
            <span className="hidden sm:block">| Explore The College</span>
          </p>
        </div>

        <ul className="hidden flex-row gap-10 sm:flex">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`cursor-pointer text-lg font-medium ${
                active === link.id ? "text-white" : "text-gray-400"
              } hover:text-white`}
              onClick={() => {
                setActive(link.id);
                setActiveSection(link.id);
              }}
            >
              {link.title}
            </li>
          ))}

          <li className='cursor-pointer pl-3'>
            <img src={bell} alt="" />
          </li>
        </ul>

        <div className="flex flex-1 items-center justify-end sm:hidden">
          <button
            className="h-7 w-7 object-contain text-white"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? "✕" : "☰"}
          </button>

          <div className={`${!toggle ? "hidden" : "flex"} absolute right-0 top-20 z-10 mx-4 my-2 min-w-[140px] rounded-xl bg-gray-900 p-6`}>
            <ul className="flex flex-col items-start justify-end gap-4">
              {navLinks.map((link) => (
                <li
                  key={link.id}
                  className={`cursor-pointer text-lg font-medium ${
                    active === link.id ? "text-white" : "text-gray-400"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(link.id);
                    setActiveSection(link.id);
                  }}
                >
                  {link.title}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;