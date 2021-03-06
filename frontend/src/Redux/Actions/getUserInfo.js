export function GetUserInfo(token) {
  return {
      type: 'USER_INFO_REQUESTED',
      token: token
  };
}

export function GetProfile(info) {
  return {
      type: 'USER_PROFILE_REQUESTED',
      username: info
  };
}
export function UpdateProfile(info) {
  return {
      type: 'UPDATE_PROFILE_REQUESTED',
      info: info
  };
}

export function ClearUserInfo(info) {
  return {
      type: 'RESET_USER',
  };
}


