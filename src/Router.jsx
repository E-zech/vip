import React from 'react'; // הוספת הייבוא הזה פותרת את השגיאה הראשונה
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home'; // טוענים את דף הבית, לא את App
import Gallery from './pages/Gallery/Gallery';

export default function Router() {
    return (
        <Routes>
            {/* הנתיב הראשי צריך להציג את דף הבית */}
            <Route path="/" element={<Home />} />
            <Route path="/gallery" element={<Gallery />} />
        </Routes>
    );
}