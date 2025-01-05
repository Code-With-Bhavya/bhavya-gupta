import Link from 'next/link'

export default function Navbar () {
    return (
        <nav className="w-full bg-red-500 h-[50px] flex justify-between items-center">
            {/* Logo */}
            <h1><span>&lt;</span> CodeWithBhavya <span>/&gt;</span></h1>

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