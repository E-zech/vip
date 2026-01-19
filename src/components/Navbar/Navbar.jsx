import React, { useState, useEffect, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContext';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollToSection } = useContext(GeneralContext);
    const location = useLocation();
    const navigate = useNavigate();

    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogoClick = () => {
        if (isHomePage) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            navigate('/');
        }
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { name: 'דף הבית', path: '/', isSection: false },
        { name: 'אודות', sectionId: 'about', isSection: true },
        { name: 'גלריה', path: '/gallery', isSection: false },
        { name: 'צור קשר', sectionId: 'contact', isSection: true },
    ];

    const navBackground = !isHomePage || isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4';
    const textColor = !isHomePage || isScrolled ? 'text-gray-900' : 'text-white';

    return (
        <nav className={`fixed w-full z-[100] transition-all duration-300 ${navBackground}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                {/* לוגו תמונה - לחיץ */}
                <div className="flex-1 flex justify-start">
                    <div onClick={handleLogoClick} className="cursor-pointer">
                        <img
                            src="/logo.png"
                            alt="Eliya VIP Logo"
                            className="h-10 md:h-14 w-auto object-contain hover:scale-105 transition-transform"
                        />
                    </div>
                </div>

                {/* תפריט Desktop */}
                <div className="hidden md:flex gap-8 items-center justify-center">
                    {navLinks.map((link) => (
                        link.isSection ? (
                            <button
                                key={link.name}
                                onClick={() => scrollToSection(link.sectionId)}
                                className={`text-lg font-bold hover:text-blue-600 transition-colors ${textColor}`}
                            >
                                {link.name}
                            </button>
                        ) : (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-lg font-bold hover:text-blue-600 transition-colors ${textColor}`}
                            >
                                {link.name}
                            </Link>
                        )
                    ))}
                </div>

                {/* לוגו טקסט */}
                <div className="flex-1 flex justify-end items-center gap-4">
                    <div onClick={handleLogoClick} className={`text-xl md:text-2xl font-black tracking-tighter cursor-pointer ${textColor}`}>
                        ELIYA <span className="text-blue-600">VIP</span>
                    </div>

                    {/* כפתור המבורגר */}
                    <button
                        className="md:hidden p-1"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X size={28} className="text-gray-900" />
                        ) : (
                            <Menu size={28} className={textColor} />
                        )}
                    </button>
                </div>
            </div>

            {/* תפריט מובייל - נקי וקומפקטי */}
            <div className={`absolute top-full right-0 w-full bg-white shadow-2xl transition-all duration-300 overflow-hidden md:hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col p-4 border-t border-gray-100">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => {
                                link.isSection ? scrollToSection(link.sectionId) : navigate(link.path);
                                setIsMobileMenuOpen(false);
                            }}
                            className="py-4 text-right text-lg font-bold text-gray-800 border-b border-gray-50 last:border-0 active:bg-gray-50"
                        >
                            {link.name}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}