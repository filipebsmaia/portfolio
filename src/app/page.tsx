import { Hero } from '@/components/sections/Hero/Hero';
import { About } from '@/components/sections/About/About';
import { Skills } from '@/components/sections/Skills/Skills';
import { Experience } from '@/components/sections/Experience/Experience';
import { Projects } from '@/components/sections/Projects/Projects';
import { Contact } from '@/components/sections/Contact/Contact';
import { portfolio } from '@/data/portfolio';

export default function Home() {
  return (
    <>
      <Hero data={portfolio.hero} />
      <About data={portfolio.about} />
      <Skills data={portfolio.skills} />
      <Experience data={portfolio.experience} />
      <Projects data={portfolio.projects} />
      <Contact data={portfolio.contact} />
    </>
  );
}
