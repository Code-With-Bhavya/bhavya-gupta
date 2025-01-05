"use client"
import Link from 'next/link'

export default function Navbar () {
    return (
        <nav className="w-full h-[50px] flex justify-between items-center">
            {/* Logo */}
            <h1 className='font-semibold text-[1.2em] text-[#FD6F00]'><span className='text-white'>&lt;</span> CodeWithBhavya <span className='text-white'>/&gt;</span></h1>

            {/* Links */}
            <div className='flex gap-6'>
                <Link href="#">Skills</Link>
                <Link href="#">Projects</Link>
                <Link href="#">About Us</Link>
                <Link href="#">Services</Link>
                <Link href="#">Contact Us</Link>

                <button>Hire Me</button>
            </div>
        </nav>
    )
}