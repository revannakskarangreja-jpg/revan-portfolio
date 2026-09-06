import { useEffect, useState } from 'react';

export default function Projects() {
  const [projects, setProjects] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/projects').then(r => r.json()).then(data => { setProjects(data); setLoading(false); }).catch(()=>setLoading(false));
  }, []);

  if (loading) return <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">{Array.from({length:4}).map((_,i)=>(<div key={i} className="h-48 bg-white/5 rounded animate-pulse"/>))}</div>;
  if (!projects || projects.length === 0) return <div className="text-muted">No projects yet. Add via admin.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      {projects.map(p => (
        <div key={p.id} className="bg-white/5 rounded-lg overflow-hidden border border-white/6 flex flex-col">
          <div className="h-48 w-full relative bg-gradient-to-br from-black/10 to-white/2">
            {p.image ? <img src={p.image} alt={p.title} className="object-cover w-full h-full" /> : <div className="w-full h-full flex items-center justify-center text-muted">No image</div>}
          </div>
          <div className="p-4 flex-1 flex flex-col">
            <div className="font-semibold text-lg">{p.title}</div>
            <div className="text-sm text-muted mt-2 flex-1">{p.description}</div>
            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm text-muted">{(p.technologies || []).join(' • ')}</div>
              <div className="flex gap-2">
                {p.demo_url && <a href={p.demo_url} target="_blank" rel="noreferrer" className="px-3 py-1 bg-accent text-white rounded">Live</a>}
                {p.github_url && <a href={p.github_url} target="_blank" rel="noreferrer" className="px-3 py-1 border rounded">Code</a>}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
