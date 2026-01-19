import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// מבנה הנתונים - בהמשך זה יגיע מה-DB (מונגו)
const albums = [
    {
        title: 'הסעות VIP',
        description: 'חווית נסיעה יוקרתית לאמנים ואנשי עסקים',
        cover: '/images/1.jpeg',
        images: ['/images/1.jpeg', '/images/3.jpeg', '/images/4.jpeg'],
    },
    {
        title: 'אירועים',
        description: 'הסעות יוקרה לחתונה ואירועים נוצצים',
        cover: '/images/6.jpeg',
        images: ['/images/6.jpeg', '/images/7.png', '/images/8.png'],
    },
    {
        title: 'שירותי נתב"ג',
        description: 'איסוף ופיזור VIP ישירות מהטרמינל',
        cover: '/images/9.png',
        images: ['/images/9.png', '/images/10.jpeg', '/images/11.jpeg'],
    },
];

export default function Gallery() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentAlbum, setCurrentAlbum] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openAlbum = (album) => {
        setCurrentAlbum(album);
        setCurrentIndex(0);
        setIsOpen(true);
        document.body.style.overflow = 'hidden'; // מניעת גלילה כשהפופ-אפ פתוח
    };

    const close = () => {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
    };

    const next = () => setCurrentIndex((i) => (i + 1) % currentAlbum.images.length);
    const prev = () => setCurrentIndex((i) => (i - 1 + currentAlbum.images.length) % currentAlbum.images.length);

    // שליטה במקלדת
    useEffect(() => {
        const handler = (e) => {
            if (!isOpen) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowRight') next();
            if (e.key === 'ArrowLeft') prev();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isOpen, currentAlbum]);

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-6">
            <div className="max-w-7xl mx-auto">
                <header className="text-center mb-16">
                    <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-4">הגלריה שלנו</h1>
                    <div className="w-24 h-1.5 bg-blue-600 mx-auto rounded-full"></div>
                </header>

                {/* Grid אלבומים */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {albums.map((album, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -10 }} // אפקט ריחוף של Framer Motion
                            onClick={() => openAlbum(album)}
                            className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
                        >
                            {/* תמונת כיסוי */}
                            <div className="relative h-72 overflow-hidden">
                                <img
                                    src={album.cover}
                                    alt={album.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold text-blue-600">
                                    {album.images.length} תמונות
                                </div>
                            </div>

                            {/* פרטי אלבום */}
                            <div className="p-6 text-right">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{album.title}</h3>
                                <p className="text-gray-500 text-sm">{album.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox - Pop-up סליידר */}
            <AnimatePresence>
                {isOpen && currentAlbum && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                        className="fixed inset-0 bg-black/95 z-[100] flex items-center justify-center p-4 backdrop-blur-sm"
                    >
                        {/* כפתור סגירה */}
                        <button
                            onClick={close}
                            className="absolute top-6 left-6 text-white/70 hover:text-white transition-colors z-[110]"
                        >
                            <X size={40} />
                        </button>

                        {/* חץ ימינה (הקודם ב-RTL) */}
                        <button
                            onClick={(e) => { e.stopPropagation(); prev(); }}
                            className="absolute right-4 md:right-10 z-[110] p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                        >
                            <ChevronRight size={32} />
                        </button>

                        {/* תמונה מוצגת */}
                        <div className="relative max-w-5xl w-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
                            <motion.img
                                key={currentIndex}
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -100, opacity: 0 }}
                                src={currentAlbum.images[currentIndex]}
                                className="max-h-[85vh] w-auto rounded-lg shadow-2xl"
                            />

                            {/* מונה תמונות */}
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-white font-medium">
                                {currentIndex + 1} / {currentAlbum.images.length}
                            </div>
                        </div>

                        {/* חץ שמאלה (הבא ב-RTL) */}
                        <button
                            onClick={(e) => { e.stopPropagation(); next(); }}
                            className="absolute left-4 md:left-10 z-[110] p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all"
                        >
                            <ChevronLeft size={32} />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}