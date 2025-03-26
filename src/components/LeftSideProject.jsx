import React from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import GlowCard from './aeroui/glowcard'


const LeftProject = ({  project }) => {

    return (
        <div className='relative flex justify-center items-center '>
            <motion.div
                initial={{ x: -100, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, ease: 'easeInOut', duration: 0.5 }}
                className="relative w-[574px] h-[310px]"> {/*Left Section */}

                <div className='absolute top-0'> {/* Heading */}
                    <h3 className='font-semibold text-[#FD6F00]'>Featured Project</h3>
                    <h2 className='text-4xl font-semibold text-[#CCD6F6]'>{project.title}</h2>
                </div>

                {/* Description Box  */}
                <div className="absolute top-1/2 -translate-y-1/2 left-2  z-10 " >
                    <GlowCard opacity={0.5} innercolor='#FD6F00' color='#fffff' secondcolor='#fffff' className='relative'>
                        <div className="p-[21px] w-[574px]  backdrop-blur-[40px] rounded-[14px] bg-[url('/card1.png')] bg-no-repeat bg-center bg-cover">
                            {project.description}
                        </div>
                    </GlowCard>
                </div>

                {/* Tags*/}
                <div className="absolute bottom-2 left-10 flex gap-4 z-0">
                    {/* Use map */}
                    {(project.tags).map((tag, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.1 }}
                            className='text-white font-semibold rounded-sm bg-[#FD6F00] p-2'>{tag}</motion.div>
                    ))}
                </div>

            </motion.div>


            <motion.div
                initial={{ y: 200, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, ease: 'easeInOut', duration: 0.5 }}
                className="relative w-[50rem] h-[50rem]">  {/* Right Section */}
                {/* Circular Gradients */}
                <div className="absolute top-0 left-0 w-full h-full flex justify-between">
                    <Image src="/Gradient.svg" width={5000} height={5000} alt="Gradient" className="ml-[-11.5rem]" />
                    <Image src="/Gradient.svg" width={5000} height={5000} alt="Gradient" className="ml-[-39.5rem]" />
                    <Image src="/Gradient.svg" width={5000} height={5000} alt="Gradient" className="ml-[-69.5rem]" />
                </div>

                {/* Image with Background */}
                <div className="absolute top-1/2 right-0 -translate-y-1/2">
                    <div className="bg-[#fd6e001d] rounded-lg pt-5 pl-5">
                        <div className=" relative">
                            <Image src={project.imageUrl} width={1000} height={500} alt={project.title} className='rounded-br-xl rounded-tl-xl' />
                            <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-r from-white/10 via-white/30 to-white/0 opacity-0 translate-x-[-20px] backdrop-blur-none transition-all duration-500 ease-out hover:opacity-100 hover:translate-x-0 hover:backdrop-blur-md rounded-xl'>
                                <button className='border hover:border-[#FD6F00] hover:text-[#FD6F00] text-white transition-all duration-200 ease-in-out border-white rounded-md p-2 px-4'>
                                    <Link href={project.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer" className=' flex justify-center items-center gap-1 '>
                                        Visit
                                        {/* arrow right svg */}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentcolor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

        </div>
    )
}

export default LeftProject
