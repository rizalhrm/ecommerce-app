import axios from "axios";

export const getProducts = (page) => {
  let url = "";
  if (page === undefined) {
    url = "http://192.168.0.12:3333/api/v1/products?page=1";
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
    payload: axios.get(`http://192.168.0.12:3333/api/v1/product/${item}`)
  }
}