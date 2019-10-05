import { Injectable } from '@angular/core';

const KEY = 'authToken';
const USUARIO_KEY = 'usuario';

@Injectable({ providedIn: 'root' })
export class TokenService {

  hasToken() {
    return !!this.getToken();
  }

  setToken(token) {
    window.localStorage.setItem(KEY, token);
  }

  getToken() {
    return window.localStorage.getItem(KEY);
  }

  removeToken() {
    window.localStorage.removeItem(KEY);
    window.localStorage.removeItem(USUARIO_KEY);
  }

  setUsuario(usuario) {
    window.localStorage.setItem(USUARIO_KEY, usuario);
  }

  getUsuario() {
    return window.localStorage.getItem(USUARIO_KEY);
  }
}
