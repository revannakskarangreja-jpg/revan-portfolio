import { supabaseAdmin } from '../../../services/supabaseAdmin';

export default async function handler(req, res) {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.split(' ')[1] || null;
  if (!token) return res.status(401).json({ error: 'Missing token' });

  try {
    const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(token);
    if (userErr) return res.status(401).json({ error: 'Invalid token' });
    const user = userData?.user;
    if (!user) return res.status(401).json({ error: 'Not authenticated' });

    const { data: admins, error } = await supabaseAdmin.from('admins').select('*').eq('user_id', user.id);
    if (error) return res.status(500).json({ error: error.message });
    if (!admins || admins.length === 0) return res.status(403).json({ error: 'Not an admin' });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
}
