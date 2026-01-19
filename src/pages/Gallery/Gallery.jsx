import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const albums = [
    {
        title: 'וואן',
        description: 'תמונות הרכב חוץ ופנים - חווית נסיעה בסטנדרט אחר',
        cover: '/album1/1.jpeg',
        images: [
            { src: '/album1/1.jpeg', caption: 'כורסאות רחבות ונוחות לנסיעות ממושכות', alt: 'פנים הרכב - כורסאות VIP רחבות' },
            { src: '/album1/2.jpeg', caption: '', alt: 'מבט פנימי על רכב המרצדס' },
            { src: '/album1/3.jpeg', caption: 'כורסאת נוסע ליד הנהג מתאימה לאנשים גבוהים/מדריכים', alt: 'מושב קדמי מרווח ליד הנהג' },
            { src: '/album1/4.jpeg', caption: 'פנים הרכב עם תאורת לילה', alt: 'תאורת אווירה לילית בתוך הרכב' },
            { src: '/album1/6.jpeg', caption: 'פרופיל חיצוני', alt: 'מבט צד חיצוני על המרצדס' },
            { src: '/album1/7.png', caption: 'פרופיל אחורי', alt: 'מבט מאחור על הרכב' },
            { src: '/album1/8.png', caption: '', alt: 'פרטי עיצוב חיצוניים' },
            { src: '/album1/9.png', caption: 'קדמת הרכב', alt: 'מבט חזיתי על הרכב' },
            { src: '/album1/10.jpeg', caption: '', alt: 'תמונת אווירה נוספת של הרכב' },
            { src: '/album1/11.jpeg', caption: '', alt: 'נוחות נסיעה ברכב VIP' },
        ],
    },
    {
        title: 'טיולים',
        description: 'תמונות מהארץ היפה שלנו',
        cover: '/album2/תמנע.jpg',
        images: [
            { src: '/album2/תמנע.jpg', caption: 'פארק תמנע', alt: 'טיול VIP בפארק תמנע' },
            { src: '/album2/קיבוץפורד.jpg', caption: 'קיבוץ פורד', alt: 'ביקור בקיבוץ פורד' },
            { src: '/album2/מלוןנבלדוד.jpg', caption: 'מלון נבל דוד', alt: 'הסעה למלון נבל דוד' },
            { src: '/album2/מצפה רמון.jpg', caption: 'מצפה רמון', alt: 'נסיעה למצפה רמון' },
            { src: '/album2/מרכזוידור.jpg', caption: 'מרכז ויידור', alt: 'ביקור במרכז ויידור' },
            { src: '/album2/עין השופט.jpg', caption: 'קיבוץ עין השופט', alt: 'נופים בקיבוץ עין השופט' },
            { src: '/album2/קיבוץלוטן.jpg', caption: 'קיבוץ לוטן', alt: 'הסעה לקיבוץ לוטן' },
        ],
    }
];

export default function Gallery() {
    const [isOpen, setIsOpen] = useState(false);
    const [currentAlbum, setCurrentAlbum] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openAlbum = (album) => {
        setCurrentAlbum(album);
        setCurrentIndex(0);
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const close = () => {
        setIsOpen(false);
        document.body.style.overflow = 'auto';
    };

    const next = () => setCurrentIndex((i) => (i + 1) % currentAlbum.images.length);
    const prev = () => setCurrentIndex((i) => (i - 1 + currentAlbum.images.length) % currentAlbum.images.length);

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
                    <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
                    {albums.map((album, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -8 }}
                            onClick={() => openAlbum(album)}
                            className="group cursor-pointer bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500"
                        >
                            <div className="relative h-80 overflow-hidden">
                                <img
                                    src={album.cover}
                                    alt={album.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
                            </div>
                            <div className="p-8 text-right">
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">{album.title}</h3>
                                <p className="text-gray-500 font-medium leading-relaxed">{album.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <AnimatePresence>
                {isOpen && currentAlbum && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={close}
                        className="fixed inset-0 bg-black/95 z-[110] flex items-center justify-center p-4 backdrop-blur-md"
                    >
                        {/* כפתור סגירה */}
                        <button onClick={close} className="absolute top-6 left-6 text-white/70 hover:text-white transition-colors z-[120]">
                            <X size={40} />
                        </button>

                        {/* חצים */}
                        <button onClick={(e) => { e.stopPropagation(); prev(); }} className="absolute right-4 md:right-10 z-[120] text-white/50 hover:text-white transition-all">
                            <ChevronRight size={60} />
                        </button>
                        <button onClick={(e) => { e.stopPropagation(); next(); }} className="absolute left-4 md:left-10 z-[120] text-white/50 hover:text-white transition-all">
                            <ChevronLeft size={60} />
                        </button>

                        {/* תמונה וכיתוב */}
                        <div className="relative max-w-5xl w-full flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
                            <div className="relative overflow-hidden rounded-lg shadow-2xl border border-white/10">
                                <motion.img
                                    key={currentIndex}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    src={currentAlbum.images[currentIndex].src}
                                    alt={currentAlbum.images[currentIndex].alt}
                                    className="max-h-[80vh] w-auto block"
                                />

                                {/* כאן השינוי ל-1.5rem (text-2xl) */}
                                {currentAlbum.images[currentIndex].caption && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent p-6">
                                        <p className="text-white text-2xl font-bold text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-tight">
                                            {currentAlbum.images[currentIndex].caption}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* מונה תמונות בתחתית */}
                            <div className="mt-6 text-white/60 font-medium text-lg">
                                {currentIndex + 1} / {currentAlbum.images.length}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}