const initialState = {
    carts: [],
    isLoading: false,
    addCart: []
}
  
  export default carts = (state = initialState, action) => {
    switch (action.type) {
      case 'GET_CART_PENDING': 
        return {
          carts: [],
          isLoading: true
        }
  
      case 'GET_CART_REJECTED': 
        return {
          isLoading: false,
          error : "Something Wrong"
        }
  
      case 'GET_CART_FULFILLED':
        return {
          isLoading: false,
          carts: action.payload
        }

      case 'ADD_TO_CART_FULFILLED':
        return {
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

      case 'DECREASE_QTY_PENDING':
        return {

        }

      case 'DECREASE_QTY_REJECTED':
        return {

        }

      case 'DECREASE_QTY_FULFILLED':
        return {

        }

      case 'INCREASE_QTY_PENDING':
        return {

        }

      case 'INCREASE_QTY_REJECTED':
        return {

        }

      case 'INCREASE_QTY_FULFILLED':
        return {

        }

      default:
        return state;
    }
  }