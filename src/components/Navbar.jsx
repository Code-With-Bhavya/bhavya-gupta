"use client"
import Link from 'next/link'

export default function Navbar () {
    return (
        <nav className="relative w-full h-[50px] flex justify-between items-center ">
            {/* Logo */}
            <h1 className='font-semibold text-[1.3em] text-[#FD6F00]'><span className='text-white'>&lt;</span> CodeWithBhavya <span className='text-white'>/&gt;</span></h1>

            {/* Links */}
            <div className='flex gap-6 h-full items-center py-[7px]'>
                <Link href="#">Skills</Link>
                <Link href="#">Projects</Link>
                <Link href="#">About Us</Link>
                <Link href="#">Services</Link>
                <Link href="#">Contact Us</Link>

                <button className='bg-[#FD6F00] font-medium h-full px-[20px] rounded-[2px]'> Hire Me</button>
            </div>
        </nav>
    )
}