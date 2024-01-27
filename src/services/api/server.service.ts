import { MiniUser } from './user.service'

export type Server = {
  _id: string
  name: string
  imgUrl?: string
  textChannels: TextChannel[]
  voiceChannels: VoiceChannel[]
}

type NewServer = Omit<Server, '_id'>

export type TextChannel = {
  id: string
  name: string
  chatMsgs: ChatMsg[]
}

export type VoiceChannel = {
  id: string
  name: string
}

export type ChatMsg = {
  id: string
  msg: string
  createdAt: Date
  user: MiniUser
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
  {
    _id: 's101', name: 'Server 1', imgUrl: '/src/assets/imgs/channel1.jpg', voiceChannels: [
      { id: "vr101", name: 'Voice Room 1' },
      { id: "vr102", name: 'Voice Room 2' },
      { id: "vr103", name: 'Voice Room 3' },
    ], textChannels: [{
      id: 'cr101', name: 'General', chatMsgs: [
        { id: 'msg101', createdAt: new Date(), msg: 'Hi!', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg102', createdAt: new Date(), msg: 'What\'s up dude?', user: { _id: 'u102', imgUrl: 'imgUrl2', username: 'testUser2' } },
        { id: 'msg103', createdAt: new Date(), msg: 'It\'s all good here! You?', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg104', createdAt: new Date(), msg: 'Where\'ve you been?', user: { _id: 'u103', imgUrl: 'imgUrl3', username: 'testUser3' } },
      ]
    }, {
      id: 'cr102', name: 'Hangout', chatMsgs: [
        { id: 'msg101', createdAt: new Date(), msg: 'This is message 1', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg102', createdAt: new Date(), msg: 'This is message 2', user: { _id: 'u102', imgUrl: 'imgUrl2', username: 'testUser2' } },
        { id: 'msg103', createdAt: new Date(), msg: 'This is message 3', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg104', createdAt: new Date(), msg: 'This is message 4', user: { _id: 'u103', imgUrl: 'imgUrl3', username: 'testUser3' } },
      ]
    }, {
      id: 'cr103', name: 'Memes', chatMsgs: [
        { id: 'msg101', createdAt: new Date(), msg: 'This is message 1', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg102', createdAt: new Date(), msg: 'This is message 2', user: { _id: 'u102', imgUrl: 'imgUrl2', username: 'testUser2' } },
        { id: 'msg103', createdAt: new Date(), msg: 'This is message 3', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg104', createdAt: new Date(), msg: 'This is message 4', user: { _id: 'u103', imgUrl: 'imgUrl3', username: 'testUser3' } },
      ]
    }],
  },
  { _id: 's102', name: 'Server 2', imgUrl: '/src/assets/imgs/channel2.jpg', voiceChannels: [], textChannels: [], },
  { _id: 's103', name: 'Server 3', imgUrl: '/src/assets/imgs/channel3.jpg', voiceChannels: [], textChannels: [], }
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
    textChannels: [],
    voiceChannels: [],
  }
}
