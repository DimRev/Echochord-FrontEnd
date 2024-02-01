import React from 'react'

import HashtagIcon from './svgs/HashtagIcon'
import ChatMsgPreview from './ui/ChatMsgPreview'
import ChatTextInput from './ui/ChatTextInput'
import ChatMsgPartition from './ui/ChatMsgPartition'
import { RootState } from '../store/store'
import { useSelector } from 'react-redux'
import { TextChannel } from '../services/api/textChannel.service'
import { submitChatMsg } from '../store/actions/chat.actions'

type PropType = {}
export default function ChannelTextSection({}: PropType) {
  const selectedTextChannel: TextChannel | null = useSelector<
    RootState,
    TextChannel | null
  >((storeState) => storeState.server.selectedTextChannel)

  // TODO: REFACTOR CODE BELOW TO "ACTION" LIKE EXECUTION
  async function onSubmitChatMsg(txt: string) {
    submitChatMsg(txt)
  }

  if (selectedTextChannel === null) return <></>

  return (
    <section className="channel-chat-section">
      <header className="channel-chat-header">
        <HashtagIcon />
        <span>{selectedTextChannel.name}</span>
      </header>
      <section className="chat-msgs">
        {selectedTextChannel.chatMsgs.map((msg, idx) => (
          <React.Fragment key={idx}>
            <ChatMsgPartition msgs={selectedTextChannel.chatMsgs} msg={msg} />
            <ChatMsgPreview msg={msg} />
          </React.Fragment>
        ))}
      </section>
      <section className="chat-input-section">
        <ChatTextInput onSubmitChatMsg={onSubmitChatMsg} />
      </section>
    </section>
  )
}
