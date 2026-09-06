import { supabase } from '../../services/supabaseClient';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
      return;
    }
    // redirect to admin
    router.push('/admin');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="w-full max-w-md bg-white/5 p-8 rounded-xl backdrop-blur-md">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm">Email</label>
            <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-md bg-black/10" required />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full mt-1 px-3 py-2 rounded-md bg-black/10" required />
          </div>
          {error && <div className="text-red-400">{error}</div>}
          <button type="submit" disabled={loading} className="w-full bg-accent py-2 rounded-md">{loading ? 'Signing in...' : 'Sign in'}</button>
        </form>
      </div>
    </div>
  );
}
