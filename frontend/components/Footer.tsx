import Link from 'next/link';
import { MapPin, Mail, Phone, Heart, Facebook, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                            Chillo Creative
                        </h3>
                        <p className="text-gray-400 max-w-xs mb-6">
                            Transforming ideas into digital masterpieces. We build brands, websites, and experiences that last.
                        </p>
                        <div className="flex gap-4">
                            <a
                                href="https://www.facebook.com/chillocreative"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center text-white transition-all transform hover:scale-110"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://www.instagram.com/chillocreative"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-full bg-gray-800 hover:bg-purple-600 flex items-center justify-center text-white transition-all transform hover:scale-110"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link></li>
                            <li><Link href="/services" className="text-gray-400 hover:text-white transition-colors">Services</Link></li>
                            <li><Link href="/portfolio" className="text-gray-400 hover:text-white transition-colors">Portfolio</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-4">Connect</h4>
                        <div className="space-y-3">
                            <div className="flex items-start gap-3 text-gray-400">
                                <MapPin className="w-5 h-5 mt-1 shrink-0 text-purple-500" />
                                <p>56 Lorong Shahbandar 10<br />Bertam Perdana 3<br />13200 Kepala Batas<br />Penang, Malaysia</p>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <Mail className="w-5 h-5 shrink-0 text-purple-500" />
                                <p>hello@chillocreative.com</p>
                            </div>
                            <div className="flex items-center gap-3 text-gray-400">
                                <Phone className="w-5 h-5 shrink-0 text-purple-500" />
                                <p>+6.011.1001.9843</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500">
                    {/* Spacer for centering logic on desktop */}
                    <div className="hidden md:block flex-1"></div>

                    <div className="text-center">
                        <p className="flex items-center justify-center gap-1">
                            Made with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> &copy; {new Date().getFullYear()} Chillo Creative.
                        </p>
                        <p className="mt-1">CH Global Empire (003124386-V)</p>
                    </div>

                    <div className="flex justify-center md:justify-end flex-1 mt-4 md:mt-0 w-full md:w-auto">
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
