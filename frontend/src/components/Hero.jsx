import Image from 'next/image';

export default function Hero({ profile }) {
  return (
    <section id="home" className="min-h-screen relative overflow-hidden flex items-center">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-slate-900 via-[#071428] to-[#001219]">
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-gradient-to-r from-purple-500 to-pink-400 blur-3xl opacity-30 animate-blob" />
        <div className="absolute right-0 bottom-0 w-96 h-96 rounded-full bg-gradient-to-r from-cyan-400 to-blue-600 blur-3xl opacity-20 animate-blob" />
      </div>

      <div className="container mx-auto px-6 py-32 flex items-center gap-10">
        <div className="flex-1 max-w-2xl text-white">
          <p className="text-accent font-medium mb-2">Hi, I'm</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">Rizki Revandita Pratama</h1>
          <p className="mt-4 text-lg text-muted/80">Web Developer • Designer • Creative</p>

          <p className="mt-6 text-base text-muted/80 max-w-xl">Saya adalah pelajar yang tertarik pada web development, desain digital, dan teknologi. Saya suka membuat sesuatu dari ide sederhana menjadi project yang bisa digunakan.</p>

          <div className="mt-8 flex gap-4">
            <a href="#projects" className="bg-accent text-white px-4 py-2 rounded-md shadow hover:brightness-105">View My Projects</a>
            <a href="#contact" className="border border-white/10 text-white px-4 py-2 rounded-md">Contact Me</a>
          </div>
        </div>

        <div className="w-80">
          <div className="bg-white/5 p-1 rounded-2xl backdrop-blur-md border border-white/6">
            <div className="rounded-xl overflow-hidden p-6 bg-gradient-to-br from-white/2 to-transparent">
              <Image src={profile?.profile_image || '/default-avatar.svg'} width={240} height={240} alt="Profile" className="rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
