import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import CategoryManagement from './CategoryManagement';
import ProductManagement from './ProductManagement';
import BannerManagement from './BannerManagement';
import AddShop from './AddShop';
import { HiChevronDown, HiChevronRight } from 'react-icons/hi';

const AdminPage = () => {
  const navigate = useNavigate();
  const [selectedShop, setSelectedShop] = useState('home');
  const [expandedShops, setExpandedShops] = useState({});
  const userRole = 'admin'; // 실제로는 로그인 시 설정되어야 함

  const shops = {
    home: {
      name: '피망 웹상점(홈)',
      roles: ['admin', 'home_manager'],
      path: '/admin/home'
    },
    newmajgo: {
      name: '뉴맞고 웹상점',
      roles: ['admin', 'newmajgo_manager'],
      path: '/admin/newmajgo'
    },
    poker: {
      name: '포커 웹상점',
      roles: ['admin', 'poker_manager'],
      path: '/admin/poker'
    }
  };

  const hasAccess = (shop) => {
    return shop.roles.includes(userRole);
  };

  const handleShopChange = (shopKey) => {
    setSelectedShop(shopKey);
    setExpandedShops(prev => ({
      ...prev,
      [shopKey]: !prev[shopKey]
    }));
    navigate(shops[shopKey].path);
  };

  const toggleShopMenu = (shopKey) => {
    setExpandedShops(prev => ({
      ...prev,
      [shopKey]: !prev[shopKey]
    }));
  };

  const handleAddShop = () => {
    navigate('/admin/add-shop');
  };

  const handleAdminHomeClick = () => {
    navigate('/admin/'); // 홈 페이지로 이동
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* 왼쪽 사이드바 */}
        <div className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0">
          <div className="p-4 border-b">
            <h1 
              className="text-xl font-bold cursor-pointer" 
              onClick={handleAdminHomeClick} // 클릭 시 홈 페이지로 이동
            >
              웹상점 관리자
            </h1>
          </div>
          
          {/* 웹상점 선택 메뉴 */}
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-2">웹상점 선택</h2>
            <div className="space-y-1">
              {Object.entries(shops).map(([key, shop]) => (
                hasAccess(shop) && (
                  <div key={key} className="space-y-1">
                    <button
                      onClick={() => toggleShopMenu(key)}
                      className={`w-full text-left px-4 py-2 rounded flex items-center justify-between ${
                        selectedShop === key
                          ? 'bg-blue-500 text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <span>{shop.name}</span>
                      {expandedShops[key] ? <HiChevronDown size={20} /> : <HiChevronRight size={20} />}
                    </button>
                    
                    {/* 하위 메뉴 */}
                    {expandedShops[key] && (
                      <div className="pl-4 space-y-1">
                        <Link
                          to={`${shop.path}/categories`}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                        >
                          카테고리 관리
                        </Link>
                        <Link
                          to={`${shop.path}/products`}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                        >
                          상품 관리
                        </Link>
                        <Link
                          to={`${shop.path}/banners`}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded text-sm"
                        >
                          배너 관리
                        </Link>
                      </div>
                    )}
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        {/* 메인 컨텐츠 영역 */}
        <div className="ml-64 flex-1 p-6">
          <div className="flex justify-end mb-4">
            <button onClick={handleAddShop} className="bg-blue-500 text-white px-4 py-2 rounded">
              상점 관리
            </button>
          </div>
          <Routes>
            <Route path="/" element={
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-4">웹상점을 선택해주세요</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(shops).map(([key, shop]) => (
                    hasAccess(shop) && (
                      <button
                        key={key}
                        onClick={() => handleShopChange(key)}
                        className="p-4 border rounded-lg hover:bg-gray-50"
                      >
                        <h3 className="text-lg font-semibold">{shop.name}</h3>
                      </button>
                    )
                  ))}
                </div>
              </div>
            } />
            <Route path="/home/*" element={
              hasAccess(shops.home) ? (
                <Routes>
                  <Route path="categories" element={<CategoryManagement shop="home" />} />
                  <Route path="products" element={<ProductManagement shop="home" />} />
                  <Route path="banners" element={<BannerManagement shop="home" />} />
                </Routes>
              ) : (
                <div className="text-center text-red-500">
                  접근 권한이 없습니다.
                </div>
              )
            } />
            <Route path="/newmajgo/*" element={
              hasAccess(shops.newmajgo) ? (
                <Routes>
                  <Route path="categories" element={<CategoryManagement shop="newmajgo" />} />
                  <Route path="products" element={<ProductManagement shop="newmajgo" />} />
                  <Route path="banners" element={<BannerManagement shop="newmajgo" />} />
                </Routes>
              ) : (
                <div className="text-center text-red-500">
                  접근 권한이 없습니다.
                </div>
              )
            } />
            <Route path="/poker/*" element={
              hasAccess(shops.poker) ? (
                <Routes>
                  <Route path="categories" element={<CategoryManagement shop="poker" />} />
                  <Route path="products" element={<ProductManagement shop="poker" />} />
                  <Route path="banners" element={<BannerManagement shop="poker" />} />
                </Routes>
              ) : (
                <div className="text-center text-red-500">
                  접근 권한이 없습니다.
                </div>
              )
            } />
            <Route path="/add-shop" element={<AddShop />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminPage; 