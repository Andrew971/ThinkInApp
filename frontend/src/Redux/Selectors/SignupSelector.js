import { createSelector } from 'reselect';

const feature = 'signup';

const setStatus = (state) => state[feature];

export const getMessage = createSelector(
  setStatus,
  (res) => setMessage(res)
);


function setMessage(res) {
  let message = res.message

  switch (message) {
    case 'users_username_unique':
      message = 'username'
      return message

    case 'users_e-mail_unique':
      message = 'email'
      return message

    case 'users_password_unique':
      message = 'password'
      return message

    default:
      return message;
  }

}


