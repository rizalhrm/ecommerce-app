const initialState = {
	data: [],
	isLoading: false
  };
  
  export default profile = (state = initialState, action) => {
	switch (action.type) {
	  case "GET_USERRPROFILE_PENDING":
			return Object.assign({}, state, {
				isLoading: true
			});
  
	  case "GET_USERPROFILE_REJECTED":
			return Object.assign({}, state, {
				isLoading: false
			});
  
	  case "GET_USERPROFILE_FULFILLED":
			return Object.assign({}, state, {
				isLoading: false,
				data: action.payload
			});

	  default:
		return state;
	}
  };
  