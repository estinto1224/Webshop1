import React, { useState, useEffect } from "react";
import { HiMenu, HiX, HiSearch } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const products = {
  1: {
    name: "행운플러스",
    description: "행운플러스 상품",
    price: 5900,
    items: ["행운플러스"],
    category: "알뜰팩",
    image: "https://dl.gostop.pmang.cloud/upload/luckyplus_shop.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/luckyplus_spec_5900.jpg"
  },
  2: {
    name: "초대박복권2장+화투패 + 14억냥",
    description: "초대박복권 2장과 화투패, 14억냥 제공",
    price: 44000,
    items: ["초대박복권 2장", "화투패", "14억냥"],
    category: "스페셜(★)",
    image: "https://dl.gostop.pmang.cloud/upload/bigdaebak_20b.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/Stochastic_Items.png"
  },
  3: {
    name: "초대박복권1장+화투패 +13억냥",
    description: "초대박복권 1장과 화투패, 13억냥 제공",
    price: 33000,
    items: ["초대박복권 1장", "화투패", "13억냥"],
    category: "스페셜(★)",
    image: "https://dl.gostop.pmang.cloud/upload/bigdaebak_3b.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/Stochastic_Items.png"
  },
  4: {
    name: "초대박복권1장+화투패 +5억냥",
    description: "초대박복권 1장과 화투패, 5억냥 제공",
    price: 12000,
    items: ["초대박복권 1장", "화투패", "5억냥"],
    category: "스페셜(★)",
    image: "https://dl.gostop.pmang.cloud/upload/bigdaebak_1b.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/Stochastic_Items.png"
  },
  5: {
    name: "대박복권+화투패+4억5천만냥",
    description: "대박복권 1장, 4억 5천만냥 제공",
    price: 9900,
    items: ["대박복권 1장", "화투패", "4억 5천만냥"],
    category: "스페셜(★)",
    image: "https://dl.gostop.pmang.cloud/upload/daebak_600m.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/Stochastic_Items.png"
  },
  6: {
    name: "머니플러스",
    description: "머니플러스 상품",
    price: 9900,
    items: ["머니플러스"],
    category: "알뜰팩",
    image: "https://dl.gostop.pmang.cloud/upload/Silsok_6043_1707.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/View_Detail_MoneyPlus_MG_1708.jpg#20170817154230"
  },
  7: {
    name: "슈퍼머니플러스",
    description: "슈퍼머니플러스 상품",
    price: 9900,
    items: ["슈퍼머니플러스"],
    category: "알뜰팩",
    image: "https://dl.gostop.pmang.cloud/upload/Silsok_6043_1707.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/View_Detail_MoneyPlus_MG_1708.jpg#20170817154230"
  },
  8: {
    name: "골드화투(10일)",
    description: "골드화투 10일 이용권",
    price: 19000,
    items: ["골드화투", "10일 이용권"],
    category: "실속팩",
    image: "https://dl.gostop.pmang.cloud/upload/Silsok_702_1707.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/View_Detail_702_1707.png"
  },
  9: {
    name: "골드화투(5일)",
    description: "골드화투 5일 이용권",
    price: 9900,
    items: ["골드화투", "5일 이용권"],
    category: "실속팩",
    image: "https://dl.gostop.pmang.cloud/upload/550302.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/View_Detail_Silsok_702_1710.png?ts=20171019173920"
  },
  10: {
    name: "골드화투(3일)",
    description: "골드화투 3일 이용권",
    price: 5900,
    items: ["골드화투", "3일 이용권"],
    category: "실속팩",
    image: "https://dl.gostop.pmang.cloud/upload/Silsok_703_1710.png?ts=20171016144807",
    detailImage: "https://dl.gostop.pmang.cloud/upload/View_Detail_Silsok_703_1710.png?ts=20171019174616"
  },
  11: {
    name: "행복한 독수리",
    description: "행복한 독수리 아이템",
    price: 24900,
    items: ["행복한 독수리"],
    category: "아이템",
    image: "https://dl.gostop.pmang.cloud/upload/baseball_hotdeal_kboeagle.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/baseball_detail_kboeagle.jpg"
  },
  12: {
    name: "최강 사자",
    description: "최강 사자 아이템",
    price: 24900,
    items: ["최강 사자"],
    category: "아이템",
    image: "https://dl.gostop.pmang.cloud/upload/baseball_hotdeal_kbolion.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/baseball_detail_kbolion.jpg"
  },
  13: {
    name: "압도하는 호랑이",
    description: "압도하는 호랑이 아이템",
    price: 24900,
    items: ["압도하는 호랑이"],
    category: "아이템",
    image: "https://dl.gostop.pmang.cloud/upload/baseball_hotdeal_kbotiger.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/baseball_detail_kbotiger.jpg"
  }
};

