export type Server = {
  _id: string
  name: string
  chatRooms: ChatRoom[]
  voiceRoom: VoiceRoom[]
}

type NewServer = Omit<Server, '_id'>

type ChatRoom = {
  id: string
  name: string
  chatMsgs: ChatMsg[]
}

type VoiceRoom = {
  id: string
  name: string
}

type ChatMsg = {
  id: string
  msg: string
  createdAt: Date
  user: MiniUser
}

type MiniUser = {
  _id: string
  username: string
  imgUrl: string
}

import { storageService } from '../helpers/async-storage.service'
// import { httpService } from '../helpers/http.service'
export const serverService = {
  getServers,
  getServerById,
  addServer,
  updateServer,
  deleteServer,
  getEmptyServer,
}

const DB_KEY = 'serverDB'
// const BASE_URL = 'server/'

// ! CHECK BACKEND FOR COMPLETABLE REST METHODS FOR HTTP SERVICE ! //

const demoData: Server[] = [
  { _id: 'i101', name: 'Server 1', voiceRoom: [], chatRooms: [], },
  { _id: 'i102', name: 'Server 2', voiceRoom: [], chatRooms: [], },
  { _id: 'i103', name: 'Server 3', voiceRoom: [], chatRooms: [], }
]

_initDemoData()

function getServers(): Promise<Server[]> {
  // return httpService.get(BASE_URL)
  return storageService.query(DB_KEY) as Promise<Server[]>
}

function getServerById(serverId: string): Promise<Server> {
  // return httpService.get(BASE_URL + serverId)
  return storageService.get(DB_KEY, serverId) as Promise<Server>
}

function addServer(server: NewServer): Promise<Server> {
  // return httpService.post(BASE_URL, {server})
  return storageService.post(DB_KEY, server) as Promise<Server>
}

function updateServer(server: Server): Promise<Server> {
  // return httpService.put(BASE_URL, {server})
  return storageService.put(DB_KEY, server) as Promise<Server>
}

function deleteServer(serverId: string): Promise<string> {
  // return httpService.delete(BASE_URL + serverId)
  return storageService.remove(DB_KEY, serverId)
}

function _initDemoData() {
  const serverData = localStorage.getItem(DB_KEY);
  if (!serverData)
    localStorage.setItem(DB_KEY, JSON.stringify(demoData))
}

function getEmptyServer(): NewServer {
  return {
    name: '',
    chatRooms: [],
    voiceRoom: [],
  }
}
