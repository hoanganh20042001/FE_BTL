import React from 'react';
import Navbar from '../component/general/navbar'
import Footer from '../component/general/footer'
import Cart from '../component/user/cart'

export default function CartPage() {
    return <div className="cart-page-container">
        <Navbar />
        <Cart />
        <Footer />
    </div>
}