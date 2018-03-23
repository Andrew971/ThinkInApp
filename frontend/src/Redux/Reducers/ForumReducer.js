// Initial state of the feature
const initialState = {
  redirect: false,
  goto: '',
  forumList: [],
  ForumData: {},
  forumListLoaded: false,
  redirectToReferer:false
};

export function ForumReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_FORUM_SUCCESS':
      return {
        ...state,
        redirect: action.payload.redirect,
        goto: action.payload.forumName
      };
    case 'GET_FORUM_LIST_SUCCESS':
      return {
        ...state,
        forumList: action.payload,
        forumListLoaded: true
      };
      case 'GET_ONE_FORUM_SUCCESS':
      return {
        ...state,
        ForumData: action.payload
      };
      case 'FORUM_DELETE_SUCCESS':
      return {
        ...state,
        redirect: action.payload
      };
      case 'FORUM_UPDATE_SUCCESS':
      return {
        ...state,
        redirectToReferer: action.payload.success,
        ForumData: action.payload.forums

      };
      case 'RESET_REDIRECT':
      return {
        ...state,
        redirect: false,
        redirectToReferer: false
      };
    default:
      return state;
  }
}

