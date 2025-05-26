 // src/reducers.js
 const initialState = {
    products: [],
  };

  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      // 필요한 액션을 처리합니다.
      default:
        return state;
    }
  };

  export default rootReducer;