import { SET_SELECTED_TEXT_CHANNEL, SET_SELECTED_VOICE_CHANNEL } from "../reducers/server.reducer"
import { AppDispatch, store } from "../store"

const dispatch: AppDispatch = store.dispatch

export function selectTextChannel(textChannelId: string | undefined) {
  dispatch(SET_SELECTED_TEXT_CHANNEL(textChannelId))
}

export function selectVoiceChannel(voiceChannelId: string | undefined) {
  dispatch(SET_SELECTED_VOICE_CHANNEL(voiceChannelId))
}

