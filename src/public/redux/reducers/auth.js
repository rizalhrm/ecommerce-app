const initialState = {
		data: [],
		access_token: [],
		isLoading: false,
		isAuth: false
  };
  
  export default auth = (state = initialState, action) => {
		switch (action.type) {
			case "GET_PROFILE_PENDING":
			return {
				isLoading: true
			};
		
			case "GET_PROFILE_REJECTED":
			return {
				isLoading: false,
				isAuth: false
			};
		
			case "GET_PROFILE_FULFILLED":
			return {
				data: action.payload.data,
				isLoading: false,
				isAuth: true
			};
		
			case "LOGIN_PENDING":
			return {
				isLoading: true
			};
		
			case "LOGIN_REJECTED":
			return {
				isLoading: false,
				isAuth: false
			};
		
			case "LOGIN_FULFILLED":
			return {
				access_token: action.payload.data.access_token,
				isLoading: false,
				isAuth: true
			};
		
			case "REFRESH_TOKEN_PENDING":
			return {
				isLoading: true
			};
		
			case "REFRESH_TOKEN_REJECTED":
			return {
				isLoading: false,
				isAuth: false
			};
		
			case "REFRESH_TOKEN_FULFILLED":
			return {
				access_token: action.payload.data,
				isLoading: false,
				isAuth: true
			};
		
			case "LOGOUT_PENDING":
			return {
				isLoading: true
			};
		
			case "LOGOUT_REJECTED":
			return {
				isLoading: false,
				isAuth: true
			};
		
			case "LOGOUT_FULFILLED":
			return {
				data: [],
				access_token: [],
				isLoading: false,
				isAuth: false
			};
		
			default:
		return state;
	}
  };
  