import React, { useState, useEffect, useContext } from 'react';
import { Menu, X, Languages } from 'lucide-react'; // הוספתי אייקון שפה
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GeneralContext } from '../../context/GeneralContext';
import { translations } from '../../translation';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollToSection, lang, setLang } = useContext(GeneralContext); // מניח שתוסיף לקונטקסט
    const location = useLocation();
    const navigate = useNavigate();

    const t = translations[lang || 'he'];
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        const newLang = lang === 'he' ? 'en' : 'he';
        setLang(newLang);
        document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLang;
    };

    const navLinks = [
        { name: t.nav_home, path: '/', isSection: false },
        { name: t.nav_about, sectionId: 'about', isSection: true },
        { name: t.nav_gallery, path: '/gallery', isSection: false },
        { name: t.nav_contact, sectionId: 'cta-section', isSection: true },
    ];

    const navBackground = !isHomePage || isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4';
    const textColor = !isHomePage || isScrolled ? 'text-gray-900' : 'text-white';

    return (
        <nav className={`fixed w-full z-[100] transition-all duration-300 ${navBackground}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">

                {/* לוגו תמונה */}
                <div className="flex-1 flex justify-start">
                    <Link to="/" className="cursor-pointer">
                        <img src="/logo.png" alt="Logo" className="h-10 md:h-14 w-auto object-contain hover:scale-105 transition-transform" />
                    </Link>
                </div>

                {/* תפריט Desktop */}
                <div className="hidden md:flex gap-8 items-center justify-center">
                    {navLinks.map((link) => (
                        link.isSection ? (
                            <button key={link.name} onClick={() => { if (!isHomePage) navigate('/'); setTimeout(() => scrollToSection(link.sectionId), 100); }} className={`text-lg font-bold hover:text-blue-600 transition-colors ${textColor}`}>
                                {link.name}
                            </button>
                        ) : (
                            <Link key={link.name} to={link.path} className={`text-lg font-bold hover:text-blue-600 transition-colors ${textColor}`}>
                                {link.name}
                            </Link>
                        )
                    ))}
                </div>

                {/* לוגו טקסט וכפתור שפה */}
                <div className="flex-1 flex justify-end items-center gap-4">

                    {/* כפתור החלפת שפה Toggle */}
                    <button
                        onClick={toggleLanguage}
                        className={`px-3 py-1 rounded-md border-2 font-black text-sm transition-all duration-300 ${!isHomePage || isScrolled
                            ? 'border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white'
                            : 'border-white text-white hover:bg-white hover:text-gray-900'
                            }`}
                    >
                        {lang === 'he' ? 'EN' : 'HE'}
                    </button>

                    <div onClick={() => navigate('/')} className={`text-xl md:text-2xl font-black tracking-tighter cursor-pointer ${textColor}`}>
                        ELIYA <span className="text-blue-600">VIP</span>
                    </div>

                    {/* המבורגר למובייל */}
                    <button className="md:hidden p-1" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={28} className="text-gray-900" /> : <Menu size={28} className={textColor} />}
                    </button>
                </div>
            </div>

            {/* תפריט מובייל */}
            <div className={`absolute top-full right-0 w-full bg-white shadow-2xl transition-all duration-300 overflow-hidden md:hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="flex flex-col p-4">
                    {navLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => {
                                link.isSection ? scrollToSection(link.sectionId) : navigate(link.path);
                                setIsMobileMenuOpen(false);
                            }}
                            className="py-4 text-center text-lg font-bold text-gray-800 border-b border-gray-50 last:border-0"
                        >
                            {link.name}
                        </button>
                    ))}
                </div>
            </div>
        </nav>
    );
}