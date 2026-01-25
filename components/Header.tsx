import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image 
            src="/logo.png" 
            alt="Chillo Creative Logo" 
            width={40} 
            height={40} 
            className="h-10 w-auto"
          />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-500">
            Chillo Creative
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
            Home
          </Link>
          <Link href="/services" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
            My Services
          </Link>
          <Link href="/portfolio" className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
            Portfolio
          </Link>
          <Link href="/contact" className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors font-medium">
            Contact
          </Link>
        </nav>
        
        {/* Mobile Menu Button - Implementation can be added later */}
        <button className="md:hidden text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
        </button>
      </div>
    </header>
  );
};

export default Header;
