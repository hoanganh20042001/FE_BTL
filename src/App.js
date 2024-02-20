import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PurchPage from './page/purchasePage';
import HomePage from "./page/homePage";
import CartPage from './page/cartPage';
import ContactPage from './page/contactPage';
import DetailPage from './page/detailPage';
import IntroPage from './page/introPage';
import NewsPage from './page/newsPage';
import SignupPage from './page/signupPage';
import SigninPage from './page/signinPage';
import ProductsPage from './page/productsPage';
import PaymentPage from './page/paymentPage';
import UserInfoPage from './page/userInfoPage';
import DetailAdminPage from './page/admin/detailPage';
import MemberAdminPage from './page/admin/memberPage';
import NewsAdminPage from './page/admin/newsPage';
import OrdersAdminPage from './page/admin/ordersPage';
import ProductsAdminPage from './page/admin/productsPage';
import ScrollToTop from './component/general/scrollToTop';
import  Dashboard  from './page/admin/dashboard';
import { PaymentItemsContext } from './component/general/paymentItemsContext';

function App() {
  const [paymentItems, setPaymentItems] = React.useState([]);

  return (
    <PaymentItemsContext.Provider value={[paymentItems, setPaymentItems]}>
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<HomePage />} exact />
            <Route path="/purch" element={<PurchPage />} exact />
            <Route path="/cart" element={<CartPage />} exact />
            <Route path="/products" element={<ProductsPage />} exact />
            <Route path="/contact" element={<ContactPage />} exact />
            <Route path="/detail/:id" element={<DetailPage />} exact />
            <Route path="/introduction" element={<IntroPage />} exact />
            <Route path="/news" element={<NewsPage />} exact />
            <Route path="/signup" element={<SignupPage />} exact />
            <Route path="/signin" element={<SigninPage />} exact />
            <Route path="/payment" element={<PaymentPage />} exact />
            <Route path="/user_info" element={<UserInfoPage />} exact />
            {/* admin */}
            <Route path="/admin/detail/:id" element={<DetailAdminPage />} exact />
            <Route path="/admin/member" element={<MemberAdminPage />} exact />
            <Route path="/admin/news" element={<NewsAdminPage />} exact />
            <Route path="admin/orders" element={<OrdersAdminPage />} exact />
            <Route path="/admin" element={<ProductsAdminPage />} exact />
            <Route path="/admin/dashboard" element={<Dashboard />} exact />
            <Route path="*" element={<h1>Page not found</h1>} />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </PaymentItemsContext.Provider>
  );
}

export default App;
