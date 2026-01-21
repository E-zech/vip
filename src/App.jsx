import React, { useContext, useEffect } from 'react';
import { GeneralProvider, GeneralContext } from './context/GeneralContext';
import Router from './Router';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// רכיב קטן שאחראי רק על הפיכת כיוון האתר (RTL/LTR)
const DirectionHandler = () => {
    const { lang } = useContext(GeneralContext);

    useEffect(() => {
        document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
    }, [lang]);

    return null; // הוא לא מרנדר כלום למסך, רק מריץ את הלוגיקה
};

export default function App() {
    return (
        <GeneralProvider>
            <DirectionHandler />
            <div className="min-h-screen bg-white flex flex-col">
                <Navbar />
                <main className="flex-grow">
                    <Router />
                </main>
                <Footer />
            </div>
        </GeneralProvider>
    );
}