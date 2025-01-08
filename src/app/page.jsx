"use client"
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'

export default function Home() {
  
  return (
    <div className='relative w-full px-[10vw]'>

      <Navbar/>
      <Hero/>
      <Skills/>
    </div>
  );
}
