// Initial state of the feature
const initialState = {
  date: new Date()
};

export function clockReducer(state = initialState, action) {
  switch (action.type) {
      case 'CHANGE_DATE':
          return  {
              ...state,
              date: action.date
          };
      default:
          return state;
  }
}

