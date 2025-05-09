import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import GlowCard from './aeroui/glowcard'


const LeftProject = ({ project }) => {

    return (
        <article className='relative w-full flex justify-center items-center flex-col lg:flex-row h-full overflow-y-hidden'>
            <motion.section
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, ease: 'easeInOut', duration: 0.5 }}
                className="relative w-full lg:w-[35.875rem] lg:h-[19.375rem] flex justify-center flex-col lg:block gap-10 lg:gap-0 overflow-y-hidden md:overflow-y-visible "> {/*Left Section */}

                <header className='lg:absolute lg:top-0 overflow-y-hidden md:overflow-y-visible'> {/* Heading */}
                    <h3 className='font-semibold text-[#FD6F00]'>Featured Project</h3>
                    <h2 className=' text-2xl lg:text-4xl font-semibold text-[#CCD6F6] w-[90vw]'>{project.title}</h2>
                </header>

                <div className='flex flex-col gap-5 lg:gap-0 lg:block overflow-y-hidden md:overflow-y-visible'>
                    {/* Description Box  */}
                    <div className="lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-2  z-10 overflow-y-hidden md:overflow-y-visible " >
                        <GlowCard opacity={0.5} innercolor='#FD6F00' color='#FFFFFF' secondcolor='#FFFFFF' className='relative'>
                            <p className=" p-[13px] lg:p-[21px] text-xs lg:text-base w-full lg:w-[35.875rem]  backdrop-blur-[40px] rounded-[14px] bg-[url('/card1.png')] bg-no-repeat bg-center bg-cover">
                                {project.description}
                            </p>
                        </GlowCard>
                    </div>

                    {/* Tags*/}
                    <ul className="lg:absolute lg:bottom-2 lg:left-10 flex gap-4 z-0 overflow-y-hidden md:overflow-y-visible ">
                        {(project.tags).map((tag, index) => (
                            <motion.li
                                key={index}
                                whileHover={{ scale: 1.1 }}
                                className='text-white font-semibold rounded bg-[#FD6F00] p-1 lg:p-2 text-sm lg:text-base'>{tag}
                            </motion.li>
                        ))}
                    </ul>
                </div>

            </motion.section>


            <motion.section
                initial={{ y: 200, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, ease: 'easeInOut', duration: 0.5 }}
                className="relative w-full lg:w-[50rem] h-[20rem] lg:h-[50rem] lg:block flex flex-col justify-center overflow-y-hidden">  {/* Right Section */}
                {/* Circular Gradients */}
                <div className="absolute top-0 left-0 w-full h-full flex justify-between overflow-y-hidden p-1 md:p-0">
                    <img src="/Gradient.svg" width={5000} height={5000} alt="Gradient" className=" ml-[-6.5rem] lg:ml-[-11.5rem] overflow-y-hidden w-96 md:w-auto" />
                    <img src="/Gradient.svg" width={5000} height={5000} alt="Gradient" className=" ml-[-49rem] lg:ml-[-39.5rem] overflow-y-hidden w-96 md:w-auto" />
                    <img src="/Gradient.svg" width={5000} height={5000} alt="Gradient" className="ml-[-69.5rem] overflow-y-hidden w-96 md:w-auto" />
                </div>

                {/* Image with Background */}
                <figure className="lg:absolute lg:top-1/2 lg:right-0 lg:-translate-y-1/2 overflow-y-hidden">
                    <div className="bg-[#fd6e001d] rounded-lg pt-5 pl-5">
                        <div className=" relative">
                            <Image src={project.imageUrl} width={1000} height={500} alt={project.title} className='rounded-br-xl rounded-tl-xl' />
                            <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-r from-white/10 via-white/30 to-white/0 opacity-0 translate-x-[-20px] backdrop-blur-none transition-all duration-500 ease-out hover:opacity-100 hover:translate-x-0 hover:backdrop-blur-md rounded-xl'>
                                <a href={project.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className='border hover:border-[#FD6F00] hover:text-[#FD6F00] text-white transition-all duration-200 ease-in-out border-white rounded-md p-2 px-4'
                                >
                                    <button className=' flex justify-center items-center gap-1 '>
                                        Visit
                                        {/* arrow right svg */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentcolor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>
                                </a>

                            </div>
                        </div>
                    </div>
                </figure>
            </motion.section>

        </article>
    )
}

export default LeftProject
