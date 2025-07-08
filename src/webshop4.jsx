import React, { useState } from "react";
import { HiMenu, HiX, HiSearch } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-lg p-6 max-w-lg w-full"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold">{product.name}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <HiX size={24} />
          </button>
        </div>
        <img
          src={product.detailImage}
          alt={product.name}
          className="w-full h-64 object-contain mb-4 rounded"
        />
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="space-y-2 mb-4">
          <h3 className="font-semibold">포함 아이템:</h3>
          <ul className="list-disc list-inside">
            {product.items.map((item, index) => (
              <li key={index} className="text-gray-600">{item}</li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-blue-600">{product.price.toLocaleString()}원</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
            구매하기
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ShopPage4() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = ["추천상품", "스페셜/이벤트"];

  const shopLinks = [
    { name: "뉴맞고", path: "/shop2", bg: "https://img.pmang.com/renewal/gameicon/2016/ico_gostop.png" },
    { name: "섯다", path: "/shop4", bg: "https://img.pmang.com/renewal/gameicon/2016/ico_sutda.png" },
    { name: "포커", path: "/shop3", bg: "https://img.pmang.com/renewal/gameicon/2016/ico_poker.png" },
    { name: "쇼다운홀덤", path: "/shop5", bg: "https://img.pmang.com/renewal/gameicon/2016/ico_showdown.png" }
  ];

  const getFilteredProducts = () => {
    return Object.entries(products).reduce((acc, [id, product]) => {
      if (!acc[product.category]) {
        acc[product.category] = [];
      }
      acc[product.category].push({ id, ...product });
      return acc;
    }, {});
  };

  const filteredProducts = getFilteredProducts();

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0',
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          centerMode: true,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          centerMode: true,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          centerMode: true,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* GNB */}
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
            <Link to="/shop2" className="block md:hidden text-sm text-blue-500 hover:text-blue-700">
              뉴맞고
            </Link>
            <Link to="/shop3" className="block md:hidden text-sm text-blue-500 hover:text-blue-700">
              섯다
            </Link>
            <Link to="/shop3" className="block md:hidden text-sm text-blue-500 hover:text-blue-700">
              포커
            </Link>
            <Link to="/shop3" className="block md:hidden text-sm text-blue-500 hover:text-blue-700">
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

      {/* 피망 웹상점 헤더 */}
      <header>
      </header>

      {/* 상점 바로가기 영역 */}
      <div className="w-full px-4 py-6">
        <div className="max-w-7xl mx-auto mb-6">
          <h2 className="text-xl font-bold text-gray-900">게임별 상점 바로가기</h2>
        </div>
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-4 gap-4 w-full">
            {shopLinks.map((shop) => (
              <Link
                key={shop.name}
                to={shop.path}
                className="flex flex-col items-center justify-center p-0 h-32 md:h-auto lg:h-auto rounded-3xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group w-full aspect-[640/820]"
                style={{ background: `url(${shop.bg}) center/cover no-repeat` }}
              >
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  <span className="text-lg md:text-base lg:text-sm font-bold text-white drop-shadow-lg mb-4">
                    {shop.name}
                  </span>
                  {/* 태블릿 이상에서는 중앙 정렬 위/아래, 태블릿 이하에서는 좌/우 끝 배치 */}
                  <div className="flex flex-row md:flex-col items-center md:items-center justify-between md:justify-center w-full px-4 md:px-0">
                    {/* 게임별 BI 이미지 영역 */}
                    <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <div className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 bg-white/20 rounded-xl flex items-center justify-center">
                        <span className="text-white/80 text-xs md:text-sm lg:text-base font-medium">
                          BI 이미지
                        </span>
                      </div>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105">
                      웹상점 바로가기
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      
      {/* 메인 컨텐츠 */}
      <main className="max-w-7xl mx-auto px-4 py-6">





        {categories.map((category) => (
          <div key={category} id={category} className="mb-10">
            <a href={`#${category}`} className="text-xl font-bold mb-2 text-gray-900 hover:underline block">
              {category}
            </a>
            <div className="relative">
              <style>
                {`
                  .slick-list {
                    overflow: visible !important;
                  }
                  .slick-slide {
                    transition: all 0.3s cubic-bezier(.4,0,.2,1);
                    position: relative;
                    z-index: 1;
                    filter: blur(1px) grayscale(30%);
                    opacity: 0.6;
                    transform: scale(0.85) translateY(20px);
                  }
                  .slick-center {
                    z-index: 3 !important;
                    filter: none;
                    opacity: 1;
                    transform: scale(1.05) translateY(0);
                    box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18);
                  }
                  .slick-active:not(.slick-center) {
                    z-index: 2 !important;
                    filter: blur(0.5px) grayscale(10%);
                    opacity: 0.85;
                    transform: scale(0.95) translateY(10px);
                  }
                  .slick-track {
                    display: flex;
                    align-items: center;
                  }
                  .slick-slide > div {
                    padding: 0 0px;
                  }
                  @media (max-width: 480px) {
                    .slick-slide {
                      transform: scale(0.9) translateY(10px);
                      opacity: 0.7;
                    }
                    .slick-center {
                      transform: scale(1) translateY(0);
                      opacity: 1;
                    }
                    .slick-list {
                      margin: 0 -20px;
                    }
                  }
                `}
              </style>
              <Slider {...sliderSettings}>
                {filteredProducts[category]?.map((product) => (
                  <div key={product.id}>
                    <ProductCard
                      id={product.id}
                      onDetailClick={setSelectedProduct}
                    />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        ))}


      </main>

      {/* 상품 상세 모달 */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            id={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}