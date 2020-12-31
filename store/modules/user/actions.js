export function updateUser(user) {
  return {
    type: "@auth/SIGN_IN_SUCCESS",
    payload: user
  }
}

export function changeUser(user) {
  return {
    type: "@user/UPDATE_USER",
    payload: user
  }
}