export function FollowOneLab(info) {
  return {
      type: 'FOLLOW_LAB_REQUESTED',
      info: info
  };
}
export function FollowOneUser(info) {
  return {
      type: 'FOLLOW_USER_REQUESTED',
      info: info
  };
}

export function GetListFolowed(info) {
  return {
      type: 'LIST_FOLLOW_LAB_REQUESTED',
      info: info
  };
}
export function GetmyList(info) {
  return {
      type: 'GET_MYLIST_REQUESTED',
      info: info
  };
}
