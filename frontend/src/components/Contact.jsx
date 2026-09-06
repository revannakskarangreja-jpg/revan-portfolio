import { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const res = await fetch('/api/messages', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name, email, message }) });
    setLoading(false);
    if (res.ok) {
      setStatus({ type: 'success', text: 'Message sent. Thank you!' });
      setName(''); setEmail(''); setMessage('');
    } else {
      const body = await res.json().catch(()=>({}));
      setStatus({ type: 'error', text: body?.error || 'Failed to send message' });
    }
  }

  return (
    <div className="max-w-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Name</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} required className="w-full mt-1 px-3 py-2 rounded bg-black/5" />
        </div>
        <div>
          <label className="block text-sm">Email</label>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required className="w-full mt-1 px-3 py-2 rounded bg-black/5" />
        </div>
        <div>
          <label className="block text-sm">Message</label>
          <textarea value={message} onChange={(e)=>setMessage(e.target.value)} required rows={6} className="w-full mt-1 px-3 py-2 rounded bg-black/5" />
        </div>
        <div>
          <button type="submit" disabled={loading} className="bg-accent text-white px-4 py-2 rounded">{loading ? 'Sending...' : 'Send Message'}</button>
        </div>
        {status && <div className={`p-3 rounded ${status.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{status.text}</div>}
      </form>
    </div>
  );
}
