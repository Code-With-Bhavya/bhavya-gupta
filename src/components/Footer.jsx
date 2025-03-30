import React from 'react'

const Footer = () => {
    const scrollToSection = (id) => {
        const section = document.getElementById(id);
        if (section) {
            const offset = 50; // 🛠️ Adjust this value based on your navbar height
            const sectionTop = section.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: sectionTop, behavior: "smooth" });
        }
    }
    return (
        <footer className='pointer-events-auto lg:h-[50px]'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
                <h1 className='font-semibold text-[1.3em] text-[#fff] hover:scale-105  transition-all ease-linear delay-50'>
                    <span className='text-[#FD6F00]'>&lt;</span> CodeWithBhavya <span className='text-[#FD6F00]'>/&gt;</span>
                </h1>
                <div className='md:flex gap-4 hidden '>
                    <span className='text-[#FD6F00] hover:text-[#fff]' onClick={() => scrollToSection("skills")}>Skills</span>
                    <span className='text-[#FD6F00] hover:text-[#fff]' onClick={() => scrollToSection("projects")}>Projects</span>
                    <span className='text-[#FD6F00] hover:text-[#fff]' onClick={() => scrollToSection("about")}>About Us</span>
                    <span className='text-[#FD6F00] hover:text-[#fff]' onClick={() => scrollToSection("contact")}>Contact Us</span>
                </div>
            </div>
            <div className='flex justify-center items-center gap-4 pb-2 px-8'>
                <p className='text-white'>Made with ❣️by Bhavya Gupta</p>
            </div>
        </footer>
    )
}

export default Footer
