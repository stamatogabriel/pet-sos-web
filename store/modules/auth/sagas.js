import { takeLatest, call, put, all } from "redux-saga/effects";
import { toast } from "react-toastify";

import { signInSuccess, signFailure } from "./actions";

import api from "../../../services/api";

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, "auth", {
      email,
      password
    });

    const { accessToken, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${accessToken}`;

    yield put(signInSuccess(accessToken, user));

  } catch (err) {
    toast.error("Houve um problema com o login, verifique suas credenciais.");
    yield put(signFailure());
  }
}

export function setToken({payload}) {
  if (!payload) return

  const { token } = payload.auth;

  if (token)
    return api.defaults.headers.Authorization = `Bearer ${token.token}`;

}

export function signOut() {
  
}

export default all([
  takeLatest("persist/REHYDRATE", setToken),
  takeLatest("@auth/SIGN_IN_REQUEST", signIn),
  takeLatest("@auth/SIGN_OUT", signOut)
]);
