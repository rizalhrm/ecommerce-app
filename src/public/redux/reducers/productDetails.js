const initialState = {
    isLoading : false,
    productDetails: []
}
  
  export default productDetails = (state = initialState, action) => {
    switch (action.type) {
      case 'SAVE_PRODUCT_DETAIL_PENDING': 
        return {
          isLoading: true,
          productDetails: []
        }
  
      case 'SAVE_PRODUCT_DETAIL_REJECTED': 
        return {
          isLoading: false,
          error : "Something Wrong"
        }

      case 'SAVE_PRODUCT_DETAIL_FULFILLED':
        return {
          isLoading: false,
          productDetails: action.payload.data
        }

      default:
        return state;
    }
  }