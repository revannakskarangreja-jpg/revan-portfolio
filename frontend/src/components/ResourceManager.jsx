import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

export default function ResourceManager({ resource, token, fields }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({});

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems() {
    setLoading(true);
    const res = await fetch(`/api/${resource}`);
    const data = await res.json();
    setItems(data || []);
    setLoading(false);
  }

  function onChangeField(key, val) {
    setForm(prev => ({ ...prev, [key]: val }));
  }

  async function handleCreate(e) {
    e.preventDefault();
    // handle image upload if file
    const toSend = { ...form };
    // convert comma-separated technologies to array for projects
    if (toSend.technologies && typeof toSend.technologies === 'string') {
      toSend.technologies = toSend.technologies.split(',').map(s => s.trim()).filter(Boolean);
    }
    const res = await fetch(`/api/${resource}`, { method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(toSend) });
    if (res.ok) {
      setForm({});
      fetchItems();
    } else {
      alert('Error creating');
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    const toSend = { ...form };
    if (toSend.technologies && typeof toSend.technologies === 'string') toSend.technologies = toSend.technologies.split(',').map(s=>s.trim());
    const res = await fetch(`/api/${resource}`, { method: 'PUT', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }, body: JSON.stringify(toSend) });
    if (res.ok) {
      setEditing(null);
      setForm({});
      fetchItems();
    } else {
      alert('Error updating');
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete?')) return;
    const res = await fetch(`/api/${resource}?id=${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
    if (res.ok || res.status === 204) fetchItems(); else alert('Error deleting');
  }

  async function handleUploadImage(e) {
    const file = e.target.files[0];
    if (!file) return;
    const filePath = `${resource}/${Date.now()}-${file.name}`;
    const { data, error } = await supabase.storage.from('images').upload(filePath, file);
    if (error) { alert('Upload error'); console.error(error); return; }
    const publicUrl = supabase.storage.from('images').getPublicUrl(data.path).publicUrl;
    onChangeField('image', publicUrl);
  }

  return (
    <div className="p-4 bg-white/3 rounded">
      <h3 className="text-lg font-semibold capitalize">{resource.replace('_',' ')}</h3>

      <div className="mt-3">
        <form onSubmit={editing ? handleUpdate : handleCreate} className="space-y-3">
          {fields.map(f => (
            <div key={f}>
              <label className="block text-sm capitalize">{f}</label>
              {f === 'image' ? (
                <input type="file" onChange={handleUploadImage} />
              ) : (
                <input value={form[f]||''} onChange={(e)=>onChangeField(f, e.target.value)} className="w-full mt-1 px-2 py-1 rounded bg-black/10" />
              )}
            </div>
          ))}
          <div className="flex gap-2">
            <button type="submit" className="bg-accent text-white px-3 py-1 rounded">{editing ? 'Update' : 'Create'}</button>
            {editing && <button type="button" onClick={()=>{ setEditing(null); setForm({}); }} className="px-3 py-1 rounded border">Cancel</button>}
          </div>
        </form>
      </div>

      <div className="mt-4 space-y-2">
        {loading ? <div>Loading...</div> : items.map(item => (
          <div key={item.id} className="p-3 bg-white/5 rounded flex justify-between items-center">
            <div>
              <div className="font-medium">{item.title || item.name || item.platform}</div>
              <div className="text-sm text-muted">{item.description || item.issuer || item.url}</div>
            </div>
            <div className="space-x-2">
              <button onClick={()=>{ setEditing(item.id); setForm(item); }} className="px-2 py-1 bg-blue-600 rounded">Edit</button>
              <button onClick={()=>handleDelete(item.id)} className="px-2 py-1 bg-red-600 rounded">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
