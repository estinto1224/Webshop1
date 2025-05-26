import React, { useState, useEffect } from "react";
import { HiMenu, HiX, HiSearch } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const products = {
  1: {
    name: "반짝 스페셜 오퍼",
    description: "AVA에서 사용 가능한 한정판 무기 아이템이 포함된 패키지입니다.",
    price: 9900,
    items: ["한정 무기", "보급 상자", "30일 사용권"],
    category: "추천상품",
    image: "https://dl.gostop.pmang.cloud/upload/Dia_653_1707.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/Dia_653_1707.png"
  },
  2: {
    name: "월구매제한) 황금편자(10일)",
    description: "황금편자 아이템 10일 이용권",
    price: 9900,
    items: ["황금편자 아이템", "10일 이용권"],
    category: "추천상품",
    image: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_11000.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_11000.png"
  },
  3: {
    name: "황금 골프공(3일)",
    description: "황금 골프공 아이템 3일 이용권",
    price: 3900,
    items: ["황금 골프공 아이템", "3일 이용권"],
    category: "추천상품",
    image: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_22000.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_22000.png"
  },
  4: {
    name: "루비 110개",
    description: "루비 110개 패키지",
    price: 11000,
    items: ["루비 110개"],
    category: "추천상품",
    image: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_55000.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_55000.png"
  },
  5: {
    name: "초대박복권2장+화투패 + 14억냥",
    description: "초대박복권 2장과 화투패, 14억냥이 포함된 패키지",
    price: 140000,
    items: ["초대박복권 2장", "화투패", "14억냥"],
    category: "추천상품",
    image: "https://dl.gostop.pmang.cloud/upload/bigdaebak_20b.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/Stochastic_Items.png"
  },
  6: {
    name: "초대박복권1장+화투패 +5억냥",
    description: "초대박복권 1장과 화투패, 5억냥이 포함된 패키지",
    price: 50000,
    items: ["초대박복권 1장", "화투패", "5억냥"],
    category: "추천상품",
    image: "https://dl.gostop.pmang.cloud/upload/bigdaebak_1b.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/Stochastic_Items.png"
  },
  7: {
    name: "행복한 독수리",
    description: "행복한 독수리 스페셜 패키지",
    price: 12000,
    items: ["독수리 스킨", "특별 아이템"],
    category: "스페셜/이벤트",
    image: "https://dl.gostop.pmang.cloud/upload/baseball_hotdeal_kboeagle.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/baseball_detail_kboeagle.jpg"
  },
  8: {
    name: "최강 사자",
    description: "최강 사자 스페셜 패키지",
    price: 15000,
    items: ["사자 스킨", "특별 아이템"],
    category: "스페셜/이벤트",
    image: "https://dl.gostop.pmang.cloud/upload/baseball_hotdeal_kbolion.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/baseball_detail_kbolion.jpg"
  },
  9: {
    name: "압도하는 호랑이",
    description: "압도하는 호랑이 스페셜 패키지",
    price: 13000,
    items: ["호랑이 스킨", "특별 아이템"],
    category: "스페셜/이벤트",
    image: "https://dl.gostop.pmang.cloud/upload/baseball_hotdeal_kbotiger.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/baseball_detail_kbotiger.jpg"
  },
  10: {
    name: "클래식 잭(15일)",
    description: "클래식 잭 아이템 15일 이용권",
    price: 11900,
    items: ["클래식 잭 아이템", "15일 이용권"],
    category: "스페셜/이벤트",
    image: "https://dl.poker.pmang.cloud/upload/poker_special1.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/poker_special1.png"
  },
  11: {
    name: "클래식 잭(30일)",
    description: "클래식 잭 아이템 30일 이용권",
    price: 19900,
    items: ["클래식 잭 아이템", "30일 이용권"],
    category: "스페셜/이벤트",
    image: "https://dl.poker.pmang.cloud/upload/poker_special1.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/poker_special1.png"
  },
  12: {
    name: "클래식 잭(20일)",
    description: "클래식 잭 아이템 20일 이용권",
    price: 14900,
    items: ["클래식 잭 아이템", "20일 이용권"],
    category: "스페셜/이벤트",
    image: "https://dl.poker.pmang.cloud/upload/poker_special1.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/poker_special1.png"
  },
  13: {
    name: "행운플러스",
    description: "행운을 더해주는 스페셜 패키지",
    price: 8900,
    items: ["행운 아이템", "보너스 아이템"],
    category: "인기상품",
    image: "https://dl.gostop.pmang.cloud/upload/luckyplus_shop.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/luckyplus_spec_5900.jpg"
  },
  14: {
    name: "초대박복권2장+화투패 + 14억냥",
    description: "초대박복권 2장과 화투패, 14억냥이 포함된 패키지",
    price: 140000,
    items: ["초대박복권 2장", "화투패", "14억냥"],
    category: "인기상품",
    image: "https://dl.gostop.pmang.cloud/upload/bigdaebak_20b.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/Stochastic_Items.png"
  },
  15: {
    name: "머니플러스",
    description: "머니를 더해주는 스페셜 패키지",
    price: 9900,
    items: ["머니 아이템", "보너스 아이템"],
    category: "인기상품",
    image: "https://dl.gostop.pmang.cloud/upload/Silsok_6043_1707.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/View_Detail_MoneyPlus_MG_1708.jpg#20170817154230"
  },
  16: {
    name: "골드화투(10일)",
    description: "골드화투 10일 이용권",
    price: 8900,
    items: ["골드화투", "10일 이용권"],
    category: "인기상품",
    image: "https://dl.gostop.pmang.cloud/upload/Silsok_702_1707.png",
    detailImage: "https://dl.gostop.pmang.cloud/upload/View_Detail_702_1707.png"
  },
  17: {
    name: "베이직(14일)출석패스",
    description: "베이직 출석패스 14일 이용권",
    price: 9900,
    items: ["베이직 출석패스", "14일 이용권"],
    category: "인기상품",
    image: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_99000.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_99000.png"
  },
  18: {
    name: "루비 223개",
    description: "루비 223개 패키지",
    price: 22300,
    items: ["루비 223개"],
    category: "인기상품",
    image: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_22000.png",
    detailImage: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_22000.png"
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

export default function ShopPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const categories = ["전체", "추천상품", "스페셜/이벤트", "인기상품"];

  const bannerImages = [
    "https://dl.poker.pmang.cloud/upload/pk_webmain_sales_2503_753x306.jpg",
    "https://dl.poker.pmang.cloud/upload/230614_pokerchipmion_main(753x306).jpg"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setBannerIndex((prevIndex) => (prevIndex + 1) % bannerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [bannerImages.length]);

  // 필터링된 상품 목록을 가져오는 함수
  const getFilteredProducts = () => {
    if (selectedCategory === "전체") {
      return Object.keys(products).map(id => ({ id: parseInt(id), ...products[id] }));
    }
    return Object.entries(products)
      .filter(([_, product]) => product.category === selectedCategory)
      .map(([id, product]) => ({ id: parseInt(id), ...product }));
  };

  return (
    <div className="p-4 max-w-[1000px] w-full mx-auto relative ">
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

      <header >
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

      <div className="grid grid-cols-3 gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`p-3 text-center rounded-lg transition-colors ${
              selectedCategory === category
                ? "bg-blue-500 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {getFilteredProducts().map((product) => (
          <ProductCard key={product.id} id={product.id} onDetailClick={setSelectedProductId} />
        ))}
      </section>

      {selectedProductId && (
        <ProductModal id={selectedProductId} onClose={() => setSelectedProductId(null)} />
      )}
    </div>
  );
}
