const initialState = {
    carts: [],
    isLoading: false,
    addCart: [],
    totalPrice :  0,
    length: 0
}
  
  export default carts = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_CART_PENDING': 
        return {
          ...state,
          carts: [],
          isLoading: true
        }
  
      case 'GET_CART_REJECTED': 
        return {
          ...state,
          isLoading: false,
          error : "Something Wrong"
        }
  
      case 'GET_CART_FULFILLED':
        return {
          ...state,
          isLoading: false,
          carts: action.payload,
          length: action.payload.data.length
        }

      case 'ADD_TO_CART_PENDING':
        return {
          ...state,
          isLoading: true,
          addCart: action.payload
        }

      case 'ADD_TO_CART_REJECTED':
        return {
          ...state,
          isLoading: false,
          addCart: action.payload
        }

      case 'ADD_TO_CART_FULFILLED':
        return {
          ...state,
          isLoading: false,
          addCart: action.payload
        }

      case 'DELETE_CART_PENDING':
        return {
          ...state,
          isLoading: true
        }
      
      case 'DELETE_CART_REJECTED':
        return {
          ...state,
          isLoading: false
        }

      case 'DELETE_CART_FULFILLED':
        return {
          ...state,
          isLoading: false
        }

      case 'UPDATE_QTY_PENDING':
        return {
          ...state,
          isLoading: true
        }

      case 'UPDATE_QTY_REJECTED':
        return {
          ...state,
          isLoading: false
        }

      case 'UPDATE_QTY_FULFILLED':
        return {
          ...state,
          isLoading: false
        }

      default:
        return state;
    }
  }