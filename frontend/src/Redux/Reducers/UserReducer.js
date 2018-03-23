// Initial state of the feature
const initialState = {
	id:'',
	username: '',
	profile:{},
	redirectToReferer:false

};

export function UserReducer(state = initialState, action) {

	switch (action.type) {
		case 'USER_INFO':
			return {
				...state,
				id:action.payload.id,
				username: action.payload.Username,
		
			};
		case 'PROFILE_LOADED':
			return {
				...state,
				profile: action.payload,
		
			};

			case 'PROFILE_UPDATE_SUCCESS':
      return {
        ...state,
        redirectToReferer: action.payload.sta,
        profile: action.payload.profile

      };
		case 'RESET_USER':
			return {
				...state,
				id:'',
				username: '',		
			};
	
		default:
			return state;
	}
}

