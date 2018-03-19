// Initial state of the feature
const initialState = {
  status:false,
  forumFilter: [],
  labFilter: [],
  profileFilter: []

};

export function SearchReducer(state = initialState, action) {

  switch (action.type) {
    
    case 'SEARCH_RESULT':
      return {
        ...state,
        forumFilter: action.result.forumFilter,
        labFilter: action.result.LabFilter,
        profileFilter: action.result.ProfileFilter
      };

      case 'SHOW_SEARCH_BOX':
      return {
        ...state,
        status:action.status
      };

    default:
      return state;
  }
}

