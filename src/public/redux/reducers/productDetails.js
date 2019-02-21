const initialState = {
    isLoading : false,
    productDetails: []
}
  
  export default productDetails = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_PRODUCT_DETAIL_PENDING': 
        return {
          ...state,
          isLoading: true,
          productDetails: []
        }
  
      case 'SAVE_PRODUCT_DETAIL_REJECTED': 
        return {
          ...state,
          isLoading: false,
          error : "Something Wrong"
        }

      case 'SAVE_PRODUCT_DETAIL_FULFILLED':
        return {
          ...state,
          isLoading: false,
          productDetails: action.payload.data
        }

      default:
        return state;
    }
  }