const initialState = {
    checkCart: []
}
  
  export default checkCart = (state = initialState, action) => {
    switch (action.type) {
      case 'CHECK_CART_FULFILLED':
        return {
          checkCart: action.payload.data
        }

      default:
        return state;
    }
  }