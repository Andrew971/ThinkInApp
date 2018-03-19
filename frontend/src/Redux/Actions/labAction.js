export function Add(info) {

  return {
      type: 'ADD_LAB_REQUESTED',
      info: info
  };
}

export function GetList(info) {
  return {
      type: 'GET_LAB_LIST_REQUESTED',
      info: info
  };
}

export function GetOneLab(info) {
  return {
      type: 'GET_ONE_LAB_REQUESTED',
      info: info
  };
}

export function UpdateLab(info) {
  return {
      type: 'UPDATE_LAB_REQUESTED',
      info: info
  };
}

export function deleteLab(info) {
  return {
      type: 'DELETE_LAB_REQUESTED',
      info: info
  };
}

export function addComment(info) {
  return {
      type: 'ADD_COMMENT_REQUESTED',
      info: info

  };
}
export function GetComment(info) {
  return {
      type: 'GET_COMMENT_REQUESTED',
      info: info

  };
}
export function ResetRedirect() {
  return {
      type: 'RESET_REDIRECT'
  };
}