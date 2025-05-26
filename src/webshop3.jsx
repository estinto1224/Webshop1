import React, { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { HiSearch } from "react-icons/hi";

const products = {
  1: {
    name: "월구매제한) 황금편자(10일)",
    description: "황금편자 아이템 10일 이용권",
    price: 33000,
    category: "추천",
    subcategory: "이모티콘",
    image: "https://dl.poker.pmang.cloud/upload/ss_deco_offer_goods5_70x110.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/ss_deco_offer_goods5_70x110.png"
  },
  2: {
    name: "황금 골프트로피(7일)",
    description: "황금 골프트로피 아이템 7일 이용권",
    price: 15000,
    category: "추천",
    subcategory: "이모티콘",
    image: "https://dl.poker.pmang.cloud/upload/sales_po_worldcup_15000won.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/sales_po_worldcup_15000won.png"
  },
  3: {
    name: "루비 59개",
    description: "루비 59개 패키지",
    price: 5900,
    category: "루비",
    subcategory: "기본",
    image: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_5900.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_5900.png"
  },
  4: {
    name: "루비 110개",
    description: "루비 110개 패키지",
    price: 11000,
    category: "루비",
    subcategory: "기본",
    image: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_11000.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_11000.png"
  },
  5: {
    name: "루비 223개",
    description: "루비 223개 패키지",
    price: 22000,
    category: "루비",
    subcategory: "기본",
    image: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_22000.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_22000.png"
  },
  6: {
    name: "클래식 잭(15일)",
    description: "클래식 잭 아이템 15일 이용권",
    price: 39000,
    category: "이벤트",
    subcategory: "특별",
    image: "https://dl.poker.pmang.cloud/upload/hotdeal_2501c_332x400.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/hotdeal_2501c_332x400.png"
  },
  7: {
    name: "클래식 잭(30일)",
    description: "클래식 잭 아이템 30일 이용권",
    price: 159000,
    category: "이벤트",
    subcategory: "특별",
    image: "https://dl.poker.pmang.cloud/upload/hotdeal_2501c_332x400.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/hotdeal_2501c_332x400.png"
  },
  8: {
    name: "클래식 잭(20일)",
    description: "클래식 잭 아이템 20일 이용권",
    price: 59000,
    category: "이벤트",
    subcategory: "특별",
    image: "https://dl.poker.pmang.cloud/upload/hotdeal_2501c_332x400.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/hotdeal_2501c_332x400.png"
  },
  9: {
    name: "루비 567개",
    description: "루비 567개 패키지",
    price: 55000,
    category: "루비",
    subcategory: "특별",
    image: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_55000.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_55000.png"
  },
  10: {
    name: "루비 1040개",
    description: "루비 1040개 패키지",
    price: 99000,
    category: "루비",
    subcategory: "특별",
    image: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_99000.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_99000.png"
  },
  11: {
    name: "카우보이(30일)",
    description: "카우보이 이모티콘 30일 이용권",
    price: 99000,
    category: "아이템",
    subcategory: "이모티콘",
    image: "https://dl.poker.pmang.cloud/upload/new_mp_mob_emo_11000_02.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/new_mp_mob_emo_11000_02.png"
  },
  12: {
    name: "비공개(20일)",
    description: "비공개 이모티콘 20일 이용권",
    price: 55000,
    category: "아이템",
    subcategory: "이모티콘",
    image: "https://dl.poker.pmang.cloud/upload/mp_mob_emo_nodisclosure_2406.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/mp_mob_emo_nodisclosure_2406.png"
  },
  13: {
    name: "텍스트콘(15일)",
    description: "텍스트콘 이모티콘 15일 이용권",
    price: 33000,
    category: "아이템",
    subcategory: "이모티콘",
    image: "https://dl.poker.pmang.cloud/upload/new_mp_mob_emo_1200_01.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/new_mp_mob_emo_1200_01.png"
  },
  14: {
    name: "블랙리스트 인원 추가",
    description: "블랙리스트 인원 추가 권한",
    price: 50000,
    category: "아이템",
    subcategory: "소모성 아이템",
    image: "https://dl.poker.pmang.cloud/upload/mp_co_blacklist.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/mp_co_blacklist.png"
  },
  15: {
    name: "별명 변경권",
    description: "별명 변경 권한",
    price: 9900,
    category: "아이템",
    subcategory: "소모성 아이템",
    image: "https://dl.poker.pmang.cloud/upload/name_change_shop.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/name_change_shop.png"
  },
  16: {
    name: "강제 퇴장 4회 제공",
    description: "강제 퇴장 4회 이용권",
    price: 50000,
    category: "아이템",
    subcategory: "소모성 아이템",
    image: "https://dl.poker.pmang.cloud/upload/pc_po_redcard1.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/pc_po_redcard1.png"
  },
  17: {
    name: "행운 카드 뽑기",
    description: "행운 카드 뽑기 이용권",
    price: 12000,
    category: "아이템",
    subcategory: "뽑기",
    image: "https://dl.poker.pmang.cloud/upload/mtpk_mob_cardgacha_new.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/mtpk_mob_cardgacha_new.png"
  },
  19: {
    name: "루비 1639개",
    description: "VIP 전용 상품",
    price: 149000,
    items: ["루비 1639개"],
    category: "VIP",
    image: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_vip_new_149000.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_vip_new_149000.png",
    isVipOnly: true
  }
};

function ProductCard({ id, onDetailClick }) {
  const product = products[id];
  const [showVipAlert, setShowVipAlert] = useState(false);

  const handlePriceClick = () => {
    if (product.isVipOnly) {
      setShowVipAlert(true);
    }
  };

  return (
    <div className="border rounded-lg shadow p-2 flex flex-col h-[280px]">
      <div className="w-full mb-2 flex-shrink-0 relative">
        <img
          src={product.image}
          alt="상품 이미지"
          className="w-full h-[190px] object-contain rounded"
        />
        <button
          onClick={() => onDetailClick(id)}
          className="absolute top-2 right-2 p-2 bg-white/80 hover:bg-white rounded-full shadow transition-colors"
          aria-label="상세보기"
        >
          <HiSearch size={18} />
        </button>
      </div>
      <div className="flex flex-col justify-between flex-grow">
        <h2 className="text-sm font-semibold mb-1">{product.name}</h2>
        <div>
          <button 
            onClick={handlePriceClick}
            className="w-full bg-red-500 hover:bg-red-600 text-white text-lg font-bold py-2 px-4 rounded-lg transition-colors"
          >
            ₩{product.price.toLocaleString()}
          </button>
        </div>
      </div>

      {showVipAlert && (
        <VipAlertModal onClose={() => setShowVipAlert(false)} />
      )}
    </div>
  );
}

function ProductModal({ id, onClose }) {
  const product = products[id];
  const [showPurchaseAlert, setShowPurchaseAlert] = useState(false);
  if (!product) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
        <button className="absolute top-2 right-2 text-gray-500" onClick={onClose}>
          ✕
        </button>
        <div className="aspect-w-1 aspect-h-1 w-full mb-4">
          <img
            src={product.detailImage}
            alt={product.name}
            className="w-full h-[300px] object-contain rounded"
          />
        </div>
        <h2 className="text-xl font-bold mb-2">{product.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">₩{product.price.toLocaleString()}</span>
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => setShowPurchaseAlert(true)}
          >
            구매하기
          </button>
        </div>
      </div>

      {showPurchaseAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4 text-center">구매가 완료되었습니다.</h3>
            <div className="flex justify-center">
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                  setShowPurchaseAlert(false);
                  onClose();
                }}
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function VipAlertModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h3 className="text-lg font-bold mb-4 text-center">VIP 회원만 구매할 수 있는 상품입니다.</h3>
        <div className="flex justify-center">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={onClose}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage3() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const bannerImages = [
    "https://dl.poker.pmang.cloud/upload/pk_webmain_sales_2503_753x306.jpg",
    "https://dl.poker.pmang.cloud/upload/230614_pokerchipmion_main(753x306).jpg"
  ];

  // 카테고리 목록 추출
  const categories = Array.from(new Set(Object.values(products).map(p => p.category)));

  // 카테고리별 상품 그룹핑
  const getFilteredProducts = () => {
    return Object.entries(products).reduce((acc, [id, product]) => {
      if (!acc[product.category]) acc[product.category] = [];
      acc[product.category].push({ id, ...product });
      return acc;
    }, {});
  };
  const filteredProducts = getFilteredProducts();

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  return (
    <div className="p-4 max-w-[1000px] w-full mx-auto relative">
      <nav className="bg-[#ffffff] shadow text-black flex items-center justify-between px-4 py-2 rounded mb-6">
        <div className="flex items-center gap-4">
          <a href="http://m.pmang.com/">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAAAXCAYAAADwSpp8AAACjUlEQVRoge2ZPWgUQRSAv0QPNRqNKTTGJhxaiRZCKgstRCJqY+VPZUoLsdTCJqAgCApBxIAQLEQEwcJCRDvxD0RRFAvFwxBUxHj+oBiikSfvYHjO3c7t7d5tjv3gYN/Mmzfv7duZnX3XMV0szpIs74B7wDHghWN5KVBqcCbx9TVwHrjgtJfUfihvgHFg1NEvA8sCx88AH4CbwFG9Fk4Bw3ECmx9nUASrgN3AJmAt8E3VO4DlCdjvBQaBCb0RQk8dNxH1Y6PewCsxfJD7tho4APQDQ9reFTfGzjiDAlkJbE3R/q4EbOxMwMY2YEGjRiSzRzzth4E+R74G3I+wNQ84qE9Khf4a+q+APY68BrjsyHfUjwoS8AlH7nWuB3TFRTGs24fPhmUL8N3Tvhi4BRRUlnkXAr88uiPAmQC//iXipKd9v0mEbAHnAuytA/Y5cncN3Z/AI0eeNv1fTP+iGrbKAb4JLwP1hCfqg48fgVuhxPg5ZLI03hGtoCdwRSzJagDtkohSnS/rVtCtq8xLuyRiLiAHo2I1P9s1EWX95rAUsro9tWsiBqq8aHcA11vgj/DVOaX993Gbb03NY9Y5Qf2xsyb9QWfLDDMtDn7OELoi5CPoeIROp+fkUu0cnjaHnPqPy/om+7EZmPK099mG0ER06a9enjcURjgfzUMw0qR5LRNGHnLqULWYTLPWdBW4m6J9l6AyQhO4WGUlRnE6dEU8AN5G6PzWk8EnrRPdMP1Swhhz5EnTP2X6n5n+96b/oXN9FngMbAdWBMTjm2PclFFsyYUAXYlpA7BXK8+FKuMrSMy3pXYl/0f4FJ6a/VRqT5cijOY0QJpbU04d5InICHkiMkKeiIyQJyIj5InIAsBfn6Joht8J2PgAAAAASUVORK5CYII="
              alt="홈"
              className="h-5"
            />
          </a>
          <div className="flex items-center gap-2">
            <Link to="/" className="text-sm text-blue-500 hover:text-blue-700">
              피망 웹상점 홈
            </Link>
            <Link to="/shop2" className="text-sm text-blue-500 hover:text-blue-700">
              뉴맞고 웹상점
            </Link>
            <Link to="/shop3" className="text-sm text-blue-500 hover:text-blue-700">
              포커 웹상점
            </Link>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm px-4 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
            로그인
          </button>
          <button
            className="p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <header className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">WebShop</h1>
        </div>
      </header>

      {menuOpen && (
        <div className="absolute right-4 top-20 bg-white border rounded shadow p-4 z-10 w-60">
          <ul className="space-y-1">
            <li className="text-sm text-gray-600">
              마이페이지
            </li>
            <li className="text-sm text-gray-600">
              구매내역
            </li>
            <li className="text-sm text-gray-600">
              고객센터
            </li>
          </ul>
        </div>
      )}

      <div className="mb-6 w-full relative bg-[#1a1a1a] rounded-lg shadow overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: 'calc(306 / 753 * 100%)' }}>
          <AnimatePresence mode="wait">
            <motion.img
              key={bannerImages[bannerIndex]}
              src={bannerImages[bannerIndex]}
              alt="추천 배너"
              className="absolute top-0 left-0 w-full h-full object-contain"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {bannerImages.map((_, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  bannerIndex === i ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setBannerIndex(i)}
                style={{ cursor: 'pointer' }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 카테고리별 상품 노출 */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {categories.map((category) => (
          <div key={category} id={category} className="mb-10">
            <a href={`#${category}`} className="text-xl font-bold mb-2 text-gray-900 hover:underline block">
              {category}
            </a>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts[category]?.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  onDetailClick={setSelectedProductId}
                />
              ))}
            </div>
          </div>
        ))}
      </main>

      {selectedProductId && (
        <ProductModal id={selectedProductId} onClose={() => setSelectedProductId(null)} />
      )}
    </div>
  );
} 