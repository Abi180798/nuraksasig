import { getWithAuth, PostWithoutAuth,postWithAuth, putWithAuth, deleteWithAuth } from '../../utils/requestHandler'

const BASE_URL = "https://tahurauser.herokuapp.com";

export const UserAPI = {
  async login(data) {
    const r = await PostWithoutAuth(`${BASE_URL}/api/v1/auth/login`, data)
    return r;
  },

  async getListUser() {
    const r = await getWithAuth(`${BASE_URL}/api/v1/users`)
    return r;
  },

  async addUser(data) {
    const r = await postWithAuth(`${BASE_URL}/api/v1/users`, data)
    return r;
  },
  async putUser(data, id) {
    const r = await putWithAuth(`${BASE_URL}/api/v1/users/${id}`, data)
    return r;
  },
  async delUser(id) {
    const r = await deleteWithAuth(`${BASE_URL}/api/v1/users/${id}`)
    return r;
  }
}