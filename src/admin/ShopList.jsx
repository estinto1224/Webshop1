import React from 'react';

const ShopList = ({ shopList, setShopList }) => {
  const handleDeleteShop = (index) => {
    const updatedShopList = shopList.filter((_, i) => i !== index);
    setShopList(updatedShopList); // 삭제 후 리스트 업데이트
    console.log('상점 삭제:', shopList[index].name);
  };

  return (
    <ul className="mt-2">
      {shopList.map((shop, index) => (
        <li key={index} className="flex justify-between items-center border-b py-2">
          <div>
            <strong>{shop.name}</strong> - {shop.category}
          </div>
          <button
            onClick={() => handleDeleteShop(index)}
            className="text-red-500 hover:underline"
          >
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ShopList; 