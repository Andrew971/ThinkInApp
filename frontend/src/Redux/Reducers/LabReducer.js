// Initial state of the feature
const initialState = {
  redirect: false,
  goto: '',
  labList: [],
  LabData: {},
  Comment: [],
  labListLoaded: false,
  redirectToReferer: false
};

export function LabReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_LAB_SUCCESS':
      return {
        ...state,
        redirect: action.payload.redirect,
        goto: action.payload.LabId
      };
    case 'GET_LAB_LIST_SUCCESS':
      return {
        ...state,
        labList: action.payload,
        labListLoaded: true
      };
    case 'GET_ONE_LAB_SUCCESS':
      return {
        ...state,
        LabData: action.payload
      };
    case 'LAB_DELETE_SUCCESS':
      return {
        ...state,
        redirect: action.payload
      };
    case 'LAB_UPDATE_SUCCESS':
      return {
        ...state,
        redirectToReferer: action.payload.success,
        LabData: action.payload.labs

      };
    case 'GET_COMMENT_SUCCESS':
      return {
        ...state,
        Comment: action.payload,

      };
    case 'ADD_COMMENT_SUCCESS':
      return {
        ...state,
        Comment: action.payload,

      };
    case 'RESET_REDIRECT':
      return {
        ...state,
        labListLoaded: false,
        redirectToReferer: false,
        redirect: false,
        CommentLoaded: false,

      };
    default:
      return state;
  }
}

