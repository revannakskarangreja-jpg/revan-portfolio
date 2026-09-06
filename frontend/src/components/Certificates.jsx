import { useEffect, useState } from 'react';

export default function Certificates() {
  const [certs, setCerts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/certificates').then(r => r.json()).then(data => { setCerts(data); setLoading(false); }).catch(()=>setLoading(false));
  }, []);

  if (loading) return <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">{Array.from({length:3}).map((_,i)=>(<div key={i} className="h-44 bg-white/5 rounded animate-pulse"/>))}</div>;
  if (!certs || certs.length === 0) return <div className="text-muted">No certificates yet. Add via admin.</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {certs.map(c => (
        <div key={c.id} className="bg-white/5 rounded-lg overflow-hidden border border-white/6">
          <div className="h-40 w-full bg-black/10 flex items-center justify-center">
            {c.image ? <img src={c.image} alt={c.title} className="object-contain w-full h-full" /> : <div className="text-muted p-4">No image</div>}
          </div>
          <div className="p-3">
            <div className="font-semibold">{c.title}</div>
            <div className="text-sm text-muted">{c.issuer} — {c.date ? new Date(c.date).toLocaleDateString() : ''}</div>
            <div className="mt-2 text-sm text-muted">{c.description}</div>
            {c.certificate_url && <a href={c.certificate_url} target="_blank" rel="noreferrer" className="mt-3 inline-block px-3 py-1 bg-accent text-white rounded">View Certificate</a>}
          </div>
        </div>
      ))}
    </div>
  );
}
