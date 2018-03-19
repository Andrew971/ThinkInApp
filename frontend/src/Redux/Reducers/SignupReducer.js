// Initial state of the feature
const initialState = {
    redirect: false,
    message:''
};

export function SignupReducer(state = initialState, action) {

    switch (action.type) {
        case 'USER_SIGNUP_SUCCESS':
            return {
                ...state,
                redirect: action.payload.success,
                message: action.payload.message
            };
            case 'RESET_STATUS_TO_FALSE':
            return {
                ...state,
                status: false,
            };
        default:
            return state;
    }
}

