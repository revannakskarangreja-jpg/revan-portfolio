import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabaseClient';
import AdminLayout from '../../components/AdminLayout';
import ResourceManager from '../../components/ResourceManager';
import { useRouter } from 'next/router';

export default function AdminDashboard() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    async function check() {
      const { data: { session } } = await supabase.auth.getSession();
      const accessToken = session?.access_token;
      if (!accessToken) {
        router.replace('/admin/login');
        return;
      }
      setToken(accessToken);
      // verify admin via API
      const res = await fetch('/api/admin/check', { headers: { Authorization: `Bearer ${accessToken}` } });
      if (res.ok) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
        router.replace('/admin/login');
      }
      setChecking(false);
    }
    check();
  }, []);

  if (checking) return <div className="min-h-screen flex items-center justify-center">Checking...</div>;

  if (!isAdmin) return null;

  return (
    <AdminLayout>
      <div className="space-y-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ResourceManager resource="projects" token={token} fields={["title","description","image","technologies","demo_url","github_url"]} />
          <ResourceManager resource="certificates" token={token} fields={["title","issuer","date","image","certificate_url","description"]} />
          <ResourceManager resource="skills" token={token} fields={["name","description","icon"]} />
          <ResourceManager resource="social_links" token={token} fields={["platform","url","icon"]} />
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Messages</h2>
          <MessagesList token={token} />
        </div>
      </div>
    </AdminLayout>
  );
}

function MessagesList({ token }) {
  const [msgs, setMsgs] = useState([]);

  useEffect(() => {
    fetch('/api/messages', { headers: { Authorization: `Bearer ${token}` } }).then(r=>r.json()).then(setMsgs).catch(console.error);
  }, []);

  if (!msgs || msgs.length === 0) return <div className="p-4 bg-white/3 rounded">No messages yet.</div>;

  return (
    <div className="space-y-3">
      {msgs.map(m => (
        <div key={m.id} className={`p-4 rounded-md ${m.read ? 'bg-white/3' : 'bg-accent/10'}`}>
          <div className="flex justify-between items-start">
            <div>
              <div className="font-semibold">{m.name} — <span className="text-sm text-muted">{m.email}</span></div>
              <div className="text-sm mt-1">{m.message}</div>
            </div>
            <div className="space-y-2 text-right">
              <button onClick={async ()=>{ await fetch(`/api/messages?id=${m.id}`, { method: 'PUT', headers: { Authorization: `Bearer ${token}` } }); setMsgs(prev => prev.map(x => x.id === m.id ? {...x, read: true} : x)); }} className="px-3 py-1 bg-green-500 text-white rounded">Mark read</button>
              <button onClick={async ()=>{ await fetch(`/api/messages?id=${m.id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } }); setMsgs(prev => prev.filter(x=>x.id!==m.id)); }} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
