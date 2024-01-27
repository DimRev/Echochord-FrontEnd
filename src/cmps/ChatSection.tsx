import { TextChannel } from '../services/api/server.service'
import ChatMsgPreview from './ui/ChatMsgPreview'

type PropType = {
  selectedTextChannel: TextChannel | null
}
export default function ChatSection({ selectedTextChannel }: PropType) {
  if (selectedTextChannel === null) return <></>
  return (
    <section className="channel-section">
      <section className="channel-title">
        <h2># {selectedTextChannel.name}</h2>
      </section>
      <section className="channel-msgs">
        {selectedTextChannel.chatMsgs.map((msg, idx) => (
          <ChatMsgPreview key={idx} msg={msg} />
        ))}
      </section>
      <section className="channel-input"></section>
    </section>
  )
}
