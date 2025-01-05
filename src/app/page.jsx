import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Skills from '@/components/Skills'

export default function Home() {
  return (
    <div className='w-full px-[100px]'>
      <Navbar/>
      <Hero/>
      <Skills/>
    </div>
  );
}
