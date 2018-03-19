// Initial state of the feature
const initialState = {
	logged: false,
	token: localStorage.getItem('token'),
	message: '',


};

export function LoginReducer(state = initialState, action) {

	switch (action.type) {
		case 'USER_LOGIN':
			return {
				...state,
				logged: action.payload.status,
				token: action.payload.token,
				username: action.payload.username,
				message: action.payload.message
			};

		case 'USER_LOGGED':
			return {
				...state,
				logged: action.payload.status,
				token:action.payload.token
			};
		case 'USER_SIGNOUT':
		localStorage.removeItem('token')
			return {
				...state,
				token:'',
				logged:false
			};

		case 'CLEAR_MESSAGE':
			return {
				...state,
				message: action.message
			};
			
		default:
			return state;
	}
}

