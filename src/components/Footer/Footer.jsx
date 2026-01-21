import React, { useContext, useEffect, useState, useRef } from 'react';
import { Phone, Mail, MapPin, Star } from 'lucide-react';
import { GeneralContext } from '../../context/GeneralContext';

export default function Footer() {
    const { t, lang } = useContext(GeneralContext);
    const isHe = lang === 'he';
    const footerRef = useRef(null);
    const [shouldAnimate, setShouldAnimate] = useState(false);

    const googleReviewLink = "https://share.google/vwc0uJudSYyFwQDVr";

    // זיהוי גלילה לפוטר להפעלת האנימציה
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setShouldAnimate(true);
                    // מפסיקים את האנימציה אחרי שהיא רצה פעמיים (נגיד 2 שניות)
                    setTimeout(() => setShouldAnimate(false), 2000);
                }
            },
            { threshold: 0.5 }
        );

        if (footerRef.current) observer.observe(footerRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <footer id="contact" ref={footerRef} className="bg-[#0f172a] text-white py-16 px-6 border-t border-gray-800">
            <style>
                {`
                @keyframes silver-shine {
                    0% { transform: translateX(-150%) skewX(-30deg); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateX(150%) skewX(-30deg); opacity: 0; }
                }

                .star-container {
                    position: relative;
                    overflow: hidden;
                    display: inline-block;
                    border-radius: 4px;
                }

                /* במצב רגיל אין הברקה - opacity 0 */
                .star-container::after {
                    content: "";
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(
                        to right, 
                        transparent, 
                        rgba(255, 255, 255, 0.9), 
                        transparent
                    );
                    opacity: 0;
                    pointer-events: none;
                }

                /* הפעלה בזמן גלילה (שתי הרצות) */
                .animate-on-scroll .star-container::after {
                    animation: silver-shine 1s ease-in-out 2;
                }

                /* הפעלה בזמן הובר (אינסופי) */
                .group:hover .star-container::after {
                    animation: silver-shine 1s ease-in-out infinite;
                }
                `}
            </style>

            <div className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 ${isHe ? 'text-right' : 'text-left'}`}>

                {/* עמודה 1: צור קשר */}
                <div className="flex flex-col">
                    <h3 className="text-2xl font-bold mb-2 relative pb-2 inline-block border-b-4 border-blue-600 self-start md:self-auto">
                        {t.footer_contact}
                    </h3>
                    <div className="space-y-4 mt-6 w-full">
                        <a href="tel:+972549223745" className="flex items-center gap-3 group transition-all duration-300 hover:scale-105 justify-start">
                            <Phone size={20} className="text-blue-500 shrink-0" />
                            <span className="text-gray-400 group-hover:text-white transition-colors font-medium" dir="ltr">054-9223745</span>
                        </a>
                        <a href="mailto:eliyaz2024@gmail.com" className="flex items-center gap-3 group transition-all duration-300 hover:scale-105 justify-start">
                            <Mail size={20} className="text-blue-500 shrink-0" />
                            <span className="text-gray-400 group-hover:text-white transition-colors font-medium">eliyaz2024@gmail.com</span>
                        </a>
                        <a href="https://share.google/v53rRlBs9bvCHbueO" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group transition-all duration-300 hover:scale-105 justify-start">
                            <MapPin size={20} className="text-blue-500 shrink-0" />
                            <span className="text-gray-400 group-hover:text-white transition-colors font-medium">{t.footer_location_text}</span>
                        </a>
                    </div>
                </div>

                {/* עמודה 2: השירותים שלנו */}
                <div className="flex flex-col">
                    <h3 className="text-2xl font-bold mb-2 relative pb-2 inline-block border-b-4 border-blue-600 self-start md:self-auto">
                        {t.footer_services}
                    </h3>
                    <ul className="space-y-3 mt-6 text-gray-400">
                        {[t.service_tourists, t.service_artists, t.service_business, t.service_airport, t.service_weddings].map((service, idx) => (
                            <li key={idx} className="hover:text-white transition-colors cursor-default">{service}</li>
                        ))}
                    </ul>
                </div>

                {/* עמודה 3: המלצות */}
                <div className="flex flex-col items-center space-y-4">
                    <h3 className="text-2xl font-bold mb-2 text-white">{t.footer_reviews}</h3>

                    <a
                        href={googleReviewLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex flex-col items-center gap-2 p-4 transition-transform duration-300 hover:scale-110 ${shouldAnimate ? 'animate-on-scroll' : ''}`}
                    >
                        <div className="flex gap-2">
                            {[1, 2].map((s) => (
                                <div key={s} className="star-container">
                                    <Star size={28} className="text-yellow-500 fill-yellow-500" />
                                </div>
                            ))}
                        </div>

                        <div className="flex gap-2">
                            {[1, 2, 3].map((s) => (
                                <div key={s} className="star-container">
                                    <Star size={28} className="text-yellow-500 fill-yellow-500" />
                                </div>
                            ))}
                        </div>
                    </a>

                    <span className="text-sm text-slate-400 text-center animate-pulse">
                        {t.footer_rate_us}
                    </span>
                </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                <p>© {new Date().getFullYear()} {t.footer_rights}</p>
            </div>
        </footer>
    );
}