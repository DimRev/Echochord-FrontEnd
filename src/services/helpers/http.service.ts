import Axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/' : '//localhost:3030/api/'

const axios = Axios.create({
  withCredentials: true,
})

export const httpService = {
  get<T>(endpoint: string, data?: string | undefined): Promise<T | T[]> {
    if (data !== undefined) {
      return ajax<T>(endpoint, 'GET', data) as Promise<T>;
    } else {
      return ajax<T[]>(endpoint, 'GET', data) as Promise<T[]>;
    }
  },
  post<T>(endpoint: string, data: Omit<T, '_id'>): Promise<T> {
    return ajax<T>(endpoint, 'POST', data) as Promise<T>
  },
  put<T>(endpoint: string, data: T) {
    return ajax<T>(endpoint, 'PUT', data) as Promise<T>
  },
  delete<T>(endpoint: string, data: string) {
    return ajax<T>(endpoint, 'DELETE', data) as Promise<string>
  },
}

async function ajax<T>(endpoint: string, method: string = 'GET', data: T | Omit<T, '_id'> | string | null = null): Promise<T | T[] | string> {
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
