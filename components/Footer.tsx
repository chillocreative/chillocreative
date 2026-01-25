import Link from 'next/link';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                            Chillo Creative
                        </h3>
                        <p className="text-gray-400 max-w-xs">
                            Transforming ideas into digital masterpieces. We build brands, websites, and experiences that last.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">My Services</Link></li>
                            <li><Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect</h4>
                        <p className="text-gray-400 mb-2">hello@chillocreative.com</p>
                        <p className="text-gray-400">+60 12 345 6789</p>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} Chillo Creative. All rights reserved.</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <Link href="/admin" className="hover:text-gray-300">
                            Admin Login
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
