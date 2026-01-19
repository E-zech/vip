import React, { useState, useEffect, useRef, useContext } from 'react';
import { Mic, Briefcase, Plane, ChevronLeft, ChevronRight } from 'lucide-react';
import { GeneralContext } from '../../context/GeneralContext';

export default function Home() {
    const { scrollToSection } = useContext(GeneralContext);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAboutVisible, setIsAboutVisible] = useState(false);
    const aboutRef = useRef(null);

    const heroImages = [
        '/images/1.jpeg',
        '/images/3.jpeg',
        '/images/4.jpeg',
    ];

    // סליידר אוטומטי - רץ כל 3.5 שניות
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 3500);
        return () => clearInterval(interval);
    }, [heroImages.length]);

    // Intersection Observer לאנימציית כניסה של ה-"אודות"
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsAboutVisible(true);
                }
            },
            { threshold: 0.2 }
        );

        if (aboutRef.current) observer.observe(aboutRef.current);
        return () => observer.disconnect();
    }, []);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

    return (
        <div className="w-full">
            {/* --- Hero Section --- */}
            <section className="relative h-screen w-full overflow-hidden bg-black">
                {/* Images Container */}
                <div className="absolute inset-0">
                    {heroImages.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <img
                                src={image}
                                alt={`Hero ${index}`}
                                className="w-full h-full object-cover opacity-60"
                            />
                        </div>
                    ))}
                </div>

                {/* Hero Content */}
                <div className="relative h-full flex flex-col items-center justify-center text-white px-6 text-center">
                    <h1 className="text-5xl md:text-8xl font-black mb-6 tracking-tighter drop-shadow-2xl">
                        ELIYA <span className="text-blue-500">VIP</span>
                    </h1>
                    <p className="text-xl md:text-3xl font-light max-w-2xl leading-relaxed drop-shadow-md">
                        שירותי הסעות יוקרה לאמנים, אנשי עסקים ונתב"ג בסטנדרט הגבוה ביותר.
                    </p>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold transition-all transform hover:scale-105 shadow-xl"
                    >
                        להזמנת נסיעה
                    </button>
                </div>

                {/* Slider Controls (חצים) */}
                <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
                    <ChevronLeft size={48} />
                </button>
                <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors">
                    <ChevronRight size={48} />
                </button>
            </section>

            {/* --- About Section --- */}
            <section id="about" ref={aboutRef} className="py-24 px-6 bg-white overflow-hidden">
                <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

                    {/* טקסט אודות */}
                    <div className={`space-y-8 transition-all duration-1000 ${isAboutVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'}`}>
                        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
                            חווית הנסיעה שלך <br />
                            <span className="text-blue-600">מתחילה כאן.</span>
                        </h2>
                        <p className="text-lg text-gray-600 leading-relaxed italic">
                            "כל נסיעה מותאמת לצרכים שלכם עם רכב מפנק, כורסאות נוחות וחוויה יוקרתית מהרגע הראשון. מה שנשאר לכם זה ליהנות מהדרך..."
                        </p>

                        {/* כרטיסי שירותים */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                            {[
                                { icon: <Mic />, title: 'הסעות אמנים', color: 'bg-blue-50 text-blue-600' },
                                { icon: <Briefcase />, title: 'אנשי עסקים', color: 'bg-green-50 text-green-600' },
                                { icon: <Plane />, title: 'נתב"ג VIP', color: 'bg-purple-50 text-purple-600' }
                            ].map((item, idx) => (
                                <div key={idx} className={`${item.color} p-6 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow`}>
                                    <div className="mb-3">{item.icon}</div>
                                    <span className="font-bold">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* תמונת אודות */}
                    <div className={`relative transition-all duration-1000 delay-300 ${isAboutVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0'}`}>
                        <div className="absolute -inset-4 bg-blue-600/10 rounded-3xl -rotate-3"></div>
                        <img
                            src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/25c9ae3fa_WhatsAppImage2025-07-04at110058AM.jpg"
                            alt="אליה VIP הסעות"
                            className="relative rounded-2xl shadow-2xl w-full object-cover"
                        />
                    </div>
                </div>
            </section>

            {/* --- Call to Action --- */}
            <section className="bg-gray-50 py-16 px-6 text-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-4">מוכנים לצאת לדרך?</h3>
                <p className="text-gray-600 mb-8 max-w-xl mx-auto">צרו איתנו קשר עוד היום לתיאום נסיעה יוקרתית ומותאמת אישית.</p>
                <a
                    href="https://wa.me/message/C4XMLFWCJIHPB1"
                    target="_blank"
                    className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-10 rounded-full transition-all shadow-lg"
                >
                    שלחו הודעה ב-WhatsApp
                </a>
            </section>
        </div>
    );
}