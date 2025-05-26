import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="header-container">
      <div className="logo">
        <Link to="/">WebShop</Link>
      </div>
      <div className="shop-links">
        <Link to="/shop/lostark" className="shop-link">로스트아크</Link>
        <Link to="/shop/maplestory" className="shop-link">메이플스토리</Link>
        <Link to="/shop/diablo" className="shop-link">디아블로</Link>
        <Link to="/shop/lineage" className="shop-link">리니지</Link>
      </div>
      <nav className="nav-links">
        <Link to="/login">로그인</Link>
        <Link to="/register">회원가입</Link>
        <Link to="/cart">장바구니</Link>
      </nav>
    </div>
  );
};

export default Header; 