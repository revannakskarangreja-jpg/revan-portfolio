import { supabaseAdmin } from '../../services/supabaseAdmin';

export default async function handler(req, res) {
  const { method } = req;
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1] || null;

  try {
    if (method === 'GET') {
      const { data, error } = await supabaseAdmin.from('messages').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return res.status(200).json(data);
    }

    if (!token) return res.status(401).json({ error: 'Missing token' });
    const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token);
    if (userErr) return res.status(401).json({ error: 'Invalid token' });
    const user = userData?.user;
    if (!user) return res.status(401).json({ error: 'Not authenticated' });

    const { data: admins } = await supabaseAdmin.from('admins').select('*').eq('user_id', user.id);
    if (!admins || admins.length === 0) return res.status(403).json({ error: 'Not an admin' });

    if (method === 'PUT') {
      const { id, read } = req.body;
      const { data, error } = await supabaseAdmin.from('messages').update({ read }).eq('id', id).select();
      if (error) throw error;
      return res.status(200).json(data[0]);
    }

    if (method === 'DELETE') {
      const { id } = req.query;
      const { error } = await supabaseAdmin.from('messages').delete().eq('id', id);
      if (error) throw error;
      return res.status(204).end();
    }

    res.setHeader('Allow', ['GET','PUT','DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message || 'Server error' });
  }
}
