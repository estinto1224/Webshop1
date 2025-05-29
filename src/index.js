import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import ShopPage from './webshop';
import ShopPage2 from './webshop2';
import ShopPage3 from './webshop3';
import ShopPage4 from './webshop4';
import AdminPage from './admin/AdminPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/Webshop1">
      <Routes>
        <Route path="/" element={<Navigate to="/shop4" replace />} />
        <Route path="/shop2" element={<ShopPage2 />} />
        <Route path="/shop3" element={<ShopPage3 />} />
        <Route path="/shop4" element={<ShopPage4 />} />
        <Route path="/admin/*" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
); 