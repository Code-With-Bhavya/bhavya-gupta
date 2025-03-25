"use client"
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects';

export default function Home() {
  
  return (
    <div className='relative w-full px-[10vw]'>

      <Navbar/>
      <Hero/>
      <Skills/>
      <Projects/>
    </div>
  );
}