const productImages = [
  "https://dl.gostop.pmang.cloud/upload/Dia_653_1707.png",
  "https://dl.gostop.pmang.cloud/upload/dia_smallbox.png",
  "https://dl.gostop.pmang.cloud/upload/Dia_652_1707.png",
  "https://dl.gostop.pmang.cloud/upload/Dia_651_1707.png",
  "https://dl.gostop.pmang.cloud/upload/Dia_750_1707.png"
];

function ProductCard({ id, onDetailClick }) {
  const product = products[id];
  return (
    <div className="border rounded-lg shadow p-2 flex flex-col h-[320px]">
      <h2 className="text-sm font-semibold mb-2 line-clamp-1">{product.name}</h2>
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
      <div className="flex flex-col flex-grow min-h-0">
        <div className="mt-auto">
          <button className="w-full bg-red-500 hover:bg-red-600 text-white text-lg font-bold py-2 px-4 rounded-lg transition-colors">
            ₩{product.price.toLocaleString()}
          </button>
        </div>
      </div>
    </div>
  );
}

function ProductModal({ id, onClose }) {
  const product = products[id];
  const [showPurchaseAlert, setShowPurchaseAlert] = useState(false);
  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const [showCashAlert, setShowCashAlert] = useState(false);
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
        <ul className="text-sm text-gray-500 mb-4 list-disc pl-5">
          {product.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">₩{product.price.toLocaleString()}</span>
          <button 
            className="px-4 py-2 bg-green-500 text-white rounded"
            onClick={() => setShowConfirmAlert(true)}
          >
            구매하기
          </button>
        </div>
      </div>

      {showConfirmAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4 text-center">상품을 구매하시겠습니까?</h3>
            <div className="flex justify-between gap-4">
              <button
                className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 flex-1"
                onClick={() => setShowConfirmAlert(false)}
              >
                아니오
              </button>
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 flex-1"
                onClick={() => {
                  setShowConfirmAlert(false);
                  setShowPurchaseAlert(true);
                }}
              >
                네
              </button>
            </div>
          </div>
        </div>
      )}

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

      {showCashAlert && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-bold mb-4 text-center">피망캐시가 부족합니다.</h3>
            <div className="flex justify-center">
              <button
                className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => setShowCashAlert(false)}
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

export default function ShopPage2() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const bannerImages = [
    "https://dl.gostop.pmang.cloud/upload/mg_4_PC_684x355.jpg",
    "https://dl.gostop.pmang.cloud/upload/pig_PC_684x355_240625.jpg"
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
              웹상점
            </Link>
            <Link to="/shop2" className="text-sm text-blue-500 hover:text-blue-700">
              뉴맞고
            </Link>
            <Link to="/shop3" className="text-sm text-blue-500 hover:text-blue-700">
              포커
            </Link>
            <Link to="/shop3" className="text-sm text-blue-500 hover:text-blue-700">
              섯다
            </Link>
            <Link to="/shop3" className="text-sm text-blue-500 hover:text-blue-700">
              쇼다운홀덤
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
            {menuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </nav>

      <header>
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