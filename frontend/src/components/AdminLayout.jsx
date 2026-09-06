import Link from 'next/link';

export default function AdminLayout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-6 flex items-center justify-between">
          <div className="text-2xl font-bold">Revan Admin</div>
          <div className="space-x-3">
            <Link href="/">View Site</Link>
            <Link href="/admin/login">Logout</Link>
          </div>
        </header>

        <div className="bg-white/5 p-6 rounded-xl">{children}</div>
      </div>
    </div>
  );
}
