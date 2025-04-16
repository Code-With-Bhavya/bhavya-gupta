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
        <footer className="w-full bg-black px-6 py-5 pointer-events-auto ">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">

                {/* Brand Name */}
                <h1 className="text-2xl font-semibold text-white tracking-tight hover:scale-105 transition-transform duration-300">
                    <span className="text-[#FD6F00]">&lt;</span> CodeWithBhavya <span className="text-[#FD6F00]">/&gt;</span>
                </h1>

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center md:justify-end gap-6 text-sm font-medium">
                    {[
                        { id: "skills", label: "Skills" },
                        { id: "projects", label: "Projects" },
                        { id: "about", label: "About Me" },
                        { id: "contact", label: "Contact" }
                    ].map(({ id, label }) => (
                        <span
                            key={id}
                            className="text-[#FD6F00] hover:text-white cursor-pointer relative group transition-colors duration-200"
                            onClick={() => scrollToSection(id)}
                        >
                            {label}
                            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full"></span>
                        </span>
                    ))}
                </div>
            </div>

            {/* Footer Bottom */}
            <div className="mt-6 text-center text-sm text-white opacity-70">
                Made with <span className="text-pink-500">❣️</span> by <span className="font-medium text-white">Bhavya Gupta</span>
            </div>
        </footer>


    )
}

export default Footer
