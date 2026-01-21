import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { translations } from '../translation'; // ייבוא ללא S כפי שביקשת

export const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
    const navigate = useNavigate();

    // ניהול שפה
    const [lang, setLang] = useState('he');
    const t = translations[lang];

    // פונקציית גלילה משופרת
    const scrollToSection = (sectionId) => {
        if (window.location.pathname !== '/') {
            navigate('/');
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                element?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        } else {
            const element = document.getElementById(sectionId);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // פונקציית החלפת שפה (Toggle)
    const toggleLang = () => {
        const newLang = lang === 'he' ? 'en' : 'he';
        setLang(newLang);
        // עדכון מאפייני ה-HTML של הדפדפן (כיוון ושפה)
        document.documentElement.dir = newLang === 'he' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLang;
    };

    const value = {
        scrollToSection,
        navigate,
        lang,     // השפה הנוכחית ('he' או 'en')
        setLang,  // פונקציה לעדכון ישיר אם צריך
        toggleLang, // פונקציית ה-Toggle לכפתור ב-Navbar
        t         // האובייקט עם התרגומים הנוכחיים
    };

    return (
        <GeneralContext.Provider value={value}>
            {children}
        </GeneralContext.Provider>
    );
};