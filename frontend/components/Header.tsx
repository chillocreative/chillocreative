'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleMobileMenu = () => {
    console.log('Toggling mobile menu. Current state:', isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  if (!mounted) {
    return (
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl px-8 py-4 flex items-center justify-between gap-12 max-w-5xl w-full text-white">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.png"
              alt="Chillo Creative Logo"
              width={80}
              height={80}
              className="h-16 w-auto mix-blend-screen object-contain rounded-full brightness-125 transition-all"
            />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Chillo Creative
            </span>
          </Link>
          <div className="md:hidden w-10 h-10"></div>
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="fixed top-6 left-0 right-0 z-50 flex flex-col items-center px-4">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl px-8 py-4 flex items-center justify-between gap-12 max-w-5xl w-full text-white relative">
          <Link href="/" className="flex items-center gap-3" onClick={closeMobileMenu}>
            <Image
              src="/logo.png"
              alt="Chillo Creative Logo"
              width={80}
              height={80}
              className="h-16 w-auto mix-blend-screen object-contain rounded-full brightness-125 hover:brightness-150 transition-all"
            />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
              Chillo Creative
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium hover:text-purple-300 transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/services" className="text-sm font-medium hover:text-purple-300 transition-colors relative group">
              Services
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/portfolio" className="text-sm font-medium hover:text-purple-300 transition-colors relative group">
              Portfolio
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-purple-400 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all font-medium text-sm transform hover:scale-105">
              Let&apos;s Talk
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors z-[60]"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="6" x2="20" y2="6" />
                <line x1="4" y1="18" x2="20" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-40 transition-opacity duration-300 md:hidden ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
        onClick={closeMobileMenu}
      />

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-28 left-4 right-4 z-[45] md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
      >
        <nav className="bg-[#1a1a1a]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl p-6 flex flex-col gap-4 text-white">
          <Link
            href="/"
            className="text-lg font-medium hover:text-purple-300 transition-colors py-3 px-4 rounded-xl hover:bg-white/5"
            onClick={closeMobileMenu}
          >
            Home
          </Link>
          <Link
            href="/services"
            className="text-lg font-medium hover:text-purple-300 transition-colors py-3 px-4 rounded-xl hover:bg-white/5"
            onClick={closeMobileMenu}
          >
            Services
          </Link>
          <Link
            href="/portfolio"
            className="text-lg font-medium hover:text-purple-300 transition-colors py-3 px-4 rounded-xl hover:bg-white/5"
            onClick={closeMobileMenu}
          >
            Portfolio
          </Link>
          <div className="h-px bg-white/10 my-2" />
          <Link
            href="/contact"
            className="text-lg font-bold text-center py-4 px-6 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl hover:shadow-[0_0_30px_rgba(168,85,247,0.4)] transition-all active:scale-95"
            onClick={closeMobileMenu}
          >
            Let&apos;s Talk
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Header;

