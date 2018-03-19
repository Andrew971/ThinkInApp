export function SignupAction(Data) {
  return {
      type: 'USER_SIGNUP_REQUESTED',
      data: Data
  };
}

export function resetStatus(status) {
  return {
      type: 'RESET_STATUS_TO_FALSE',
  };
}

