import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const Projects = () => {
    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className='w-full flex flex-col gap-5 pointer-events-auto'
        >

            <h1 className='text-3xl'>Projects</h1>

            {/* All Projects */}
            <div className="">



                {/* Project 1- Guess The Drawing */}
                <div className='relative flex justify-center items-center '>
                    <div className="relative w-[574px] h-[310px]"> {/*Left Section */}

                        <div className='absolute top-0'> {/* Heading */}
                            <h3 className='font-semibold text-[#FD6F00]'>Featured Project</h3>
                            <h2 className='text-4xl font-semibold text-[#CCD6F6]'>Guess The Drawing</h2>
                        </div>

                        {/* Description Box  */}
                        <div className="absolute top-1/2 -translate-y-1/2 left-2  z-10 bg-[url('/card1.png')] bg-no-repeat bg-center bg-cover p-[21px] w-[574px] h-[165px] backdrop-blur-[40px] rounded-[14px]">
                            "Guess the Drawing" is a fun game where players sketch while others guess in real time.
                            It features multiplayer mode, custom word lists, and leaderboards.
                            With smooth animations and an interactive canvas, it makes drawing and guessing exciting! 🎨✨
                        </div>

                        {/* Tags*/}
                        <div className="absolute bottom-2 left-10 flex gap-4 z-0">
                            <div className='text-white font-semibold rounded-sm bg-[#FD6F00] p-2'>Next.js</div>
                            <div className='text-white font-semibold rounded-sm bg-[#FD6F00] p-2'>Socket.io</div>
                            <div className='text-white font-semibold rounded-sm bg-[#FD6F00] p-2'>Python</div>
                            <div className='text-white font-semibold rounded-sm bg-[#FD6F00] p-2'>Framer</div>
                        </div>

                    </div>


                    <div className="relative w-[50rem] h-[50rem]">  {/* Right Section */}
                        {/* Circular Gradients */}
                        <div className="absolute top-0 left-0 w-full h-full flex justify-between">
                            <Image src="/Gradient.svg" width={5000} height={5000} alt="Gradient" className="ml-[-11.5rem]" />
                            <Image src="/Gradient.svg" width={5000} height={5000} alt="Gradient" className="ml-[-39.5rem]" />
                            <Image src="/Gradient.svg" width={5000} height={5000} alt="Gradient" className="ml-[-69.5rem]" />
                        </div>

                        {/* Image with Background */}
                        <div className="absolute top-1/2 right-0 -translate-y-1/2">
                            <div className="bg-[#fd6e000e] rounded-lg pt-5 pl-5 relative">
                                <div className="  ">
                                    <Image src="/Guesstd.png" width={1000} height={500} alt="Guess The Drawing" className='rounded-br-xl rounded-tl-xl' />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>






                {/* Project 2- Educollab */}
                <div>
                    {/* EduCollab is a collaborative platform for students and educators to share PDFs, exchange ideas, and work together. It offers real-time collaboration, study groups, and interactive discussions. Future updates will include live sessions, AI study assistants, and task management. */}

                </div>
                {/* Project 3- Portfolio */}
                <div>

                </div>
            </div>





        </motion.div>
    )
}

export default Projects
