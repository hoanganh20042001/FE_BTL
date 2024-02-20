import React from 'react';
import Navbar from '../component/general/navbar'
import Footer from '../component/general/footer'
import Detail from '../component/user/detail'
import "../css/detail.css";

export default function DetailPage() {
    return <div className="detail-container">
        <Navbar />
        <Detail />
        <Footer />
    </div>
}