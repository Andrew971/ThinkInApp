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
export function unFollowOneUser(info) {
  return {
      type: 'UNFOLLOW_USER_REQUESTED',
      info: info
  };
}
export function unFollowOneLab(info) {
  return {
      type: 'UNFOLLOW_LAB_REQUESTED',
      info: info
  };
}

export function GetListFolowed(info) {
  return {
      type: 'LIST_FOLLOW_REQUESTED',
      info: info
  };
}
export function GetmyList(info) {
  return {
      type: 'GET_MYLIST_REQUESTED',
      info: info
  };
}
