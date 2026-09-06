import { useEffect, useState } from 'react';

export default function Skills() {
  const [skills, setSkills] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/skills').then(r => r.json()).then(data => { setSkills(data); setLoading(false); }).catch(()=>setLoading(false));
  }, []);

  if (loading) return <div className="grid grid-cols-2 md:grid-cols-4 gap-4">{Array.from({length:8}).map((_,i)=>(<div key={i} className="h-24 bg-white/5 rounded animate-pulse"/>))}</div>;
  if (!skills || skills.length === 0) return <div className="text-muted">No skills yet. Add from admin.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {skills.map(s => (
        <div key={s.id} className="p-4 bg-white/5 rounded-lg backdrop-blur-md border border-white/6">
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 flex items-center justify-center bg-white/6 rounded">{s.icon ? <img src={s.icon} alt={s.name} className="w-8 h-8" /> : <span className="text-accent">{s.name?.charAt(0)}</span>}</div>
            <div>
              <div className="font-semibold">{s.name}</div>
              <div className="text-sm text-muted mt-1">{s.description}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
