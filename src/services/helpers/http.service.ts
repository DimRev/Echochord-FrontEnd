import Axios from 'axios'

import { Server } from '../api/server.service.js'
import { User } from '../api/user.service.js'

type Data = User | Server
type NewData = Omit<User, '_id'> | Omit<Server, '_id'>

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

const axios = Axios.create({
  withCredentials: true,
})

export const httpService = {
  get(endpoint: string, data?: string) {
    return ajax(endpoint, 'GET', data)
  },
  post(endpoint: string, data: NewData) {
    return ajax(endpoint, 'POST', data)
  },
  put(endpoint: string, data: Data) {
    return ajax(endpoint, 'PUT', data)
  },
  delete(endpoint: string, data: string) {
    return ajax(endpoint, 'DELETE', data)
  },
}

async function ajax(endpoint: string, method: string = 'GET', data: Data | NewData | string | null = null): Promise<Data | Data[] | string> {
  try {
    const res = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      params: method === 'GET' ? data : null,
    })
    return res.data
  } catch (err: any) {
    console.error(
      `Had Issues ${method}ing to the backend, endpoint: ${endpoint}, with data: `,
      data,
    );
    console.dir(err);
    if (err.response && err.response.status === 401) {
      sessionStorage.clear();
      window.location.assign('/');
    }
    throw err;
  }
}
