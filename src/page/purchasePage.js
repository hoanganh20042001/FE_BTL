import React from 'react';
import Navbar from '../component/general/navbar'
import Footer from '../component/general/footer'
import Purch from '../component/user/purcharse'

export default function PurchPage() {
    return <div className="cart-page-container">
        <Navbar />
        <Purch />
        <Footer />
    </div>
}