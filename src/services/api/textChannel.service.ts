import { storageService } from "../helpers/async-storage.service"
import { utilService } from "../helpers/util.service"
import { ChatMsg } from "./chatMsg.service"
import { Server, serverService } from "./server.service"

export type TextChannel = {
  id: string
  name: string
  chatMsgs: ChatMsg[]
}

type NewTextChannel = Omit<TextChannel, 'id'>

export const textChannelService = {
  getTextChannels,
  getTextChannelById,
  addTextChannel,
  updateTextChannel,
  deleteTextChannel,
  getEmptyTextChannel,
}

const DB_KEY = 'serverDB'
// const BASE_URL = 'server/'



async function getTextChannels(serverId: string): Promise<TextChannel[]> {
  try {
    const server = await storageService.get<Server>(DB_KEY, serverId) as Server
    const textChannels = [...server.textChannels]
    if (!textChannels) throw new Error(`No text channels on server ${serverId}`)
    return textChannels
  } catch (err) {
    throw new Error('Could not find server')
  }

}

async function getTextChannelById(serverId: string, textChannelId: string): Promise<TextChannel> {
  try {
    const server = await storageService.get<Server>(DB_KEY, serverId)
    const textChannel = server.textChannels.find(textChannel => textChannel.id === textChannelId)

    if (!textChannel) throw new Error(`Could not find text channel ${textChannelId} on ${serverId}`)
    return textChannel
  } catch (err) {
    throw new Error('Could not find server')
  }
}

async function addTextChannel(serverId: string, textChannel: NewTextChannel): Promise<TextChannel> {
  try {
    const server = await storageService.get<Server>(DB_KEY, serverId)
    const newTextChannel: TextChannel = { ...textChannel, id: utilService.makeId() }

    const newServer = { ...server, textChannels: [...server.textChannels, newTextChannel] }
    const updatedServer = await serverService.updateServer(newServer)
    if (!updatedServer) throw new Error(`Could not update server ${serverId}`)
    return newTextChannel
  } catch (err) {
    throw new Error('Could not find server')
  }
}

async function updateTextChannel(serverId: string, textChannel: TextChannel): Promise<TextChannel> {
  try {
    const server = await storageService.get<Server>(DB_KEY, serverId)

    const newServer = {
      ...server, textChannels: server.textChannels.map(currTextChannel => {
        if (currTextChannel.id !== textChannel.id) return currTextChannel
        return textChannel
      })
    }
    const updatedServer = await serverService.updateServer(newServer)
    if (!updatedServer) throw new Error(`Could not update server ${serverId}`)
    return textChannel
  } catch (err) {
    throw new Error('Could not find server')
  }
}

async function deleteTextChannel(serverId: string, textChannelId: string): Promise<string> {
  try {
    const server = await storageService.get<Server>(DB_KEY, serverId)

    const newServer = {
      ...server, textChannels: server.textChannels.filter(currTextChannel => {
        return currTextChannel.id !== textChannelId
      })
    }
    const updatedServer = await serverService.updateServer(newServer)
    if (!updatedServer) throw new Error(`Could not update server ${serverId}`)
    return textChannelId
  } catch (err) {
    throw new Error('Could not find server')
  }
}

function getEmptyTextChannel(): NewTextChannel {
  return {
    chatMsgs: [],
    name: ''
  }
}
