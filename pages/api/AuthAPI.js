import axios from 'axios'
import store from 'store'
import { AUTH, TOKEN } from '../../utils/constants';
// import { PostWithoutAuth } from '../../../../utils/requestHandler'

export const AuthAPI = {
  getToken() {
    return store.get(TOKEN);
  },

  isAuthenticated() {
    return !!this.getToken()
  },

  getHTTPHeader() {
    return {
      "nuraksa-token": this.getToken()
    };
  },

  // async fetchUser() {
  //   const response = await getData("/api/users/me/");
  //   return response;
  // }
}