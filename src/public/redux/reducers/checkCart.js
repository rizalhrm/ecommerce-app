const initialState = {
    checkCart: []
}
  
  export default checkCart = (state = initialState, action) => {
    switch (action.type) {
      case 'CHECK_CART_FULFILLED':
        return {
          ...state,
          checkCart: action.payload.data
        }

      default:
        return state;
    }
  }