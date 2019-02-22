import axios from 'axios';

export const getPropil = (user_id, token) => {
	return {
	  type: "GET_FULL_PROPIL",
	  payload: axios({
		method: "get",
		url: `http://192.168.0.12:3333/api/v1/profile/${user_id}`,
		headers: {
		  Authorization: `Bearer ${token}`
		}
	  })
	};
  };
  
  