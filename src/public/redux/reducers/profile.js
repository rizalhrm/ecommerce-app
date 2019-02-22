const initialState = {
	data: [],
	isLoading: false
  };
  
  export default profile = (state = initialState, action) => {
	switch (action.type) {
	  case "GET_FULL_PROPIL_PENDING":
		return {
		  isLoading: true
		};
  
	  case "GET_FULL_PROPIL_REJECTED":
		return {
		  isLoading: false
		};
  
	  case "GET_FULL_PROPIL_FULFILLED":
		return {
		  isLoading: false,
		  data: action.payload.data
		};

	  default:
		return state;
	}
  };
  