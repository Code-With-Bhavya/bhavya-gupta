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
    ];

    const cards = currenttab === 1 ? frontendcards : currenttab === 2 ? backendcards : librariescards;

    return (
        <div className="w-full  flex flex-col gap-5">
            <h1 className='text-3xl'>Skills</h1>

            <div className="flex gap-3 "> {/* TABS */}
                <div className={`z-10 px-2 py-1 ${currenttab === 1 ? 'bg-[#FD6F00]' : 'bg-[#0E1016]'} rounded-l-2xl rounded-r-none cursor-pointer`}
                    onClick={() => { setCurrenttab(1) }}
                >Frontend</div>

                <div className={`px-2 py-1 ${currenttab === 2 ? 'bg-[#FD6F00]' : 'bg-[#0E1016]'} rounded-none cursor-pointer`}
                    onClick={() => { setCurrenttab(2) }}
                >Backend</div>

                <div className={`px-2 py-1 ${currenttab === 3 ? 'bg-[#FD6F00]' : 'bg-[#0E1016]'} rounded-l-none rounded-r-2xl cursor-pointer`}
                    onClick={() => { setCurrenttab(3) }}
                >Libraries</div>
            </div>

            <div className='flex justify-start gap-10 mb-10'> {/* CARDS */}
                {cards.map((data, index) => {
                    return (
                        <div key={index} className='cardlinearbg rounded-xl flex flex-col justify-center items-center p-10 relative overflow-hidden border-[#3D3F46] border-2'>
                            <div className=' absolute top-0 left-0 w-full h-[9px] bg-[#3D3F46]'></div>
                                <Image src={data.src} width={50} height={10} alt={data.title} />
                                <h2>{data.title}</h2>
                                <h4 className={`${data.textcolor}`}>{data.level}</h4>
                            
                        </div>
                    )
                })}
            </div>
        </div>
    )
}