import { ChatMsg, chatMsgService } from "../../services/api/ChatMsg.service"
import { User, userService } from "../../services/api/user.service"
import { utilService } from "../../services/helpers/util.service"
import { SET_SELECTED_VOICE_CHANNEL, SUBMIT_CHAT_MSG } from "../reducers/server.reducer"
import { AppDispatch, store } from "../store"

const dispatch: AppDispatch = store.dispatch

export function submitChatMsg(txt: string) {
  const newChatMsg: ChatMsg = {
    createdAt: Date.now(),
    id: utilService.makeId(),
    msg: txt,
    user: userService.createMiniUser(dispatch(store.getState).user.loggedinUser as User)
  }
  const selectedServerId = dispatch(store.getState).server.selectedServer?._id
  const selectedTextChannelId = dispatch(store.getState).server.selectedTextChannel?.id
  if (!selectedServerId || !selectedTextChannelId) return
  dispatch(SUBMIT_CHAT_MSG(newChatMsg))
  chatMsgService.addChatMsg(selectedServerId, selectedTextChannelId, newChatMsg)
}

export function selectVoiceChannel(voiceChannelId: string | undefined) {
  dispatch(SET_SELECTED_VOICE_CHANNEL(voiceChannelId))
}

