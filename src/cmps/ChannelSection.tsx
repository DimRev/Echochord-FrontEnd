import { TextChannel } from '../services/api/server.service'
import HashtagIcon from './svgs/HashtagIcon'
import ChatMsgPreview from './ui/ChatMsgPreview'

type PropType = {
  selectedTextChannel: TextChannel | null
}
export default function ChannelChatSection({ selectedTextChannel }: PropType) {
  if (selectedTextChannel === null) return <></>

  return (
    <section className="channel-chat-section">
      <header className="channel-chat-header">
        <HashtagIcon />
        <span>{selectedTextChannel.name}</span>
      </header>
      <section className="chat-msgs">
        {selectedTextChannel.chatMsgs.map((msg, idx) => (
          <ChatMsgPreview key={idx} msg={msg} />
        ))}
      </section>
      <section className="chat-input"></section>
    </section>
  )
}
