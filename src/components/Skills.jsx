"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

export default function Skills() {

    const [currenttab, setCurrenttab] = useState(1)

    const frontendcards = [
        { src: "/reactlogo.svg", title: "ReactJS", level: "Intermediate", textcolor: "text-blue-500" },
        { src: "/nextjslogo.svg", title: "NextJS", level: "Intermediate", textcolor: "text-white" },
        { src: "/csslogo.svg", title: "CSS", level: "Intermediate", textcolor: "text-blue-500" },
        { src: "/htmllogo.svg", title: "Html", level: "Intermediate", textcolor: "text-orange-500" },
    ];
    const backendcards = [
        { src: "/pythonlogo.svg", title: "Python", level: "Intermediate", textcolor: "text-yellow-500" },
        { src: "/nodejslogo.svg", title: "NodeJS", level: "Intermediate", textcolor: "text-green-500" },
    ];
    const librariescards = [
        { src: "/tailwindlogo.svg", title: "TailwindCSS", level: "Intermediate", textcolor: "text-blue-500" },
        { src: "/socketiologo.svg", title: "Socket.io", level: "Intermediate", textcolor: "text-white" },
        { src: "/githublogo.svg", title: "Github", level: "Intermediate", textcolor: "text-gray-200" },
        { src: "/figmalogo.svg", title: "Figma", level: "Intermediate", textcolor: "text-pink-200" },
    ];

    const cards = currenttab === 1 ? frontendcards : currenttab === 2 ? backendcards : librariescards;

    return (
        <div className="w-full flex flex-col gap-5">
            <h1 className='text-3xl'>Skills</h1>

            <div className="flex md:gap-3 "> {/* TABS */}
                <div className={`hover:scale-105 pointer-events-auto transition-all ease-linear hover:bg-[#fff] hover:text-[#FD6F00] hover z-10 px-5 py-1 ${currenttab === 1 ? 'bg-[#FD6F00]' : 'bg-[#0E1016]'} rounded-l-lg rounded-r-none cursor-pointer`}
                    onClick={() => { setCurrenttab(1) }}
                >Frontend</div>

                <div className={`hover:scale-105 pointer-events-auto transition-all ease-linear hover:bg-[#fff] hover:text-[#FD6F00] hover px-5 py-1 ${currenttab === 2 ? 'bg-[#FD6F00]' : 'bg-[#0E1016]'} rounded-none cursor-pointer`}
                    onClick={() => { setCurrenttab(2) }}
                >Backend</div>

                <div className={`hover:scale-105 pointer-events-auto transition-all ease-linear hover:bg-[#fff] hover:text-[#FD6F00] hover px-5 py-1 ${currenttab === 3 ? 'bg-[#FD6F00]' : 'bg-[#0E1016]'} rounded-l-none rounded-r-lg cursor-pointer`}
                    onClick={() => { setCurrenttab(3) }}
                >Libraries</div>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10 mt-5'> {/* CARDS */}
                {cards.map((data, index) => {
                    return (
                        <div key={index} className='cardlinearbg rounded-xl flex flex-col gap-6 justify-centre items-centre px-16 pt-16 pb-5 relative overflow-hidden border-[#3D3F46] border-2'>
                            <div className='absolute top-0 left-0 w-full h-[9px] bg-[#3D3F46]'></div>
                            <div className='w-[20vw] relative flex justify-center items-center'>
                                <Image src={data.src} width={93} height={20} objectFit='contain'  alt={data.title} />
                            </div>
                            <div className="flex flex-col justify-center items-center">
                                <h2 className='text-3xl'>{data.title}</h2>
                                <h4 className={`${data.textcolor} text-sm`}>{data.level}</h4>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}