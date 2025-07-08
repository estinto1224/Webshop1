import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 추가

const AddShop = () => {
  const [shopName, setShopName] = useState('');
  const [shopDescription, setShopDescription] = useState('');
  const [shopImage, setShopImage] = useState('');
  const [shopCategory, setShopCategory] = useState('');
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [backgroundImagePreview, setBackgroundImagePreview] = useState('');
  const [gameBiImage, setGameBiImage] = useState(null);
  const [gameBiImagePreview, setGameBiImagePreview] = useState('');
  const [mobileBannerImage, setMobileBannerImage] = useState(null);
  const [mobileBannerImagePreview, setMobileBannerImagePreview] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [shortcutButtonColor, setShortcutButtonColor] = useState('#000000');
  const [shortcutButtonText, setShortcutButtonText] = useState('');
  const [shopList, setShopList] = useState([
    { name: '피망 웹상점(홈)', description: '피망 웹상점 설명', category: '카테고리', isActive: true },
    { name: '뉴맞고 웹상점', description: '뉴맞고 웹상점 설명', category: '카테고리', isActive: true },
    { name: '포커 웹상점', description: '포커 웹상점 설명', category: '카테고리', isActive: true },
  ]); // 상점 리스트 상태 초기화
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가
  const [editIndex, setEditIndex] = useState(null); // 수정할 상점의 인덱스 상태 추가
  const navigate = useNavigate(); // useNavigate 사용

  // 파일 업로드 핸들러
  const handleBackgroundImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackgroundImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackgroundImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGameBiImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setGameBiImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setGameBiImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleMobileBannerImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMobileBannerImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMobileBannerImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddShop = (e) => {
    e.preventDefault();
    const newShop = {
      name: shopName,
      description: shopDescription,
      category: shopCategory,
      category1: document.getElementById('category1').value, // 카테고리1
      category4: document.getElementById('category4').value, // 카테고리4
      siteType: document.getElementById('siteType').value, // 사이트 유형
      backgroundImage: backgroundImage,
      backgroundImagePreview: backgroundImagePreview,
      gameBiImage: gameBiImage,
      gameBiImagePreview: gameBiImagePreview,
      mobileBannerImage: mobileBannerImage,
      mobileBannerImagePreview: mobileBannerImagePreview,
      videoUrl: videoUrl,
      shortcutButtonColor: shortcutButtonColor,
      shortcutButtonText: shortcutButtonText,
    };
    console.log('새 상점 추가:', newShop);
    
    // 상점 리스트에 추가
    setShopList([
      ...shopList,
      newShop
    ]);

    // 추가 후 초기화
    setShopName('');
    setShopDescription('');
    setShopImage('');
    setShopCategory('');
    setBackgroundImage(null);
    setBackgroundImagePreview('');
    setGameBiImage(null);
    setGameBiImagePreview('');
    setMobileBannerImage(null);
    setMobileBannerImagePreview('');
    setVideoUrl('');
    setShortcutButtonColor('#000000');
    setShortcutButtonText('');
    setIsModalOpen(false); // 모달 닫기
  };

  const handleDeleteShop = (index) => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      const updatedShopList = shopList.filter((_, i) => i !== index);
      setShopList(updatedShopList); // 삭제 후 리스트 업데이트
      console.log('상점 삭제:', shopList[index].name);
    }
  };

  const handleEditShop = (index) => {
    const shopToEdit = shopList[index];
    setShopName(shopToEdit.name);
    setShopDescription(shopToEdit.description);
    setShopCategory(shopToEdit.category);
    setBackgroundImage(shopToEdit.backgroundImage || null);
    setBackgroundImagePreview(shopToEdit.backgroundImagePreview || '');
    setGameBiImage(shopToEdit.gameBiImage || null);
    setGameBiImagePreview(shopToEdit.gameBiImagePreview || '');
    setMobileBannerImage(shopToEdit.mobileBannerImage || null);
    setMobileBannerImagePreview(shopToEdit.mobileBannerImagePreview || '');
    setVideoUrl(shopToEdit.videoUrl || '');
    setShortcutButtonColor(shopToEdit.shortcutButtonColor || '#000000');
    setShortcutButtonText(shopToEdit.shortcutButtonText || '');
    setEditIndex(index); // 수정할 상점의 인덱스 저장
    setIsModalOpen(true); // 모달 열기
  };

  return (  
        <div className="bg-gray-100">
          <div className="flex justify-between  w-full">    
          <div className="w-full p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-2xl font-bold">상점 리스트</h3>
          <div className="flex justify-end mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"        >
          상점 추가
        </button>
      
      
      </div>
        <ul className="mt-2">
          {shopList.map((shop, index) => (
            <li key={index} className="flex justify-between items-center border-b py-2">
              <div className="flex-grow">
                <strong>{shop.name}</strong> - {shop.category}
                <div className="text-sm text-gray-600">
                  {/* 카테고리 1: {shop.category1 || '없음'}, 카테고리 4: {shop.category4 || '없음'}, 사이트 유형: {shop.siteType || '없음'} */}
                </div>
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleDeleteShop(index)}
                  className="text-red-500 hover:underline mr-2"
                >
                  삭제
                </button>
                <button
                  onClick={() => handleEditShop(index)} // 수정하기 버튼 클릭 시
                  className="text-blue-500 hover:underline mr-2"
                >
                  수정하기
                </button>
                <button
                  onClick={() => {
                    const updatedShopList = shopList.map((s, i) => 
                      i === index ? { ...s, isActive: !s.isActive } : s
                    );
                    setShopList(updatedShopList);
                  }}
                  className={`px-2 py-1 rounded ${shop.isActive ? 'bg-green-500' : 'bg-gray-300'}`}
                >
                  {shop.isActive ? 'On' : 'Off'}
                </button>
              </div>
            </li>
          ))}
          
        </ul>
        
      </div>


       </div>

      {/* 모달 */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-1/2 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">{editIndex !== null ? '상점 수정' : '상점 추가'}</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              if (editIndex !== null) {
                // 수정 로직
                const updatedShop = {
                  name: shopName,
                  description: shopDescription,
                  category: shopCategory,
                  category1: document.getElementById('category1').value,
                  category4: document.getElementById('category4').value,
                  exposureOrder: document.getElementById('exposureOrder').value,
                  backgroundImage: backgroundImage,
                  backgroundImagePreview: backgroundImagePreview,
                  gameBiImage: gameBiImage,
                  gameBiImagePreview: gameBiImagePreview,
                  mobileBannerImage: mobileBannerImage,
                  mobileBannerImagePreview: mobileBannerImagePreview,
                  videoUrl: videoUrl,
                  shortcutButtonColor: shortcutButtonColor,
                  shortcutButtonText: shortcutButtonText,
                };
                const updatedShopList = shopList.map((s, i) => (i === editIndex ? updatedShop : s));
                setShopList(updatedShopList);
              } else {
                // 추가 로직
                const newShop = {
                  name: shopName,
                  description: shopDescription,
                  category: shopCategory,
                  category1: document.getElementById('category1').value,
                  category4: document.getElementById('category4').value,
                  exposureOrder: document.getElementById('exposureOrder').value,
                  backgroundImage: backgroundImage,
                  backgroundImagePreview: backgroundImagePreview,
                  gameBiImage: gameBiImage,
                  gameBiImagePreview: gameBiImagePreview,
                  mobileBannerImage: mobileBannerImage,
                  mobileBannerImagePreview: mobileBannerImagePreview,
                  videoUrl: videoUrl,
                  shortcutButtonColor: shortcutButtonColor,
                  shortcutButtonText: shortcutButtonText,
                };
                setShopList([...shopList, newShop]);
              }
              // 초기화
              setShopName('');
              setShopDescription('');
              setShopCategory('');
              setBackgroundImage(null);
              setBackgroundImagePreview('');
              setGameBiImage(null);
              setGameBiImagePreview('');
              setMobileBannerImage(null);
              setMobileBannerImagePreview('');
              setVideoUrl('');
              setShortcutButtonColor('#000000');
              setShortcutButtonText('');
              setIsModalOpen(false);
              setEditIndex(null); // 수정 인덱스 초기화
            }}>
              <div>
                <label className="block text-sm font-medium text-gray-700">상점 이름</label>
                <input
                  type="text"
                  value={shopName}
                  onChange={(e) => setShopName(e.target.value)}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
              
              {/* 백그라운드 이미지 등록 */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">백그라운드 이미지 등록</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleBackgroundImageChange}
                  className="border rounded px-3 py-2 w-full"
                />
                {backgroundImagePreview && (
                  <div className="mt-2">
                    <img 
                      src={backgroundImagePreview} 
                      alt="백그라운드 미리보기" 
                      className="w-32 h-20 object-cover border rounded"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      파일명: {backgroundImage?.name}
                    </p>
                  </div>
                )}
              </div>

              {/* 게임BI 이미지 등록 */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">게임BI 이미지 등록</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleGameBiImageChange}
                  className="border rounded px-3 py-2 w-full"
                />
                {gameBiImagePreview && (
                  <div className="mt-2">
                    <img 
                      src={gameBiImagePreview} 
                      alt="게임BI 미리보기" 
                      className="w-32 h-20 object-cover border rounded"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      파일명: {gameBiImage?.name}
                    </p>
                  </div>
                )}
              </div>

              {/* 모바일용 배너 이미지 등록 */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">모바일용 배너 이미지 등록</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleMobileBannerImageChange}
                  className="border rounded px-3 py-2 w-full"
                />
                {mobileBannerImagePreview && (
                  <div className="mt-2">
                    <img 
                      src={mobileBannerImagePreview} 
                      alt="모바일 배너 미리보기" 
                      className="w-32 h-20 object-cover border rounded"
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      파일명: {mobileBannerImage?.name}
                    </p>
                  </div>
                )}
              </div>

              {/* 영상 URL 입력 (선택사항) */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  영상 URL <span className="text-gray-500 text-xs">(선택사항)</span>
                </label>
                <input
                  type="url"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder="https://example.com/video.mp4"
                  className="border rounded px-3 py-2 w-full"
                />
                {videoUrl && (
                  <p className="text-sm text-gray-500 mt-1">
                    입력된 URL: {videoUrl}
                  </p>
                )}
              </div>

              {/* 바로가기 버튼 배경 색상 입력 */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">바로가기 버튼 배경 색상</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={shortcutButtonColor}
                    onChange={(e) => setShortcutButtonColor(e.target.value)}
                    className="w-12 h-10 border rounded cursor-pointer"
                  />
                  <input
                    type="text"
                    value={shortcutButtonColor}
                    onChange={(e) => setShortcutButtonColor(e.target.value)}
                    placeholder="#000000"
                    className="border rounded px-3 py-2 flex-1"
                  />
                </div>
                <div className="mt-2">
                  <div 
                    className="w-full h-8 rounded border"
                    style={{ backgroundColor: shortcutButtonColor }}
                  ></div>
                </div>
              </div>

              {/* 카테고리 셀렉트 박스 추가 */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">상점 카테고리 </label>
                <select id="category1" className="border rounded px-3 py-2 w-full">
                  <option value="">선택하세요</option>
                  <option value="카테고리1-1">구분없음(전체)</option>
                  <option value="카테고리1-2">피망뉴맞고</option>
                  <option value="카테고리1-3">피망포커</option>
                  <option value="카테고리1-4">피망섯다</option>
                  <option value="카테고리1-5">피망쇼다운홀덤</option>
                </select>
              </div>
              
              {/* 상점 노출 순위 셀렉트 박스 추가 */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  상점 노출 순위 <span className="text-gray-500 text-xs">(선택한 상점 다음에 위치)</span>
                </label>
                <select id="exposureOrder" className="border rounded px-3 py-2 w-full">
                  <option value="">선택하세요</option>
                  <option value="최상위">최상위</option>
                  <option value="뉴맞고 웹상점">뉴맞고 웹상점</option>
                  <option value="포커 웹상점">포커 웹상점</option>
                  <option value="섯다 웹상점">섯다 웹상점</option>
                  <option value="쇼다운홀덤 웹상점">쇼다운홀덤 웹상점</option>
                </select>
              </div>

              {/* 바로가기 버튼 텍스트 문구 입력 */}
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">바로가기 버튼 텍스트 문구</label>
                <input
                  type="text"
                  value={shortcutButtonText}
                  onChange={(e) => setShortcutButtonText(e.target.value)}
                  placeholder="예: 게임 시작하기"
                  className="border rounded px-3 py-2 w-full"
                />
                {shortcutButtonText && (
                  <div className="mt-2">
                    <div 
                      className="inline-block px-4 py-2 rounded text-white text-center"
                      style={{ backgroundColor: shortcutButtonColor }}
                    >
                      {shortcutButtonText}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex space-x-2 mt-6">
              <button
                type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                  {editIndex !== null ? '수정' : '추가'}
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                  className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
              >
                취소
              </button>
              </div>
            </form>
          </div>
        </div>
      )}


    
    </div>
    
    
  );
};

export default AddShop;
