export type User = {
  _id: string
  username: string
  imgUrl: string
  email: string
}

export type MiniUser = Pick<User, '_id' | 'username' | 'imgUrl'>

type NewUser = Omit<User, '_id'>


import { storageService } from '../helpers/async-storage.service'
// import { httpService } from '../helpers/http.service'
export const userService = {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  getEmptyUser,
}

const DB_KEY = 'userDB'
// const BASE_URL = 'user/'

// ! CHECK BACKEND FOR COMPLETABLE REST METHODS FOR HTTP SERVICE ! //

const demoData: User[] = [
  { _id: 'u101', username: 'testUser', email: 'testUser@gmail.com', imgUrl: 'imgUrl' },
  { _id: 'u102', username: 'testUser2', email: 'testUser2@gmail.com', imgUrl: 'imgUrl2' },
  { _id: 'u103', username: 'testUser3', email: 'testUser3@gmail.com', imgUrl: 'imgUrl3' },
  { _id: 'u104', username: 'testUser4', email: 'testUser4@gmail.com', imgUrl: 'imgUrl4' },
]

_initDemoData()

function getUsers(): Promise<User[]> {
  // return httpService.get(BASE_URL)
  return storageService.query(DB_KEY) as Promise<User[]>
}

function getUserById(userId: string): Promise<User> {
  // return httpService.get(BASE_URL + userId)
  return storageService.get(DB_KEY, userId) as Promise<User>
}

function addUser(user: NewUser): Promise<User> {
  // return httpService.post(BASE_URL, {user})
  return storageService.post(DB_KEY, user) as Promise<User>
}

function updateUser(user: User): Promise<User> {
  // return httpService.put(BASE_URL, {user})
  return storageService.put(DB_KEY, user) as Promise<User>
}

function deleteUser(userId: string): Promise<string> {
  // return httpService.delete(BASE_URL + userId)
  return storageService.remove(DB_KEY, userId)
}

function _initDemoData() {
  const userData = localStorage.getItem(DB_KEY);
  if (!userData)
    localStorage.setItem(DB_KEY, JSON.stringify(demoData))
}

function getEmptyUser(): NewUser {
  return {
    username: '',
    imgUrl: '',
    email: '',
  }
}
