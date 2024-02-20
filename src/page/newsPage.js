import React from 'react';
import Navbar from '../component/general/navbar'
import Footer from '../component/general/footer'
import News from '../component/user/news';

export default function NewsPage() {
    return <>
        <Navbar />
        <News />
        <Footer />
    </>
}