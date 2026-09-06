import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
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
          <p className="text-muted">This is a starter portfolio built with Next.js + Supabase. Customize the About section in Supabase profiles table.</p>
        </section>
      </main>
    </div>
  );
}
