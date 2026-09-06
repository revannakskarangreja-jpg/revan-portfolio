import Link from 'next/link';
import ThemeToggle from './ThemeToggle';
import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="fixed w-full z-40 top-0 backdrop-blur-md bg-white/5 dark:bg-black/20">
      <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="text-xl font-semibold">Vann <span className="text-accent">Design</span></div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#certificates">Certificates</a>
          <a href="#contact">Contact</a>
          <ThemeToggle />
        </div>

        <div className="md:hidden">
          <button onClick={() => setOpen(!open)} aria-label="menu" className="p-2 rounded-md">
            <svg width="26" height="26" viewBox="0 0 24 24"><path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden px-6 pb-4 space-y-4">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#certificates">Certificates</a>
          <a href="#contact">Contact</a>
          <div className="pt-2"><ThemeToggle /></div>
        </div>
      )}
    </nav>
  );
}
