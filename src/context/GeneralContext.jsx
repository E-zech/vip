import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
    const navigate = useNavigate();

    // סנכרון גלילה - אם אנחנו בדף אחר, קודם חוזרים הביתה
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

    const value = {
        scrollToSection,
        navigate,
        // כאן נוסיף בהמשך את הלוגיקה של שליפת התמונות מה-DB
    };

    return (
        <GeneralContext.Provider value={value}>
            {children}
        </GeneralContext.Provider>
    );
};