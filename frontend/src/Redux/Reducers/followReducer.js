// Initial state of the feature
const initialState = {
  FollowedLab: [],
  listLoaded:false,
  FollowedUser:[],
  MyListUsers:[],
  MyListLabs:[]

};

export function followReducer(state = initialState, action) {
  switch (action.type) {
      case 'FOLLOW_LIST_SUCCESS':
          return  {
              ...state,
              FollowedLab: action.payload.labs,
              FollowedUser: action.payload.users,
              listLoaded:true,
          };
      case 'MY_LIST_SUCCESS':
          return  {
              ...state,
              MyListUsers: action.payload.users,
              MyListLabs: action.payload.labs,
              listLoaded:true,
          };
      default:
          return state;
  }
}

