import React, { useState } from 'react';

const BannerManagement = ({ shop }) => {
  const [banners, setBanners] = useState(() => {
    // 웹상점별 초기 배너 데이터
    const initialData = {
      home: [
        {
          id: 1,
          title: "포커 칩 이벤트",
          image: "https://dl.poker.pmang.cloud/upload/pk_webmain_sales_2503_753x306.jpg",
          link: "https://www.pmang.com/poker",
          priority: 1,
          startDate: "2024-04-01",
          endDate: "2024-04-30",
          isActive: true
        },
        {
          id: 2,
          title: "뉴맞고 이벤트",
          image: "https://dl.gostop.pmang.cloud/upload/mg_4_PC_684x355.jpg",
          link: "https://www.pmang.com/newmajgo",
          priority: 2,
          startDate: "2024-04-15",
          endDate: "2024-05-15",
          isActive: true
        }
      ],
      newmajgo: [
        {
          id: 1,
          title: "뉴맞고 스페셜 이벤트",
          image: "https://dl.gostop.pmang.cloud/upload/mg_4_PC_684x355.jpg",
          link: "https://www.pmang.com/newmajgo/event",
          priority: 1,
          startDate: "2024-04-10",
          endDate: "2024-04-20",
          isActive: true
        },
        {
          id: 2,
          title: "뉴맞고 핫딜",
          image: "https://dl.gostop.pmang.cloud/upload/pig_PC_684x355_240625.jpg",
          link: "https://www.pmang.com/newmajgo/hotdeal",
          priority: 2,
          startDate: "2024-04-15",
          endDate: "2024-04-25",
          isActive: true
        }
      ],
      poker: [
        {
          id: 1,
          title: "포커 칩 미션",
          image: "https://dl.poker.pmang.cloud/upload/230614_pokerchipmion_main(753x306).jpg",
          link: "https://www.pmang.com/poker/mission",
          priority: 1,
          startDate: "2024-04-05",
          endDate: "2024-04-15",
          isActive: true
        },
        {
          id: 2,
          title: "포커 칩 이벤트",
          image: "https://dl.poker.pmang.cloud/upload/pk_webmain_sales_2503_753x306.jpg",
          link: "https://www.pmang.com/poker/event",
          priority: 2,
          startDate: "2024-04-10",
          endDate: "2024-04-20",
          isActive: false
        }
      ]
    };
    return initialData[shop] || [];
  });

  const [newBanner, setNewBanner] = useState({
    title: '',
    image: '',
    link: '',
    priority: '',
    startDate: '',
    endDate: '',
    isActive: true
  });

  const [editingBanner, setEditingBanner] = useState(null);
  const [bannerImage, setBannerImage] = useState('');

  const handleAddBanner = () => {
    if (newBanner.image) {
      const banner = {
        id: Date.now(),
        ...newBanner
      };
      setBanners([...banners, banner]);
      setNewBanner({
        title: '',
        image: '',
        link: '',
        priority: '',
        startDate: '',
        endDate: '',
        isActive: true
      });
    }
  };

  const handleDeleteBanner = (id) => {
    setBanners(banners.filter(banner => banner.id !== id));
  };

  const handleUpdateBanner = (id, field, value) => {
    setBanners(banners.map(banner => 
      banner.id === id ? { ...banner, [field]: value } : banner
    ));
  };

  const handleEditBanner = (banner) => {
    setEditingBanner(banner);
  };

  const handleSaveEdit = () => {
    if (editingBanner) {
      setBanners(banners.map(banner => 
        banner.id === editingBanner.id ? editingBanner : banner
      ));
      setEditingBanner(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingBanner(null);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">배너 관리</h2>
      
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newBanner.title}
            onChange={(e) => setNewBanner({...newBanner, title: e.target.value})}
            placeholder="배너 제목"
            className="border rounded px-3 py-2"
          />
          <input
            type="number"
            value={newBanner.priority}
            onChange={(e) => setNewBanner({...newBanner, priority: e.target.value})}
            placeholder="우선순위"
            className="border rounded px-3 py-2"
          />
          <input
            type="date"
            value={newBanner.startDate}
            onChange={(e) => setNewBanner({...newBanner, startDate: e.target.value})}
            placeholder="시작일"
            className="border rounded px-3 py-2"
          />
          <input
            type="date"
            value={newBanner.endDate}
            onChange={(e) => setNewBanner({...newBanner, endDate: e.target.value})}
            placeholder="종료일"
            className="border rounded px-3 py-2"
          />
          <input
          type="text"
          value={newBanner.link}
          onChange={(e) => setNewBanner({...newBanner, link: e.target.value})}
          placeholder="링크 URL"
          className="border rounded px-3 py-2 "
        />
        </div>
        <div>
          <label className="mt-4 block text-sm font-bold text-gray-700">배너 이미지 등록</label>
          <div className="mt-3 flex items-center space-x-4">
            <div className="flex-1">
              <input
                type="file"
                name="bannerImage"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setBannerImage(reader.result); // 배너 이미지 상태 업데이트
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-md file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-blue-700
                  hover:file:bg-blue-100"
              />
                
            </div>
          
            {bannerImage && (
              <div className="w-24 h-24 border rounded-md overflow-hidden">
                <img
                  src={bannerImage}
                  alt="배너 이미지 미리보기"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <button
          onClick={handleAddBanner}
          className="mt-6 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          배너 추가
        </button>
      </div>

      <div className="space-y-4">
        {banners.map(banner => (
          <div key={banner.id} className="border rounded p-4">
            {editingBanner?.id === banner.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={editingBanner.title}
                    onChange={(e) => setEditingBanner({...editingBanner, title: e.target.value})}
                    placeholder="배너 제목"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    type="text"
                    value={editingBanner.link}
                    onChange={(e) => setEditingBanner({...editingBanner, link: e.target.value})}
                    placeholder="링크 URL"
                    className="border rounded px-3 py-2"
                  />
                  <input
                    type="date"
                    value={editingBanner.startDate}
                    onChange={(e) => setEditingBanner({...editingBanner, startDate: e.target.value})}
                    className="border rounded px-3 py-2"
                  />
                  <input
                    type="date"
                    value={editingBanner.endDate}
                    onChange={(e) => setEditingBanner({...editingBanner, endDate: e.target.value})}
                    className="border rounded px-3 py-2"
                  />                  
                  <input
                    type="number"
                    value={editingBanner.priority}
                    onChange={(e) => setEditingBanner({...editingBanner, priority: e.target.value})}
                    placeholder="우선순위"
                    className="border rounded px-3 py-2"
                  />
                  <select
                    value={editingBanner.isActive}
                    onChange={(e) => setEditingBanner({...editingBanner, isActive: e.target.value === 'true'})}
                    className="border rounded px-3 py-2"
                  >
                    <option value="true">노출</option>
                    <option value="false">미노출</option>
                  </select>
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    저장
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2">
                    <h3 className="font-bold">{banner.title}</h3>
                    <span className="text-sm text-gray-500">우선순위: {banner.priority}</span>
                    <select
                      value={banner.isActive}
                      onChange={(e) => handleUpdateBanner(banner.id, 'isActive', e.target.value === 'true')}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="true">노출</option>
                      <option value="false">미노출</option>
                    </select>
                  </div>
                  <p className="text-sm text-blue-500 mb-2">{banner.link}</p>
                  <div className="flex gap-4 text-sm text-gray-500 mb-2">
                    <span>시작일: {banner.startDate}</span>
                    <span>종료일: {banner.endDate}</span>
                  </div>
                  {banner.image && (
                    <img 
                      src={banner.image} 
                      alt={banner.title}
                      className="mt-2 max-w-xs rounded"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleEditBanner(banner)}
                    className="text-blue-500 hover:text-blue-600 text-sm"
                  >
                    수정
                  </button>
                  <button
                    onClick={() => handleDeleteBanner(banner.id)}
                    className="text-red-500 hover:text-red-600 text-sm"
                  >
                    삭제
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BannerManagement; 