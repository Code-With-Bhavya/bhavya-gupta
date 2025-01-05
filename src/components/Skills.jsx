"use client"
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import reactlogo from '../../public/reactlogo.svg';
import nextjslogo from '../../public/nextjslogo.svg';
import csslogo from '../../public/csslogo.svg';
import htmllogo from '../../public/htmllogo.svg';

export default function Skills() {

    const [currenttab, setCurrenttab] = useState(1)

    const frontendcards = [
        { src: reactlogo, title: 'ReactJS', level: 'Intermediate', textcolor: 'blue' },
        { src: nextjslogo, title: 'NextJS', level: 'Intermediate', textcolor: 'black' },
        { src: csslogo, title: 'CSS', level: 'Intermediate', textcolor: 'blue' },
        { src: htmllogo, title: 'Html', level: 'Intermediate', textcolor: 'orange' }
    ]
    const backendcards = [
        { src: reactlogo, title: 'ReactJS', level: 'Intermediate', textcolor: 'blue' },
        { src: nextjslogo, title: 'NextJS', level: 'Intermediate', textcolor: 'black' },
        { src: csslogo, title: 'CSS', level: 'Intermediate', textcolor: 'blue' },
        { src: htmllogo, title: 'Html', level: 'Intermediate', textcolor: 'orange' }
    ]
    const librariescards = [
        { src: reactlogo, title: 'ReactJS', level: 'Intermediate', textcolor: 'blue' },
        { src: nextjslogo, title: 'NextJS', level: 'Intermediate', textcolor: 'black' },
        { src: csslogo, title: 'CSS', level: 'Intermediate', textcolor: 'blue' },
        { src: htmllogo, title: 'Html', level: 'Intermediate', textcolor: 'orange' }
    ]

    return (
        <div className="w-full  flex flex-col gap-5">
            Skills

            <div className="flex gap-3 "> {/* TABS */}
                <div className={`px-2 py-1 ${currenttab === 1 ? 'bg-[#FD6F00]' : 'bg-[#0E1016]'} rounded-l-2xl rounded-r-none `}
                    onClick={() => { setCurrenttab(1) }}
                >Frontend</div>

                <div className={`px-2 py-1 ${currenttab === 2 ? 'bg-[#FD6F00]' : 'bg-[#0E1016]'} rounded-none`}
                    onClick={() => { setCurrenttab(2) }}
                >Backend</div>

                <div className={`px-2 py-1 ${currenttab === 3 ? 'bg-[#FD6F00]' : 'bg-[#0E1016]'} rounded-l-none rounded-r-2xl `}
                    onClick={() => { setCurrenttab(3) }}
                >Libraries</div>
            </div>

            <div className='flex gap-3'> {/* CARDS */}
                {(currenttab == 0 ? frontendcards : currenttab == 1 ? backendcards : librariescards).map((index, data) => {
                    return (
                        <div key={index} className='bg-[#3D3F46] rounded-xl'>
                            <Image src={data.src} width={100} height={100} alt={data.title} />
                            <h2>{data.title}</h2>
                            <h4>{data.level}</h4>
                        </div>
                    )
                })}
            </div>

        </div>
    )
}