import React from 'react';
import { FaLinkedin, FaFacebook, FaGithub } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white flex flex-wrap justify-between px-12 py-8'>
      <section className='flex-1 p-6' aria-label='About'>
        <h2 className="text-2xl font-bold mb-2">Brijesh Singh</h2>
        <p className="text-gray-200 text-base">Swiggy Clone, made up using React</p>
      </section>

      <nav className='flex-1 p-6' aria-label='Contact Us'>
        <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
        <ul className='list-none flex gap-4'>
          <li><a href='https://www.linkedin.com/in/bsingh6636/' target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 text-2xl"><FaLinkedin /></a></li>
          <li><a href='https://www.facebook.com/bsingh575' target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 text-2xl"><FaFacebook /></a></li>
          <li><a href='https://github.com/bsingh6636?tab=repositories' target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 text-2xl"><FaGithub /></a></li>
        </ul>
      </nav>

      <section className='flex-1 p-6' aria-label='Delivery Locations'>
        <h3 className="text-xl font-semibold mb-3">Delivery Locations</h3>
        <ul className='list-none space-y-1.5'>
          <li className="text-base">Bengaluru</li>
          <li className="text-base">Delhi</li>
          <li className="text-base">Chennai</li>
          <li className="text-base">Mumbai</li>
        </ul>
      </section>

      <div className="w-full text-center mt-6 pt-6 border-t border-white/30 text-gray-200 text-sm">
        &copy; {new Date().getFullYear()} Brijesh Singh. All rights reserved.
      </div>
    </footer>
  );
};
