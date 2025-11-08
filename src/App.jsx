import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Phone, Mail, Facebook, Instagram, MapPin, X, Menu, Mic, Briefcase, Plane } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function App() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isSliderPaused, setIsSliderPaused] = useState(false);
    const [isAboutImageVisible, setIsAboutImageVisible] = useState(false);
    const aboutRef = useRef(null);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const heroImages = [
        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/fa34311b6_WhatsAppImage2025-06-12at45226PM.jpg',
        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/649af5198_WhatsAppImage2025-06-12at45225PM1.jpg',
        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/64f80d3fc_WhatsAppImage2025-06-12at45223PM.jpg',
        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/36c5febd0_WhatsAppImage2025-06-09at14245PM2.jpg',
        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/91ba71d15_WhatsAppImage2025-06-09at14245PM1.jpg'
    ];

    const galleryImages = [
        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/b76056196_1.jpg',
        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/211cd4178_2.jpg',
        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/8b0a34dfb_3.jpg',
        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/4a1cc5df2_4.jpg',
        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/9ce9f22a9_5.jpg',
        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/c4550e537_6.jpg',
        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6780f05d2_7.jpg',
        'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/62413558c_8.jpg'
    ];

    // Auto-advance slider
    useEffect(() => {
        if (!isSliderPaused) {
            const interval = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % heroImages.length);
            }, 2500);
            return () => clearInterval(interval);
        }
    }, [isSliderPaused, heroImages.length]);

    // Intersection Observer for about image animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsAboutImageVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (aboutRef.current) {
            observer.observe(aboutRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const openLightbox = (index) => {
        setSelectedImageIndex(index);
        setIsLightboxOpen(true);
    };

    const closeLightbox = () => setIsLightboxOpen(false);

    const showNextImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
    };

    const showPrevImage = () => {
        setSelectedImageIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isLightboxOpen) return;
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, showNextImage, showPrevImage]);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        element?.scrollIntoView({ behavior: 'smooth' });
        setIsMobileMenuOpen(false);
    };

    return (
        <div className="min-h-screen bg-white" style={{ direction: 'rtl' }}>
            {/* Navbar */}
            <nav className="fixed top-0 w-full h-[70px] bg-white/95 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm">
                <div className="max-w-[2000px] mx-auto px-6 h-full flex items-center justify-between">
                    {/* Logo and Brand - Right side */}
                    <div className="flex items-center gap-4">
                        <img
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/d271d4ea8_logo.png"
                            alt="לוגו אליה הסעות"
                            className="w-12 h-12 rounded-lg object-cover shadow-sm"
                        />
                        <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
                            אליה הסעות VIP
                        </h1>
                    </div>

                    {/* Desktop Navigation - Left side */}
                    <div className="hidden md:flex items-center gap-8">
                        <button
                            onClick={() => scrollToSection('gallery')}
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-blue-50"
                        >
                            גלריה
                        </button>
                        <button
                            onClick={() => scrollToSection('about')}
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-blue-50"
                        >
                            אודות
                        </button>
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300 py-2 px-4 rounded-lg hover:bg-blue-50"
                        >
                            צור קשר
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 rounded-md hover:bg-gray-100">
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Dropdown */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="md:hidden absolute top-[70px] left-0 right-0 bg-white shadow-lg p-4"
                        >
                            <div className="flex flex-col gap-4">
                                <button onClick={() => scrollToSection('gallery')} className="w-full text-right p-3 rounded-md hover:bg-gray-100">גלריה</button>
                                <button onClick={() => scrollToSection('about')} className="w-full text-right p-3 rounded-md hover:bg-gray-100">אודות</button>
                                <button onClick={() => scrollToSection('contact')} className="w-full text-right p-3 rounded-md hover:bg-gray-100">צור קשר</button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* Hero Slider */}
            <section className="relative w-screen h-screen overflow-hidden">
                <div
                    className="flex w-full h-full transition-transform duration-1000 ease-in-out"
                    style={{ transform: `translateX(${currentSlide * 100}%)` }}
                    onMouseEnter={() => setIsSliderPaused(true)}
                    onMouseLeave={() => setIsSliderPaused(false)}
                >
                    {heroImages.map((image, index) => (
                        <div key={index} className="min-w-full h-full relative">
                            <img
                                src={image}
                                alt={`תמונה ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                            {index === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="text-center text-white px-6 hidden sm:block">
                                        <h2 className="text-5xl md:text-7xl font-bold mb-6 opacity-90">
                                            אליה הסעות
                                        </h2>
                                        <p className="text-xl md:text-2xl opacity-80 max-w-2xl">
                                            שירותי הסעות VIP
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Slider Indicators */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
                    {heroImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                    ? 'bg-white scale-125'
                                    : 'bg-white/50 hover:bg-white/75'
                                }`}
                        />
                    ))}
                </div>
            </section>

            {/* Gallery */}
            <section id="gallery" className="w-screen min-h-screen bg-gray-50 py-20">
                <div className="max-w-[2000px] mx-auto px-6">
                    <h2 className="text-4xl md:text-5xl font-bold text-center text-gray-900 mb-16">
                        גלריה
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {galleryImages.map((image, index) => (
                            <div
                                key={index}
                                onClick={() => openLightbox(index)}
                                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 aspect-square cursor-pointer"
                            >
                                <img
                                    src={image}
                                    alt={`תמונת גלריה ${index + 1}`}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                    <p className="text-white text-lg font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">צפה בתמונה</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* About */}
            <section id="about" className="w-screen min-h-screen bg-white py-20" ref={aboutRef}>
                <div className="max-w-[2000px] mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        {/* Text Content - Right */}
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-12">
                                נוחות, יוקרה ושירות אישי ללא פשרות.
                            </h2>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    שירותי הסעות לאמנים, אנשי עסקים ונתב"ג, כל נסיעה מותאמת לצרכים שלכם עם רכב מפנק, כורסאות נוחות וחוויה יוקרתית מהרגע הראשון,

                                    מה שנשאר לכם זה להינות מהדרך...
                                </p>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <div className="bg-blue-50 p-4 rounded-xl text-center flex-1">
                                    <div className="flex items-center justify-center mb-2">
                                        <Mic className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <div className="text-lg font-bold text-blue-600">הסעות אומנים</div>
                                </div>
                                <div className="bg-green-50 p-4 rounded-xl text-center flex-1">
                                    <div className="flex items-center justify-center mb-2">
                                        <Briefcase className="w-6 h-6 text-green-600" />
                                    </div>
                                    <div className="text-lg font-bold text-green-600">אנשי עסקים</div>
                                </div>
                                <div className="bg-purple-50 p-4 rounded-xl text-center flex-1">
                                    <div className="flex items-center justify-center mb-2">
                                        <Plane className="w-6 h-6 text-purple-600" />
                                    </div>
                                    <div className="text-lg font-bold text-purple-600">נתב"ג</div>
                                </div>
                            </div>
                        </div>

                        {/* Image - Left with Animation */}
                        <div className="relative">
                            <div
                                className={`transform transition-all duration-1000 ${isAboutImageVisible
                                        ? 'translate-x-0 opacity-100'
                                        : '-translate-x-full opacity-0'
                                    }`}
                            >
                                <img
                                    src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/25c9ae3fa_WhatsAppImage2025-07-04at110058AM.jpg"
                                    alt="בעל החברה"
                                    className="w-3/4 mx-auto rounded-2xl shadow-2xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Footer */}
            <footer id="contact" className="w-screen bg-gray-900 text-white py-20">
                <div className="max-w-[2000px] mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-12 mb-12">
                        {/* Contact Info */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold mb-6">צור קשר</h3>
                            <div className="space-y-4">
                                <a
                                    href="https://wa.me/message/C4XMLFWCJIHPB1"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 hover:text-blue-300 transition-colors cursor-pointer"
                                >
                                    <Phone className="w-5 h-5 text-blue-400" />
                                    <span>054-9223745</span>
                                </a>
                                <a
                                    href="mailto:eliyaz2024@gmail.com"
                                    className="flex items-center gap-4 hover:text-blue-300 transition-colors cursor-pointer"
                                >
                                    <Mail className="w-5 h-5 text-blue-400" />
                                    <span>eliyaz2024@gmail.com</span>
                                </a>
                                <a
                                    href="https://maps.app.goo.gl/9PV8EFmbYEc1p9vBA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-4 hover:text-blue-300 transition-colors cursor-pointer"
                                >
                                    <MapPin className="w-5 h-5 text-blue-400" />
                                    <span>הרצליה, ישראל</span>
                                </a>
                            </div>
                        </div>

                        {/* Services */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold mb-6">השירותים שלנו</h3>
                            <ul className="space-y-3 text-gray-300">
                                <li>הסעות לאירועים</li>
                                <li>נסיעות עסקיות</li>
                                <li>הסעות תיירים</li>
                                <li>הסעות לשדה התעופה</li>
                            </ul>
                        </div>

                        {/* Social Media */}
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold mb-6">עקבו אחרינו</h3>
                            <div className="flex gap-6">
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors duration-300"
                                    aria-label="פייסבוק"
                                >
                                    <Facebook className="w-6 h-6" />
                                </a>
                                <a
                                    href="#"
                                    className="w-12 h-12 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors duration-300"
                                    aria-label="אינסטגרם"
                                >
                                    <Instagram className="w-6 h-6" />
                                </a>
                            </div>
                            <div className="text-gray-400 text-sm">
                                <p>שעות פעילות:</p>
                                <p>ראשון - חמישי</p>
                                <p>שישי - עד כניסת שבת</p>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 אליה הסעות VIP כל הזכויות שמורות.</p>
                    </div>
                </div>
            </footer>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {isLightboxOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeLightbox}
                        className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-4"
                    >
                        <motion.button
                            initial={{ scale: 0, rotate: 180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: -180 }}
                            transition={{ delay: 0.2 }}
                            onClick={closeLightbox}
                            className="absolute top-6 left-6 text-white/70 hover:text-white transition-colors"
                            aria-label="סגור תצוגה מקדימה"
                        >
                            <X className="w-10 h-10" />
                        </motion.button>

                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 }}
                            onClick={(e) => { e.stopPropagation(); showPrevImage(); }}
                            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
                            aria-label="התמונה הקודמת"
                        >
                            <ChevronRight className="w-8 h-8" />
                        </motion.button>

                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.3 }}
                            onClick={(e) => { e.stopPropagation(); showNextImage(); }}
                            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 rounded-full text-white transition-colors"
                            aria-label="התמונה הבאה"
                        >
                            <ChevronLeft className="w-8 h-8" />
                        </motion.button>

                        <motion.div
                            layoutId={`gallery-image-${selectedImageIndex}`}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-4xl max-h-[90vh]"
                        >
                            <img
                                src={galleryImages[selectedImageIndex]}
                                alt={`תמונת גלריה ${selectedImageIndex + 1}`}
                                className="object-contain w-full h-full max-h-[90vh] rounded-lg shadow-2xl"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
