import axios from 'axios'
import store from 'store'
import { TOKEN } from './constants';
// import { AuthAPI } from '../views/Auth/api/AuthAPI';

// const BASE_URL = process.env.REACT_APP_BASE_URL ?? ''

// export const postImage = async (url, data = {}, headers = {}) => {
//   try {
//     const token = "5afc829487c100de3e6679971a00040b2b77cead";
//     const r = await axios.post(url, data, {
//       headers: {
//         "content-type": "application/json",
//         Authorization: `Bearer ${token}`,
//         ...headers
//     }
//     });
//     return r.data;
//   } catch (err) {
//     const r = err.response || {};
//     r.isError = true;
//     return r;
//   }
// };
export const PostWithoutAuth = async (url, data = {}, params = {}) => {
  try {
    const r = await axios.post(url, data, {
      params: {
        ...params
      }
    });
    return r.data;
  } catch (err) {
    const r = err.response || {};
    r.isError = true;
    return r;
  }
};
export const postWithAuth = async (url, data = {}, headers = {}) => {
  try {
    const token = store.get(TOKEN);
    const r = await axios.post(url, data, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers
      }
    });
    return r.data;
  } catch (err) {
    const r = err.response || {};
    r.isError = true;
    return r;
  }
};
// export const patchWithAuth = async (url, data = {}, headers = {}) => {
//   try {
//     const authToken = Base64.decode(AuthAPI.getAuth());
//     const apiToken = Base64.decode(AuthAPI.getToken());
//     const r = await axios.patch(`${BASE_URL}${url}`, data, {
//       headers: {
//         "content-type": "application/json",
//         "x-auth-token": `${authToken}`,
//         "x-api-token": `${apiToken}`,
//         ...headers
//       }
//     });
//     return r.data;
//   } catch (err) {
//     const r = err.response || {};
//     r.isError = true;
//     return r;
//   }
// };
export const putWithAuth = async (url, data = {}, headers = {}) => {
  try {
    const token = store.get(TOKEN);
    const r = await axios.put(url, data, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers
      }
    });
    return r.data;
  } catch (err) {
    const r = err.response || {};
    r.isError = true;
    return r;
  }
};

export const getWithAuth = async (url, headers = {}) => {
  try {
    const token = store.get(TOKEN);
    const r = await axios.get(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers
      }
    });
    return r.data;
  } catch (err) {
    const r = err.response || {};
    r.isError = true;
    return r;
  }
};

export const getWithoutAuth = async (url) => {
  try {
    const r = await axios.get(url);
    return r.data;
  } catch (err) {
    const r = err.response || {};
    r.isError = true;
    return r;
  }
}

export const deleteWithAuth = async (url, headers = {}) => {
  try {
    const token = store.get(TOKEN);
    const r = await axios.delete(url, {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
        ...headers
      }
    });
    return r.data;
  } catch (err) {
    console.log(err);
    const r = err.response || {};
    r.isError = true;
    return r;
  }
};