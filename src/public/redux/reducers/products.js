const initialState = {
    results: [],
    isLoading: false,
    productDetails: []
}
  
  export default products = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_PRODUCT_PENDING': 
        return {
          results: [],
          isLoading: true
        }
  
      case 'GET_PRODUCT_REJECTED': 
        return {
          isLoading: false,
          error : "Something Wrong"
        }
  
      case 'GET_PRODUCT_FULFILLED':
        return {
          isLoading: false,
          results: action.payload.data
        }

      default:
        return state;
    }
  }