import axios from "axios";

export const getCarts = () => {
  return {
    type: 'GET_CART',
    payload: axios.get('http://192.168.0.26:3333/api/v1/orders')
  }
}

export const checkCart = (checkCartId, currentQty, currentPrice, price) => {
  return {
    type: 'CHECK_CART',
    payload: axios({
                method: 'patch',
                url: `http://192.168.0.26:3333/api/v1/order/${checkCartId}`,
                data: {
                    qty: currentQty + 1,
                    price: currentPrice + price
                }
              })

  }
}

export const addToCart = (product_id, price) => {
  return {
    type: 'ADD_TO_CART',
    payload: axios({
                method: 'post',
                url: 'http://192.168.0.26:3333/api/v1/order',
                data: {
                    product_id: product_id,
                    price: price,
                    qty: 1
                }
             })
  }
}

export const updateQty = (id, body) => {
  return {
    type: "UPDATE_QTY",
    payload: axios({
                method: 'patch',
                url: `http://192.168.0.26:3333/api/v1/order/${id}`,
                data: body
             })
  };
};

export const deleteCart = (id) => {
  return {
    type: 'DELETE_CART',
    payload: axios.delete(`http://192.168.0.26:3333/api/v1/order/${id}`)
  }
}