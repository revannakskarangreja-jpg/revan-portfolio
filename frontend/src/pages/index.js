import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Certificates from '../components/Certificates';
import Contact from '../components/Contact';
import { supabase } from '../services/supabaseClient';

export default function Home({}) {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from('profiles').select('*').limit(1);
      if (data && data[0]) setProfile(data[0]);
    }
    load();
  }, []);

  return (
    <div>
      <Navbar />
      <main>
        <Hero profile={profile} />
        <section id="about" className="py-20 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">About</h2>
          <p className="text-muted">Saya adalah pelajar yang tertarik pada web development, desain digital, dan teknologi. Saya suka membuat sesuatu dari ide sederhana menjadi project yang bisa digunakan.</p>
        </section>

        <section id="skills" className="py-12 px-6 bg-gradient-to-b from-transparent to-white/2">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Skills</h2>
            <Skills />
          </div>
        </section>

        <section id="projects" className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Projects</h2>
            <Projects />
          </div>
        </section>

        <section id="certificates" className="py-12 px-6 bg-gradient-to-b from-transparent to-white/2">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Certificates & Achievements</h2>
            <Certificates />
          </div>
        </section>

        <section id="contact" className="py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Contact</h2>
            <Contact />
          </div>
        </section>

      </main>
    </div>
  );
}
