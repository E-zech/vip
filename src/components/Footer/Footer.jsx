import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Star } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contact" className="bg-[#0f172a] text-white py-16 px-6 border-t border-gray-800">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-right" style={{ direction: 'rtl' }}>

                {/* צור קשר */}
                <div className="flex flex-col items-start md:items-start">
                    <h3 className="text-2xl font-bold mb-2 relative pb-2 inline-block border-b-4 border-blue-600">
                        צור קשר
                    </h3>
                    <div className="space-y-4 mt-6 w-full">

                        {/* קישור לטלפון */}
                        <a
                            href="tel:+972549223745"
                            className="flex items-center justify-start gap-3 group cursor-pointer transition-all duration-300 hover:scale-105 origin-right"
                        >
                            <Phone size={20} className="text-blue-500 shrink-0 transition-transform group-hover:rotate-12" />
                            <span className="text-gray-400 group-hover:text-white transition-colors font-medium">054-9223745</span>
                        </a>

                        {/* קישור לאימייל */}
                        <a
                            href="mailto:eliyaz2024@gmail.com"
                            className="flex items-center justify-start gap-3 group cursor-pointer transition-all duration-300 hover:scale-105 origin-right"
                        >
                            <Mail size={20} className="text-blue-500 shrink-0 transition-transform group-hover:-translate-y-1" />
                            <span className="text-gray-400 group-hover:text-white transition-colors font-medium">eliyaz2024@gmail.com</span>
                        </a>

                        {/* קישור למיקום (Google Maps) */}
                        <a
                            href="https://share.google/v53rRlBs9bvCHbueO"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-start gap-3 group cursor-pointer transition-all duration-300 hover:scale-105 origin-right"
                        >
                            <MapPin size={20} className="text-blue-500 shrink-0 transition-transform group-hover:bounce" />
                            <span className="text-gray-400 group-hover:text-white transition-colors font-medium">הרצליה, ישראל</span>
                        </a>

                    </div>
                </div>

                {/* השירותים שלנו */}
                <div className="flex flex-col items-start">
                    <h3 className="text-2xl font-bold mb-2 relative pb-2 inline-block border-b-4 border-blue-600">
                        השירותים שלנו
                    </h3>
                    <ul className="space-y-3 mt-6 text-gray-400">
                        <li className="hover:text-white transition-colors">תיירים</li>
                        <li className="hover:text-white transition-colors">הסעות אמנים</li>
                        <li className="hover:text-white transition-colors">נסיעות עסקיות</li>
                        <li className="hover:text-white transition-colors">שירותי הסעות לנתב"ג</li>
                        <li className="hover:text-white transition-colors">חתונות</li>
                    </ul>
                </div>

                {/* עקבו אחרינו */}
                <div className="flex flex-col items-center space-y-4">
                    <h3 className="text-xl font-bold mb-2 text-gold-400">המלצות</h3>
                    <div className="flex gap-4">
                        <a
                            href="https://share.google/BCQqUqRkYVA5tuAdp"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-3 bg-white/10 rounded-full hover:bg-gold-500/20 hover:text-gold-400 transition-all flex items-center justify-center"
                            title="כתבו לנו ביקורת בגוגל"
                        >
                            <Star size={24} className="text-yellow-500 fill-yellow-500" />
                        </a>
                    </div>
                    <span className="text-sm text-slate-400">לחצו כדי לדרג אותנו בגוגל</span>
                </div>

            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                <p>© 2026 אליה הסעות VIP. כל הזכויות שמורות.</p>
            </div>
        </footer>
    );
}

