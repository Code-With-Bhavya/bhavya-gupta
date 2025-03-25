"use client"
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { useState , useEffect, useRef} from 'react'
import GlowCard from './aeroui/glowcard'
import { useInView } from 'framer-motion'

export default function Skills() {

    const [currenttab, setCurrenttab] = useState(1);
    const ref = useRef(null);
    const  isInView  = useInView(ref, { amount: 0.5 }); // 50% visible


    const frontendcards = [
        { src: "/reactlogo.svg", title: "ReactJS", level: "Intermediate" },
        { src: "/nextjslogo.svg", title: "NextJS", level: "Intermediate" },
        { src: "/csslogo.svg", title: "CSS", level: "Advanced" },
        { src: "/htmllogo.svg", title: "HTML", level: "Advanced" },
        { src: "/figmalogo.svg", title: "Figma", level: "Intermediate" }, // Since you're improving UI/UX design
    ];
    
    const backendcards = [
        { src: "/pythonlogo.svg", title: "Python", level: "Intermediate" }, // You've worked with Python before
        { src: "/nodejslogo.svg", title: "NodeJS", level: "Intermediate" },
        { src: "/socketiologo.svg", title: "Socket.io", level: "Intermediate" }, // Since you've worked with socket.io events
    ];
    
    const librariescards = [
        { src: "/tailwindlogo.svg", title: "TailwindCSS", level: "Advanced" }, // You're using it heavily in projects
        { src: "/githublogo.svg", title: "GitHub", level: "Intermediate" }, // Since you're freelancing
        { src: "/framer.svg", title: "Framer", level: "Intermediate" }, // You’ve been using Framer Motion
    ];

    const tabs = [1, 2, 3];

    useEffect(() => {
        if (!isInView) return; // Run interval only if section is visible
        const interval = setInterval(() => {
            setCurrenttab((prev) => tabs[(tabs.indexOf(prev) + 1) % tabs.length]); // Next tab logic
        }, 5000); 

        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [isInView ,currenttab]);
    

    return (
        <div ref={ref} className="w-full flex flex-col gap-5">
            <h1 className='text-3xl'>Skills</h1>

            {/* TABS */}
            <div className="flex md:gap-3">
                <div
                    className={`pointer-events-auto transition-all ease-linear hoverbtn z-10 px-5 py-1 ${currenttab === 1 ? 'bg-[#FD6F00]' : 'bg-[#0E1016]'} rounded-l-lg rounded-r-none cursor-pointer`}
                    onClick={() => setCurrenttab(1)}
                >Frontend</div>

                <div
                    className={`pointer-events-auto transition-all ease-linear hoverbtn px-5 py-1 ${currenttab === 2 ? 'bg-[#FD6F00]' : 'bg-[#0E1016]'} rounded-none cursor-pointer`}
                    onClick={() => setCurrenttab(2)}
                >Backend</div>

                <div
                    className={`pointer-events-auto transition-all ease-linear hoverbtn px-5 py-1 ${currenttab === 3 ? 'bg-[#FD6F00]' : 'bg-[#0E1016]'} rounded-l-none rounded-r-lg cursor-pointer`}
                    onClick={() => setCurrenttab(3)}
                >Libraries</div>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currenttab} 
                    initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 mt-5'
                >
                    {(currenttab === 1 ? frontendcards : currenttab === 2 ? backendcards : librariescards).map((data, index) => (
                        <GlowCard
                            color='#FD6F00'
                            key={index}
                            className='bg-[#03050c] rounded-xl flex flex-col gap-6 justify-center items-center z-10 p-16 relative pointer-events-auto'
                        >
                            <div className='flex justify-center items-center flex-col gap-2'>
                                <div className='flex justify-center items-center w-20 h-20'>
                                    <Image src={data.src} width={70} height={10} alt={data.title} />
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <h2 className='text-3xl'>{data.title}</h2>
                                    <h4 className="text-[#FD6F00] text-sm font-semibold">{data.level}</h4>
                                </div>
                            </div>
                        </GlowCard>
                    ))}
                </motion.div>
            </AnimatePresence>
        </div>
    );

}