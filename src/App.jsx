import React from 'react';
import { GeneralProvider } from './context/GeneralContext';
import Router from './Router';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';


export default function App() {
    return (
        // ה-Provider מאפשר לכל רכיב באתר לגשת למידע גלובלי (כמו פונקציית הגלילה)
        <GeneralProvider>
            <div className="min-h-screen bg-white flex flex-col" style={{ direction: 'rtl' }}>

                {/* ה-Navbar קבוע בראש האתר */}
                <Navbar />

                {/* ה-main מקבל את התוכן המשתנה של הדפים דרך ה-Router */}
                <main className="flex-grow">
                    <Router />
                </main>

                {/* ה-Footer קבוע בתחתית האתר */}
                <Footer />

            </div>
        </GeneralProvider>
    );
}