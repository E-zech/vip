import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram } from 'lucide-react';

export default function Footer() {
    return (
        <footer id="contact" className="bg-gray-900 text-white pt-16 pb-8 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-right">

                {/* עמודה 1: פרטי קשר */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 inline-block">צור קשר</h3>
                    <div className="space-y-3 pt-4">
                        <a href="tel:0549223745" className="flex items-center justify-end gap-3 hover:text-blue-400">
                            <span>054-9223745</span>
                            <Phone size={20} className="text-blue-500" />
                        </a>
                        <a href="mailto:eliyaz2024@gmail.com" className="flex items-center justify-end gap-3 hover:text-blue-400">
                            <span>eliyaz2024@gmail.com</span>
                            <Mail size={20} className="text-blue-500" />
                        </a>
                        <div className="flex items-center justify-end gap-3">
                            <span>הרצליה, ישראל</span>
                            <MapPin size={20} className="text-blue-500" />
                        </div>
                    </div>
                </div>

                {/* עמודה 2: שירותים */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 inline-block">השירותים שלנו</h3>
                    <ul className="space-y-2 pt-4 text-gray-400">
                        <li>הסעות VIP לאמנים</li>
                        <li>נסיעות עסקים ומשלחות</li>
                        <li>שירות VIP לנתב"ג</li>
                        <li>הסעות לאירועים מיוחדים</li>
                    </ul>
                </div>

                {/* עמודה 3: רשתות חברתיות */}
                <div className="space-y-4">
                    <h3 className="text-2xl font-bold border-b-2 border-blue-500 pb-2 inline-block">עקבו אחרינו</h3>
                    <div className="flex justify-end gap-4 pt-4">
                        <a href="#" className="bg-pink-600 p-3 rounded-full hover:scale-110 transition-transform">
                            <Instagram size={24} />
                        </a>
                        <a href="#" className="bg-blue-600 p-3 rounded-full hover:scale-110 transition-transform">
                            <Facebook size={24} />
                        </a>
                    </div>
                </div>
            </div>

            <div className="mt-16 border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
                <p>© 2025 אליה הסעות VIP. כל הזכויות שמורות.</p>
                <p className="mt-2">Built with React & Tailwind</p>
            </div>
        </footer>
    );
}