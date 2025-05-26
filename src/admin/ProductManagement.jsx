import React, { useState, useEffect } from 'react';
import { HiEye } from 'react-icons/hi';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ProductManagement = ({ shop }) => {
  const [products, setProducts] = useState(() => {
    const initialData = {
      home: [
        {
          id: 1,
          productId: "P001",
          name: "반짝 스페셜 오퍼",
          adminTag: "추천",
          displayName: "반짝 스페셜 오퍼",
          price: 9900,
          startDate: "2024-03-01",
          endDate: "2024-03-31",
          description: "AVA에서 사용 가능한 한정판 무기 아이템이 포함된 패키지입니다.",
          description2: "한정판 무기 아이템으로 게임을 더욱 즐겁게 즐기세요.",
          image: "https://dl.gostop.pmang.cloud/upload/Dia_653_1707.png",
          detailImage: "https://dl.gostop.pmang.cloud/upload/Dia_653_1707_detail.png",
          isVisible: true,
          category: "추천상품"
        },
        {
          id: 2,
          productId: "P002",
          name: "월구매제한) 황금편자(10일)",
          adminTag: "이벤트",
          displayName: "황금편자 10일 이용권",
          price: 9900,
          startDate: "2024-03-01",
          endDate: "2024-03-31",
          description: "황금편자 아이템 10일 이용권",
          description2: "황금편자로 더욱 특별한 게임 경험을 즐기세요.",
          image: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_11000.png",
          detailImage: "https://dl.poker.pmang.cloud/upload/mp_mob_ruby_11000_detail.png",
          isVisible: true,
          category: "추천상품"
        }
      ],
      newmajgo: [
        {
          id: 1,
          productId: "NM001",
          name: "행운플러스",
          adminTag: "스페셜",
          displayName: "행운플러스 패키지",
          price: 5900,
          startDate: "2024-03-01",
          endDate: "2024-03-31",
          description: "행운플러스 상품",
          description2: "행운을 더해주는 특별한 패키지",
          image: "https://dl.gostop.pmang.cloud/upload/luckyplus_shop.png",
          detailImage: "https://dl.gostop.pmang.cloud/upload/luckyplus_shop_detail.png",
          isVisible: true,
          category: "알뜰팩"
        },
        {
          id: 2,
          productId: "NM002",
          name: "초대박복권2장+화투패 + 14억냥",
          adminTag: "핫딜",
          displayName: "초대박복권 패키지",
          price: 44000,
          startDate: "2024-03-01",
          endDate: "2024-03-31",
          description: "초대박복권 2장과 화투패, 14억냥 제공",
          description2: "대박의 기회를 놓치지 마세요!",
          image: "https://dl.gostop.pmang.cloud/upload/bigdaebak_20b.png",
          detailImage: "https://dl.gostop.pmang.cloud/upload/bigdaebak_20b_detail.png",
          isVisible: true,
          category: "스페셜(★)"
        }
      ],
      poker: [
        {
          id: 1,
          productId: "PK001",
          name: "클래식 잭(15일)",
          adminTag: "추천",
          displayName: "클래식 잭 15일 이용권",
          price: 11900,
          startDate: "2024-03-01",
          endDate: "2024-03-31",
          description: "클래식 잭 아이템 15일 이용권",
          description2: "클래식 잭으로 더욱 특별한 포커 경험을 즐기세요.",
          image: "https://dl.poker.pmang.cloud/upload/poker_special1.png",
          detailImage: "https://dl.poker.pmang.cloud/upload/poker_special1_detail.png",
          isVisible: true,
          category: "추천"
        },
        {
          id: 2,
          productId: "PK002",
          name: "클래식 잭(30일)",
          adminTag: "추천",
          displayName: "클래식 잭 30일 이용권",
          price: 19900,
          startDate: "2024-03-01",
          endDate: "2024-03-31",
          description: "클래식 잭 아이템 30일 이용권",
          description2: "클래식 잭으로 더욱 특별한 포커 경험을 즐기세요.",
          image: "https://dl.poker.pmang.cloud/upload/poker_special1.png",
          detailImage: "https://dl.poker.pmang.cloud/upload/poker_special1_detail.png",
          isVisible: true,
          category: "추천"
        }
      ]
    };
    return initialData[shop] || [];
  });

  const categories = {
    home: ["추천상품", "스페셜/이벤트", "인기상품"],
    newmajgo: ["스페셜★", "알뜰팩", "실속팩", "아이템", "핫딜"],
    poker: ["추천", "이벤트", "루비", "아이템"]
  };

  const [editingProduct, setEditingProduct] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [previewProduct, setPreviewProduct] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [visibilityFilter, setVisibilityFilter] = useState('all');

  // 정렬 상태를 위한 state 추가
  const [sortConfig, setSortConfig] = useState({
    key: 'createdAt', // 기본값은 등록일순
    direction: 'desc'  // 기본값은 내림차순
  });

  const handleEditProduct = (product) => {
    setEditingProduct({ ...product });
  };

  const handleSaveEdit = () => {
    setProducts(products.map(product => 
      product.id === editingProduct.id ? editingProduct : product
    ));
    setEditingProduct(null);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct({
      ...editingProduct,
      [name]: value
    });
  };

  const toggleVisibility = (productId) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, isVisible: !product.isVisible }
        : product
    ));
  };

  const handlePreview = (product) => {
    setPreviewProduct(product);
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
    setPreviewProduct(null);
  };

  const handleSearch = () => {
    const filteredProducts = products.filter(product => {
      switch (searchCriteria) {
        case 'productId':
          return product.productId.includes(searchTerm);
        case 'name':
          return product.name.includes(searchTerm);
        case 'adminTag':
          return product.adminTag.includes(searchTerm);
        case 'displayName':
          return product.displayName.includes(searchTerm);
        case 'price':
          return product.price.toString().includes(searchTerm);
        case 'category':
          return product.category.includes(searchTerm);
        default:
          return true;
      }
    });
    setProducts(filteredProducts);
  };

  const getFilteredProducts = () => {
    let filtered = [...products];
    
    if (searchTerm) {
      filtered = filtered.filter(product => {
        switch (searchCriteria) {
          case 'productId':
            return product.productId.includes(searchTerm);
          case 'name':
            return product.name.includes(searchTerm);
          case 'adminTag':
            return product.adminTag.includes(searchTerm);
          case 'displayName':
            return product.displayName.includes(searchTerm);
          case 'price':
            return product.price.toString().includes(searchTerm);
          case 'category':
            return product.category.includes(searchTerm);
          default:
            return true;
        }
      });
    }
    
    switch (visibilityFilter) {
      case 'visible':
        return filtered.filter(product => product.isVisible);
      case 'hidden':
        return filtered.filter(product => !product.isVisible);
      default:
        return filtered;
    }
  };

  // 드래그 앤 드롭 처리 함수
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(products);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProducts(items);
  };

  // 정렬 함수
  const sortProducts = (products) => {
    return [...products].sort((a, b) => {
      switch (sortConfig.key) {
        case 'price':
          return sortConfig.direction === 'asc' 
            ? a.price - b.price 
            : b.price - a.price;
        case 'name':
          return sortConfig.direction === 'asc'
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name);
        case 'createdAt':
          return sortConfig.direction === 'asc'
            ? new Date(a.createdAt) - new Date(b.createdAt)
            : new Date(b.createdAt) - new Date(a.createdAt);
        default:
          return 0;
      }
    });
  };

  // 정렬 방식 변경 핸들러
  const handleSort = (key) => {
    setSortConfig(prevConfig => ({
      key,
      direction: 
        prevConfig.key === key 
          ? prevConfig.direction === 'asc' ? 'desc' : 'asc'
          : 'desc'
    }));
  };

  // 필터링 및 정렬된 상품 목록을 가져오는 함수
  const getFilteredAndSortedProducts = () => {
    let filtered = getFilteredProducts();
    return sortProducts(filtered);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">상품 관리</h2>
      
      {/* 검색 및 필터 영역 */}
      <div className="flex flex-col space-y-4 mb-6">
        {/* 검색 필터 */}
        <div className="flex items-center">
        <select
          value={searchCriteria}
          onChange={(e) => setSearchCriteria(e.target.value)}
          className="border rounded px-3 py-2 mr-2"
        >
          <option value="productId">상품아이디</option>
          <option value="name">상품명</option>
          <option value="adminTag">Admin Tag</option>
          <option value="displayName">노출이름</option>
          <option value="price">가격</option>
          <option value="category">카테고리</option>
        </select>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어 입력"
          className="border rounded px-3 py-2 flex-1"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
        >
          검색
        </button>
        </div>
        
        {/* 필터 및 정렬 영역 */}
        <div className="flex items-center justify-between">
          {/* 노출 상태 필터 */}
          <div className="flex items-center">
            <label className="mr-2 text-gray-700">노출 상태:</label>
            <select
              value={visibilityFilter}
              onChange={(e) => setVisibilityFilter(e.target.value)}
              className="border rounded px-3 py-2 w-40"
            >
              <option value="all">전체</option>
              <option value="visible">노출 상품</option>
              <option value="hidden">비노출 상품</option>
            </select>
            
            <span className="ml-4 text-sm text-gray-600">
              총 {getFilteredProducts().length}개의 상품
            </span>
          </div>

          {/* 정렬 옵션 */}
          <div className="flex items-center space-x-2">
            <span className="text-gray-700">정렬:</span>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => handleSort('price')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  sortConfig.key === 'price'
                    ? 'bg-white shadow text-blue-600'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                가격순 {sortConfig.key === 'price' && (
                  <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
              <button
                onClick={() => handleSort('createdAt')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  sortConfig.key === 'createdAt'
                    ? 'bg-white shadow text-blue-600'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                등록일순 {sortConfig.key === 'createdAt' && (
                  <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
              <button
                onClick={() => handleSort('name')}
                className={`px-3 py-1 rounded-md text-sm transition-colors ${
                  sortConfig.key === 'name'
                    ? 'bg-white shadow text-blue-600'
                    : 'text-gray-600 hover:bg-gray-200'
                }`}
              >
                이름순 {sortConfig.key === 'name' && (
                  <span>{sortConfig.direction === 'asc' ? '↑' : '↓'}</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* 상세보기 미리보기 모달 */}
      {showPreview && previewProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full relative">
            <button className="absolute top-2 right-2 text-gray-500" onClick={closePreview}>
              ✕
            </button>
            <div className="aspect-w-1 aspect-h-1 w-full mb-4">
              <img
                src={previewProduct.detailImage}
                alt={previewProduct.name}
                className="w-full h-[300px] object-contain rounded"
              />
            </div>
            <h2 className="text-xl font-bold mb-2">{previewProduct.name}</h2>
            <p className="text-sm text-gray-600 mb-4">{previewProduct.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">₩{previewProduct.price.toLocaleString()}</span>
              <button 
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={() => {
                  setShowPreview(false);
                  setPreviewProduct(null);
                }}
              >
                구매하기
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* 드래그 앤 드롭 컨텍스트 추가 */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="products">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-4"
            >
              {getFilteredAndSortedProducts().map((product, index) => (
                <Draggable
                  key={product.id}
                  draggableId={product.id.toString()}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className={`border rounded-lg p-4 ${
                        snapshot.isDragging ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      {editingProduct && editingProduct.id === product.id ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">상품ID</label>
                    <input
                      type="text"
                      name="productId"
                      value={editingProduct.productId}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-100"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">상품명</label>
                    <input
                      type="text"
                      name="name"
                      value={editingProduct.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-100"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Admin TAG</label>
                    <input
                      type="text"
                      name="adminTag"
                      value={editingProduct.adminTag}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-100"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">노출이름</label>
                    <input
                      type="text"
                      name="displayName"
                      value={editingProduct.displayName}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-100"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">가격</label>
                    <input
                      type="number"
                      name="price"
                      value={editingProduct.price}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-100"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">카테고리</label>
                    <select
                      name="category"
                      value={editingProduct.category}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3"
                    >
                      {categories[shop].map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">노출시작일</label>
                    <input
                      type="date"
                      name="startDate"
                      value={editingProduct.startDate}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-100"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">노출종료일</label>
                    <input
                      type="date"
                      name="endDate"
                      value={editingProduct.endDate}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-100"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">상품 상세설명</label>
                  <textarea
                    name="description"
                    value={editingProduct.description}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-100"
                    rows="3"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">상품 상세설명2</label>
                  <textarea
                    name="description2"
                    value={editingProduct.description2}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border rounded-md shadow-sm py-2 px-3 bg-gray-100"
                    rows="3"
                    disabled
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">상품이미지</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setEditingProduct({
                                ...editingProduct,
                                image: reader.result
                              });
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
                    {editingProduct.image && (
                      <div className="w-24 h-24 border rounded-md overflow-hidden">
                        <img
                          src={editingProduct.image}
                          alt="상품 이미지 미리보기"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">상세보기 이미지</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        name="detailImage"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              setEditingProduct({
                                ...editingProduct,
                                detailImage: reader.result
                              });
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
                    {editingProduct.detailImage && (
                      <div className="w-24 h-24 border rounded-md overflow-hidden">
                        <img
                          src={editingProduct.detailImage}
                          alt="상세보기 이미지 미리보기"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    취소
                  </button>
                  <button
                    onClick={handleSaveEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    저장
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-start space-x-4">
                          <div
                            {...provided.dragHandleProps}
                            className="flex items-center px-2 cursor-move"
                          >
                            <svg
                              className="w-6 h-6 text-gray-400"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 8h16M4 16h16"
                              />
                            </svg>
                          </div>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-24 h-24 object-cover rounded"
                          />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                              <h3 className="text-lg font-medium">
                                {product.name}
                              </h3>
                              <span className="text-sm text-gray-500">
                                ({product.productId})
                              </span>
                  </div>
                  <div className="mt-1">
                              <span className="text-sm text-blue-500">
                                Admin TAG: {product.adminTag}
                              </span>
                              <span className="ml-4 text-sm text-gray-500">
                                노출이름: {product.displayName}
                              </span>
                  </div>
                            <p className="text-gray-600 mt-2">
                              {product.description}
                            </p>
                  <div className="mt-2">
                              <span className="text-gray-500">
                                카테고리: {product.category}
                              </span>
                              <span className="ml-4 text-gray-500">
                                가격: {product.price.toLocaleString()}원
                              </span>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    노출기간: {product.startDate} ~ {product.endDate}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePreview(product)}
                    className="p-2 text-gray-500 hover:text-gray-700"
                    title="상세보기"
                  >
                    <HiEye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => toggleVisibility(product.id)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      product.isVisible 
                        ? 'bg-green-500 text-white hover:bg-green-600' 
                        : 'bg-red-500 text-white hover:bg-red-600'
                    }`}
                  >
                    {product.isVisible ? '노출중' : '숨김'}
                  </button>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    수정
                  </button>
                </div>
              </div>
            )}
          </div>
                  )}
                </Draggable>
        ))}
              {provided.placeholder}
      </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default ProductManagement; 