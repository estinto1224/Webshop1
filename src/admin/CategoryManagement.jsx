import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const CategoryManagement = ({ shop }) => {
  const [categories, setCategories] = useState(() => {
    // 웹상점별 초기 카테고리 데이터
    const initialData = {
      home: [
        { id: 1, name: '추천상품', order: 1 },
        { id: 2, name: '스페셜/이벤트', order: 2 },
        { id: 3, name: '인기상품', order: 3 }
      ],
      newmajgo: [
        { id: 1, name: '스페셜★ ', order: 1 },
        { id: 2, name: '알뜰팩', order: 2 },
        { id: 3, name: '실속팩', order: 3 },
        { id: 4, name: '아이템', order: 4 },
        { id: 5, name: '핫딜', order: 5 }
      ],
      poker: [
        { id: 1, name: '추천', order: 1 },
        { id: 2, name: '이벤트', order: 2 },
        { id: 3, name: '루비', order: 3 },
        { id: 4, name: '아이템', order: 4 }
      ]
    };
    return initialData[shop] || [];
  });

  const [newCategory, setNewCategory] = useState('');
  const [editingCategory, setEditingCategory] = useState(null);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const category = {
        id: Date.now(),
        name: newCategory.trim(),
        order: categories.length + 1
      };
      setCategories([...categories, category]);
      setNewCategory('');
    }
  };

  const handleDeleteCategory = (id) => {
    const categoryToDelete = categories.find(category => category.id === id);
    
    // 얼럿 창 띄우기
    if (categoryToDelete) {
      alert("해당 카테고리에 상품이 등록되어 있습니다.");
    } else {
      setCategories(categories.filter(category => category.id !== id));
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
  };

  const handleSaveEdit = () => {
    setCategories(categories.map(category => 
      category.id === editingCategory.id ? editingCategory : category
    ));
    setEditingCategory(null);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(categories);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    // 순서 업데이트
    const updatedItems = items.map((item, index) => ({
      ...item,
      order: index + 1
    }));

    setCategories(updatedItems);
  };

  const toggleVisibility = (id) => {
    setCategories(categories.map(category => 
      category.id === id ? { ...category, isVisible: !category.isVisible } : category
    ));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6">카테고리 관리</h2>
      
      <div className="mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="새 카테고리 이름"
            className="flex-1 border rounded px-3 py-2"
          />
          <button
            onClick={handleAddCategory}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            카테고리 추가
          </button>
        </div>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {categories.map((category, index) => (
                <Draggable
                  key={category.id}
                  draggableId={category.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-center gap-4 p-4 border rounded bg-white"
                    >
                      <div
                        {...provided.dragHandleProps}
                        className="cursor-move text-gray-400 hover:text-gray-600"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 6h16M4 12h16M4 18h16"
                          />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-500 mr-2">순서: {category.order}</span>
                        {editingCategory?.id === category.id ? (
                          <input
                            type="text"
                            value={editingCategory.name}
                            onChange={(e) => setEditingCategory({
                              ...editingCategory,
                              name: e.target.value
                            })}
                            className="border rounded px-2 py-1"
                          />
                        ) : (
                          <span className="font-medium">{category.name}</span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        {editingCategory?.id === category.id ? (
                          <button
                            onClick={handleSaveEdit}
                            className="text-green-500 hover:text-green-600"
                          >
                            저장
                          </button>
                        ) : (
                          <button
                            onClick={() => handleEditCategory(category)}
                            className="text-blue-500 hover:text-blue-600"
                          >
                            수정
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteCategory(category.id)}
                          className="text-red-500 hover:text-red-600"
                        >
                          삭제
                        </button>
                        <button
                          onClick={() => toggleVisibility(category.id)}
                          className={`px-3 py-1 rounded-md text-sm ${category.isVisible ? 'bg-green-500 text-white' : 'bg-red-500 text-white'}`}
                        >
                          {category.isVisible ? '노출' : '비노출'}
                        </button>
                      </div>
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

export default CategoryManagement; 