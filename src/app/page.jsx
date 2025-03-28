"use client"
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects';
import Image from 'next/image';

export default function Home() {
  
  return (
    <div className='relative w-full px-[10vw]'>
      <Image src={'/bgcircular.svg'} width={400} height={300} className=' fixed -bottom-[24rem] right-0' alt='bgcircular'/>
      <Image src={'/bgcircular.svg'} width={400} height={300} className='fixed -top-[24rem] -left-60' alt='bgcircular'/>
      <Navbar/>
      <Hero/>
      <Skills/>
      <Projects/>
    </div>
  );
}
