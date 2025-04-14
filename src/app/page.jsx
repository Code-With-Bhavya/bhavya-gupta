"use client"
import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import MatterSimulation from '@/components/matter';
import Review from '@/components/Review';

export default function Home() {

  const [user, setUser] = useState(null);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      const offset = 50; // 🛠️ Adjust this value based on your navbar height
      const sectionTop = section.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const name = urlParams.get('name');
    const email = urlParams.get('email');
    const picture = urlParams.get('picture');

    if (token && name && email) {
      const userData = { token, name, email, picture };
      // localStorage.setItem('user', JSON.stringify(userData));
      setUser(userData);

      // Scroll to the 'reviews' section after redirect
      scrollToSection('review');

      // Optionally clean URL
      window.history.replaceState(null, '', '/');
    }
  }, []);

  return (
    <>
      <MatterSimulation />
      <div className='relative w-full px-[10vw] z-10 pointer-events-auto md:pointer-events-none'>
        <img src={'/bgcircular.svg'} className=' fixed -top-[40rem] right-0 pointer-events-none' alt='bgcircular' />
        <img src={'/bgcircular.svg'} className='fixed -bottom-[40rem] left-0 rotate-180 pointer-events-none' alt='bgcircular' />
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Review user={user} />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
