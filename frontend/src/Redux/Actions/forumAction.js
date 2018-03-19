export function Add(info) {
  return {
      type: 'ADD_FORUM_REQUESTED',
      info: info
  };
}

export function GetList(info) {
  return {
      type: 'GET_FORUM_LIST_REQUESTED',
      info: info
  };
}

export function GetOneForum(info) {
  return {
      type: 'GET_ONE_FORUM_REQUESTED',
      info: info
  };
}

export function ResetRedirect() {
  return {
      type: 'RESET_REDIRECT'
  };
}
export function UpdateForum(info) {
  return {
      type: 'UPDATE_FORUM_REQUESTED',
      info: info
  };
}

export function deleteForum(info) {
  return {
      type: 'DELETE_FORUM_REQUESTED',
      info: info
  };
}