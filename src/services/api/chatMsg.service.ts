import { storageService } from "../helpers/async-storage.service"
import { utilService } from "../helpers/util.service"
import { Server, serverService } from "./server.service"
import { MiniUser } from "./user.service"

export type ChatMsg = {
  id: string
  msg: string
  createdAt: number
  user: MiniUser
}

type NewChatMsg = Omit<ChatMsg, 'id'>

export const chatMsgService = {
  getChatMsgs,
  getChatMsgById,
  addChatMsg,
  updateChatMsg,
  deleteChatMsg
}

const DB_KEY = 'serverDB'
// const BASE_URL = 'server/'



async function getChatMsgs(serverId: string, textChannelId: string): Promise<ChatMsg[]> {
  try {
    const server = await storageService.get(DB_KEY, serverId) as Server
    const textChannel = server.textChannels.find(textChannel => textChannel.id === textChannelId)
    if (!textChannel) throw new Error(`No text channel ${textChannelId} on server ${serverId}`)
    const chatMsgs = [...textChannel.chatMsgs]
    if (!chatMsgs) throw new Error(`No chat msgs on channel ${textChannelId} of server ${serverId}`)
    return chatMsgs
  } catch (err) {
    throw new Error('Could not find server')
  }

}

async function getChatMsgById(serverId: string, textChannelId: string, chatMsgId: string): Promise<ChatMsg> {
  try {
    const server = await storageService.get(DB_KEY, serverId) as Server
    const textChannel = server.textChannels.find(textChannel => textChannel.id === textChannelId)
    if (!textChannel) throw new Error(`Could not find text channel ${textChannelId} on ${serverId}`)
    const chatMsg = textChannel.chatMsgs.find(chatMsg => chatMsg.id === chatMsgId)
    if (!chatMsg) throw new Error(`Could not find chat msg ${chatMsgId} on channel ${textChannelId} of server ${serverId}`)
    return chatMsg
  } catch (err) {
    throw new Error('Could not find server')
  }
}

async function addChatMsg(serverId: string, textChannelId: string, chatMsg: NewChatMsg): Promise<ChatMsg> {
  try {
    const server = await storageService.get(DB_KEY, serverId) as Server
    const newChatMsg: ChatMsg = { ...chatMsg, id: utilService.makeId() }

    const newServer = {
      ...server, textChannels: server.textChannels.map(textChannel => {
        if (textChannel.id !== textChannelId) return textChannel
        return { ...textChannel, chatMsgs: [...textChannel.chatMsgs, newChatMsg] }
      })
    }
    const updatedServer = await serverService.updateServer(newServer)
    if (!updatedServer) throw new Error(`Could not update server ${serverId}`)
    return newChatMsg
  } catch (err) {
    throw new Error('Could not find server')
  }
}

async function updateChatMsg(serverId: string, textChannelId: string, chatMsg: ChatMsg): Promise<ChatMsg> {
  try {
    const server = await storageService.get(DB_KEY, serverId) as Server

    const newServer = {
      ...server, textChannels: server.textChannels.map(textChannel => {
        if (textChannel.id !== textChannelId) return textChannel
        return {
          ...textChannel, chatMsgs: textChannel.chatMsgs.map(currChatMsg => {
            if (currChatMsg.id !== chatMsg.id) return currChatMsg
            return chatMsg
          })
        }
      })
    }
    const updatedServer = await serverService.updateServer(newServer)
    if (!updatedServer) throw new Error(`Could not update server ${serverId}`)
    return chatMsg
  } catch (err) {
    throw new Error('Could not find server')
  }
}

async function deleteChatMsg(serverId: string, textChannelId: string, chatMsgId: string): Promise<string> {
  try {
    const server = await storageService.get(DB_KEY, serverId) as Server

    const newServer = {
      ...server, textChannels: server.textChannels.map(textChannel => {
        if (textChannel.id !== textChannelId) return textChannel
        return {
          ...textChannel, chatMsgs: textChannel.chatMsgs.filter(currChatMsg => {
            return currChatMsg.id !== chatMsgId
          })
        }
      })
    }
    const updatedServer = await serverService.updateServer(newServer)
    if (!updatedServer) throw new Error(`Could not update server ${serverId}`)
    return chatMsgId
  } catch (err) {
    throw new Error('Could not find server')
  }
}
