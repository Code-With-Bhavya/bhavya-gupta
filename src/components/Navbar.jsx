"use client"
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Prevent scrolling when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isSidebarOpen]);

  // Close sidebar when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <>
      <nav className="top-0 w-full h-[50px] flex justify-between items-center mt-1 sticky bg-transparent z-20">
        {/* Logo */}
        <h1 className='font-semibold text-[1.3em] text-[#FD6F00] hover:scale-105 pointer-events-auto transition-all ease-linear delay-50'>
          <span className='text-white'>&lt;</span> CodeWithBhavya <span className='text-white'>/&gt;</span>
        </h1>

        {/* Links */}
        <div className='hidden md:flex gap-6 h-full items-center py-[7px]'>
          <Link className='hover:text-[#FD6F00] pointer-events-auto transition-all hover:scale-105 ease-linear' href="#">Skills</Link>
          <Link className='hover:text-[#FD6F00] pointer-events-auto transition-all hover:scale-105 ease-linear' href="#">Projects</Link>
          <Link className='hover:text-[#FD6F00] pointer-events-auto transition-all hover:scale-105 ease-linear' href="#">About Us</Link>
          <Link className='hover:text-[#FD6F00] pointer-events-auto transition-all hover:scale-105 ease-linear' href="#">Services</Link>
          <Link className='hover:text-[#FD6F00] pointer-events-auto transition-all hover:scale-105 ease-linear' href="#">Contact Us</Link>
          <Link href={'https://www.fiverr.com/s/dDW9542'} className='bg-[#FD6F00] flex pointer-events-auto justify-center items-center font-medium h-full px-[20px] rounded-[2px] hover:text-[#FD6F00] hover:bg-white hover:scale-105 transition-all ease-linear'> Hire Me</Link>
        </div>

        {/* Hamburger Icon */}
        <div className='md:hidden flex items-center pointer-events-auto'>
          <button onClick={toggleSidebar} className='text-[#FD6F00] focus:outline-none'>
            {isSidebarOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <div ref={sidebarRef} className={`fixed top-0 right-0 w-[250px] h-full bg-[#121212] z-30 transform ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
        <div className='flex flex-col gap-6 p-6'>
          <button onClick={toggleSidebar} className='self-end text-[#FD6F00] focus:outline-none'>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
          <Link className='hover:text-[#FD6F00] pointer-events-auto transition-all hover:scale-105 ease-linear' href="#" onClick={toggleSidebar}>Skills</Link>
          <Link className='hover:text-[#FD6F00] pointer-events-auto transition-all hover:scale-105 ease-linear' href="#" onClick={toggleSidebar}>Projects</Link>
          <Link className='hover:text-[#FD6F00] pointer-events-auto transition-all hover:scale-105 ease-linear' href="#" onClick={toggleSidebar}>About Us</Link>
          <Link className='hover:text-[#FD6F00] pointer-events-auto transition-all hover:scale-105 ease-linear' href="#" onClick={toggleSidebar}>Services</Link>
          <Link className='hover:text-[#FD6F00] pointer-events-auto transition-all hover:scale-105 ease-linear' href="#" onClick={toggleSidebar}>Contact Us</Link>
          <Link href={'https://www.fiverr.com/s/dDW9542'} className='bg-[#FD6F00] flex pointer-events-auto justify-center items-center font-medium h-full px-[20px] rounded-[2px] hover:text-[#FD6F00] hover:bg-white hover:scale-105 transition-all ease-linear' onClick={toggleSidebar}> Hire Me</Link>
        </div>
      </div>

      {/* Background Blur */}
      <div className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-20 transition-opacity duration-300 ${isSidebarOpen ? 'opacity-100 blur-background' : 'opacity-0 pointer-events-none'}`}></div>
    </>
  );
}