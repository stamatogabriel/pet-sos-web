export function updateUser(user) {
  return {
    type: "@auth/SIGN_IN_SUCCESS",
    payload: user
  }
}