import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import ShopPage2 from './webshop2';
import ShopPage3 from './webshop3';
import ShopPage4 from './webshop4';
import AdminPage from './admin/AdminPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<ShopPage4 />} />
        <Route path="/shop2" element={<ShopPage2 />} />
        <Route path="/shop3" element={<ShopPage3 />} />
        <Route path="/shop4" element={<ShopPage4 />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>
); 