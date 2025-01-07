"use client"
import Link from 'next/link'

export default function Navbar () {
    return (
        <nav className="top-0 w-full h-[50px] flex justify-between items-center mt-1 sticky ">
            {/* Logo */}
            <h1 className='font-semibold text-[1.3em] text-[#FD6F00] hover:scale-105 pointer-events-auto  transition-all ease-linear delay-50'><span className='text-white'>&lt;</span> CodeWithBhavya <span className='text-white'>/&gt;</span></h1>

            {/* Links */}
            <div className='flex gap-6 h-full items-center py-[7px]'>
                <Link className='hover:text-[#FD6F00] pointer-events-auto transition-all hover:scale-105 ease-linear' href="#">Skills</Link>
                <Link className='hover:text-[#FD6F00] pointer-events-auto transition-all hover:scale-105 ease-linear' href="#">Projects</Link>
                <Link className='hover:text-[#FD6F00] pointer-events-auto transition-all hover:scale-105 ease-linear' href="#">About Us</Link>
                <Link className='hover:text-[#FD6F00] pointer-events-auto transition-all hover:scale-105 ease-linear' href="#">Services</Link>
                <Link className='hover:text-[#FD6F00] pointer-events-auto transition-all hover:scale-105 ease-linear' href="#">Contact Us</Link>

                <Link href={'https://www.fiverr.com/s/dDW9542'} className='bg-[#FD6F00] flex pointer-events-auto justify-center items-center font-medium h-full px-[20px] rounded-[2px] hover:text-[#FD6F00] hover:bg-white hover:scale-105 transition-all ease-linear'> Hire Me</Link>
            </div>
        </nav>
    )
}