"use client"
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import MatterSimulation from '@/components/matter';

export default function Home() {
  return (
    <>
      <MatterSimulation />
      <div className='relative w-full px-[10vw] z-10 pointer-events-auto md:pointer-events-none'>
        <img src={'/bgcircular.svg'} className=' fixed -top-[20rem] right-0 pointer-events-none' alt='bgcircular' />
        <img src={'/bgcircular.svg'} className='fixed -bottom-[20rem] left-0 rotate-180 pointer-events-none' alt='bgcircular' />
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
