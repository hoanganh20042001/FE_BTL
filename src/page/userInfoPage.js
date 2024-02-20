import React from 'react';
import Navbar from '../component/general/navbar'
import Footer from '../component/general/footer'
import UserInfo from '../component/user/userInfo';

export default function UserInfoPage() {
    return <>
        <Navbar />
        <UserInfo />
        <Footer />
    </>
}