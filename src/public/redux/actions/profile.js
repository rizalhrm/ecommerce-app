import axios from 'axios';
import { server } from '../../../data/server';

export const getUserProfile = (user_id, token) => {
	return {
	  type: "GET_USERPROFILE",
	  payload: axios({
		method: "post",
		url: `${server.url}api/v1/auth/profile`,
		headers: {
		  Authorization: `Bearer ${token}`
		}
	  })
	};
  };
  
  