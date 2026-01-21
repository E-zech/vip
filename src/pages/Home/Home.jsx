import React, { useState, useEffect, useRef, useContext } from 'react';
import { Mic, Briefcase, Plane, Users, Heart } from 'lucide-react';
import { GeneralContext } from '../../context/GeneralContext';

export default function Home() {
    const { scrollToSection, t, lang } = useContext(GeneralContext);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAboutVisible, setIsAboutVisible] = useState(false);
    const aboutRef = useRef(null);

    const heroImages = ['/images/1.jpeg', '/images/3.jpeg', '/images/4.jpeg'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setIsAboutVisible(true); },
            { threshold: 0.2 }
        );
        if (aboutRef.current) observer.observe(aboutRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <div className="w-full">
            {/* Hero Section - ללא חיצים */}
            <section className="relative h-screen w-full overflow-hidden bg-black">
                <div className="absolute inset-0">
                    {heroImages.map((image, index) => (
                        <div key={index} className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
                            <img src={image} alt="Hero" className="w-full h-full object-cover opacity-60" />
                        </div>
                    ))}
                </div>

                <div className="relative h-full flex flex-col items-center justify-center text-white px-6 text-center">
                    <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter drop-shadow-2xl">
                        ELIYA <span className="text-blue-500">VIP</span>
                    </h1>
                    <p className="text-xl md:text-3xl font-light max-w-3xl leading-relaxed drop-shadow-md">
                        {t.hero_subtitle}
                    </p>
                    <button onClick={() => scrollToSection('cta-section')} className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-xl">
                        {t.hero_cta}
                    </button>
                </div>
            </section>

            {/* About Section */}
            <section id="about" ref={aboutRef} className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    <div className={`space-y-8 transition-all duration-1000 ${isAboutVisible ? 'translate-x-0 opacity-100' : (lang === 'he' ? 'translate-x-20' : '-translate-x-20') + ' opacity-0'}`}>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                            {t.about_title} <br />
                            <span className="text-blue-600">{t.about_subtitle}</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed italic">
                            {t.about_description}
                        </p>

                        {/* גריד שירותים - החזרת העיצוב המקורי עם הריווח החדש */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                            {[
                                { icon: <Users size={28} />, title: t.service_tourists, color: 'bg-orange-50 text-orange-600' },
                                { icon: <Mic size={28} />, title: t.service_artists, color: 'bg-blue-50 text-blue-600' },
                                { icon: <Briefcase size={28} />, title: t.service_business, color: 'bg-green-50 text-green-600' },
                                { icon: <Plane size={28} />, title: t.service_airport, color: 'bg-purple-50 text-purple-600' },
                                { icon: <Heart size={28} />, title: t.service_weddings, color: 'bg-pink-50 text-pink-600' }
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`${item.color} p-8 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-all hover:scale-105`}
                                >
                                    <div className="mb-4">{item.icon}</div>
                                    <span className="font-bold text-lg">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={`relative transition-all duration-1000 delay-300 ${isAboutVisible ? 'translate-x-0 opacity-100' : (lang === 'he' ? '-translate-x-20' : 'translate-x-20') + ' opacity-0'}`}>
                        <div className="absolute -inset-4 bg-blue-600/10 rounded-3xl -rotate-3"></div>
                        <img src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/25c9ae3fa_WhatsAppImage2025-07-04at110058AM.jpg" alt="About" className="relative rounded-2xl shadow-2xl w-full object-cover" />
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section id="cta-section" className="bg-gray-50 py-16 px-6 text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">{t.cta_title}</h3>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">{t.cta_description}</p>
                <a href="https://wa.me/message/C4XMLFWCJIHPB1" target="_blank" rel="noreferrer" className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg">
                    {t.cta_whatsapp}
                </a>
            </section>
        </div>
    );
}