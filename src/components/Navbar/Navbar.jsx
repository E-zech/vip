import React, { useState, useEffect, useContext } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContext';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollToSection } = useContext(GeneralContext);
    const location = useLocation();

    // שינוי צבע הנייבר בגלילה
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'דף הבית', path: '/', isSection: false },
        { name: 'אודות', sectionId: 'about', isSection: true },
        { name: 'גלריה', path: '/gallery', isSection: false },
        { name: 'צור קשר', sectionId: 'contact', isSection: true },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                {/* כפתור יצירת קשר מהיר (Desktop) */}
                <div className="hidden md:block">
                    <a href="tel:0549223745" className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors">
                        <Phone size={18} />
                        <span className="font-bold">חייגו עכשיו</span>
                    </a>
                </div>

                {/* תפריט ניווט (Desktop) */}
                <div className="hidden md:flex gap-8 items-center">
                    {navLinks.map((link) => (
                        link.isSection ? (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.sectionId)}
                                className={`font-medium hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}
                            >
                                {link.name}
                            </button>
                        ) : (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`font-medium hover:text-blue-600 transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'}`}
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                </div>

                {/* לוגו / שם העסק */}
                <Link to="/" className={`text-2xl font-black ${isScrolled ? 'text-blue-600' : 'text-white'}`}>
                    ELIYA VIP
                </Link>

                {/* כפתור המבורגר (Mobile) */}
                <button className="md:hidden text-gray-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={28} className={isScrolled ? 'text-black' : 'text-white'} /> : <Menu size={28} className={isScrolled ? 'text-black' : 'text-white'} />}
                </button>
            </div>

            {/* תפריט מובייל נפתח */}
            {isMobileMenuOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-xl md:hidden flex flex-col p-6 gap-4 text-right">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => {
                                link.isSection ? scrollToSection(link.sectionId) : window.location.href = link.path;
                                setIsMobileMenuOpen(false);
                            }}
                            className="text-xl font-bold text-gray-800 border-b pb-2"
                        >
                            {link.name}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
}