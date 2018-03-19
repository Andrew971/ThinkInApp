export function LoginAction(Data) {
  return {
      type: 'USER_LOGIN_REQUESTED',
      data: Data
  };
}
export function Signout(Data) {
  return {
      type: 'USER_SIGNOUT_REQUEST',
      token: Data
  };
}


export function ClearOut() {
  return {
      type: 'CLEAR_MESSAGE',
      message: ''
  };
}
