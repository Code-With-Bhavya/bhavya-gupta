"use client"

import Image from "next/image"

export default function Hero() {
    return (
        <div className=" w-full flex justify-between items-center bg-transparent h-[calc(100vh-50px)]  ">
            <div>
                <div className="text-[2em] font-medium flex gap-1">
                    <div className="text-[#FD6F00] transition-all ease-linear pointer-events-auto">Hello</div> , I'm</div>
                <h1 className=" font-bold mt-[-10px] text-[3.4em] md:text-[4em] hover:scale-105 transition-all ease-linear hover:text-[#FD6F00] pointer-events-auto">Bhavya gupta</h1>
                <p className="opacity-[0.8] mt- w-[60vw] md:w-[400px] hover:scale-105 transition-all ease-linear hover:text-[#FD6F00] pointer-events-auto">Fullstack Web Developer, ui/ux designer and a enthusiast freelancer. For making your online presence reach me today!</p>

                <a href={'https://www.fiverr.com/s/dDW9542'}><button className="hoverbtn py-2 px-6 font-medium bg-[#FD6F00] pointer-events-auto rounded-[2px] mt-8 transition-all ease-in-out delay-50 ">Hire Me</button></a>
            </div>

            <div className="flex flex-col gap-3 items-center justify-center">
                <a className="hover:scale-110 hover:shadow-2xl pointer-events-auto transition-all ease-linear" href={'https://github.com/Code-With-Bhavya'}><Image src="/githublogo.svg" width={35} className="cursor-pointer" height={500} alt="github" /></a>
                <a className="hover:scale-110 hover:shadow-2xl pointer-events-auto transition-all ease-linear" href={'https://x.com/Gupta_Bhavya_'}><Image src="/twitterlogo.svg" width={28} className="cursor-pointer" height={500} alt="twitter" /></a>
                <a className="hover:scale-110 hover:shadow-2xl pointer-events-auto transition-all ease-linear" href={'https://t.me/BhavyaxGupta'}><Image src="/telegramlogo.svg" width={35} className="cursor-pointer" height={500} alt="insta" /></a>
                <a className="hover:scale-110 hover:shadow-2xl pointer-events-auto transition-all ease-linear" href={'https://www.linkedin.com/in/bhavya-gupta-030b59334/'}><Image src="/linkedinlogo.svg" width={28} className="cursor-pointer" height={500} alt="linkedin" /></a>
            </div>
        </div>
    )
}