import axios from "axios";
import { server } from '../../../data/server';

export const getProducts = (page) => {
  let url = "";
  if (page === undefined) {
    url = `${server.url}api/v1/products?page=1`;
  } else {
    url = page;
  }
  return {
    type: "GET_PRODUCT",
    payload: axios({
      method: "get",
      url: url
    })
  };

}

export const saveProductDetail = (item) => {
  return {
    type: 'SAVE_PRODUCT_DETAIL',
    payload: axios.get(`${server.url}api/v1/product/${item}`)
  }
}