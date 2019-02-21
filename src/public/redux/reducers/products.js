const initialState = {
    results: [],
    isLoading: false,
    productDetails: []
}
  
  export default products = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_PRODUCT_PENDING': 
        return {
          ...state,
          results: [],
          isLoading: true
        }
  
      case 'GET_PRODUCT_REJECTED': 
        return {
          ...state,
          isLoading: false,
          error : "Something Wrong"
        }
  
      case 'GET_PRODUCT_FULFILLED':
        return {
          ...state,
          isLoading: false,
          results: action.payload.data
        }

      default:
        return state;
    }
  }