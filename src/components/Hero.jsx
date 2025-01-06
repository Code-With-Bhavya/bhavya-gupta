"use client"

import Image from "next/image"
import Link from "next/link"

export default function Hero() {
    return (
        <div className=" w-full flex justify-between items-center">
            <div className=" my-52">
                <p className="text-[2em] font-medium"> <span className="text-[#FD6F00]">Hello</span> , I'm</p>
                <h1 className=" font-bold mt-[-10px] text-[4em]">Bhavya gupta</h1>
                <p className="opacity-[0.8] mt- w-[400px]">Fullstack Web Developer, ui/ux designer and a enthusiast freelancer. For making your online presence reach me today!</p>

                <button className="py-2 px-6 font-medium bg-[#FD6F00] rounded-[2px] mt-8">Hire Me</button>
            </div>

            <div className="flex flex-col gap-3">
                <Link href={'#'}><Image src="/facebooklogo.svg" width={28} className="cursor-pointer" height={500} alt="hero" /></Link>
                <Link href={'#'}><Image src="/twitterlogo.svg" width={28} className="cursor-pointer" height={500} alt="twitter" /></Link>
                <Link href={'#'}><Image src="/instalogo.svg" width={28} className="cursor-pointer" height={500} alt="insta" /></Link>
                <Link href={'#'}><Image src="/linkedinlogo.svg" width={28} className="cursor-pointer" height={500} alt="linkedin" /></Link>
            </div>
        </div>
    )
}