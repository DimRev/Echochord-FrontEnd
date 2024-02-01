export type Server = {
  _id: string
  name: string
  imgUrl?: string
  textChannels: TextChannel[]
  voiceChannels: VoiceChannel[]
}

type NewServer = Omit<Server, '_id'>

export type VoiceChannel = {
  id: string
  name: string
}



import { storageService } from '../helpers/async-storage.service'
import { TextChannel } from './textChannel.service'
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
        { id: 'msg101', createdAt: 1706151131192, msg: 'Hi!', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg102', createdAt: 1706251231192, msg: 'What\'s up dude?', user: { _id: 'u102', imgUrl: 'imgUrl2', username: 'testUser2' } },
        { id: 'msg103', createdAt: 1706351331192, msg: 'It\'s all good here! You?', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg104', createdAt: 1706451431192, msg: 'Where\'ve you been?', user: { _id: 'u103', imgUrl: 'imgUrl3', username: 'testUser3' } },
        { id: 'msg105', createdAt: 1706551531192, msg: 'Just got back from vacation!', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg106', createdAt: 1706651631192, msg: 'How was it?', user: { _id: 'u102', imgUrl: 'imgUrl2', username: 'testUser2' } },
        { id: 'msg107', createdAt: 1706751731192, msg: 'Amazing! I went to Hawaii. ️', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg108', createdAt: 1706851831192, msg: 'Lucky! ', user: { _id: 'u103', imgUrl: 'imgUrl3', username: 'testUser3' } },
        { id: 'msg109', createdAt: 1706951931192, msg: 'Anyone up for a game night this weekend?', user: { _id: 'u102', imgUrl: 'imgUrl2', username: 'testUser2' } },
        { id: 'msg110', createdAt: 1707052031192, msg: 'I\'m down!', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg111', createdAt: 1707152131192, msg: 'Me too!', user: { _id: 'u103', imgUrl: 'imgUrl3', username: 'testUser3' } },
        { id: 'msg112', createdAt: 1707252231192, msg: 'What should we play?', user: { _id: 'u102', imgUrl: 'imgUrl2', username: 'testUser2' } },
        { id: 'msg113', createdAt: 1707352331192, msg: 'How about Codenames?', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg114', createdAt: 1707452431192, msg: 'I\'m terrible at that game ', user: { _id: 'u103', imgUrl: 'imgUrl3', username: 'testUser3' } },
        { id: 'msg115', createdAt: 1707552531192, msg: 'Maybe we should watch a movie instead? ', user: { _id: 'u102', imgUrl: 'imgUrl2', username: 'testUser2' } },
        { id: 'msg116', createdAt: 1707652631192, msg: 'Sure, what do you guys want to watch?', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },

      ]
    }, {
      id: 'cr102', name: 'Hangout', chatMsgs: [
        { id: 'msg101', createdAt: 1706450331192, msg: 'Yo', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg102', createdAt: 1706450431192, msg: 'Yoyo', user: { _id: 'u102', imgUrl: 'imgUrl2', username: 'testUser2' } },
        { id: 'msg103', createdAt: 1706451331192, msg: 'Yoyoyo?', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg104', createdAt: 1706451431192, msg: 'Yoyoyo!', user: { _id: 'u103', imgUrl: 'imgUrl3', username: 'testUser3' } },
        { id: 'msg105', createdAt: 1706451531192, msg: 'What are you guys up to?', user: { _id: 'u102', imgUrl: 'imgUrl2', username: 'testUser2' } },
        { id: 'msg106', createdAt: 1706451631192, msg: 'Just working on some stuff.', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg107', createdAt: 1706451731192, msg: 'Same here.', user: { _id: 'u103', imgUrl: 'imgUrl3', username: 'testUser3' } },
        { id: 'msg108', createdAt: 1706451831192, msg: 'Any plans for the weekend?', user: { _id: 'u102', imgUrl: 'imgUrl2', username: 'testUser2' } },
        { id: 'msg109', createdAt: 1706451931192, msg: 'I was thinking of going to see a movie.', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg110', createdAt: 1706452031192, msg: 'Oh, cool! What do you want to see?', user: { _id: 'u103', imgUrl: 'imgUrl3', username: 'testUser3' } },
        { id: 'msg111', createdAt: 1706452131192, msg: 'I\'m not sure yet. Any suggestions?', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg112', createdAt: 1706452231192, msg: 'I heard the new action movie is really good.', user: { _id: 'u102', imgUrl: 'imgUrl2', username: 'testUser2' } },
        { id: 'msg113', createdAt: 1706452331192, msg: 'Hmm, I\'m not really into action movies.', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg114', createdAt: 1706452431192, msg: 'What about a comedy?', user: { _id: 'u103', imgUrl: 'imgUrl3', username: 'testUser3' } },
        { id: 'msg115', createdAt: 1706452531192, msg: 'Yeah, that could be fun.', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg116', createdAt: 1706452631192, msg: 'I\'ll check the listings and see what\'s playing.', user: { _id: 'u102', imgUrl: 'imgUrl2', username: 'testUser2' } },

      ]
    }, {
      id: 'cr103', name: 'Memes', chatMsgs: [
        { id: 'msg101', createdAt: 1706440431192, msg: 'This is message 1', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg102', createdAt: 1706441431192, msg: 'This is message 2', user: { _id: 'u102', imgUrl: 'imgUrl2', username: 'testUser2' } },
        { id: 'msg103', createdAt: 1706451331192, msg: 'This is message 3', user: { _id: 'u101', imgUrl: 'imgUrl1', username: 'testUser1' } },
        { id: 'msg104', createdAt: 1706451431192, msg: 'This is message 4', user: { _id: 'u103', imgUrl: 'imgUrl3', username: 'testUser3' } },
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
