import axios from "axios";

export const getProducts = () => {
  return {
    type: 'GET_PRODUCT',
    payload: axios.get('http://192.168.0.26:3333/api/v1/products')
  }
}

export const saveProductDetail = (item) => {
  return {
    type: 'SAVE_PRODUCT_DETAIL',
    payload: axios.get(`http://192.168.0.26:3333/api/v1/product/${item}`)
  }
}