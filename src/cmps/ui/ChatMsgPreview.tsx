import { ChatMsg } from '../../services/api/server.service'

type PropType = {
  msg: ChatMsg
}

export default function ChatMsgPreview({ msg }: PropType) {
  return (
    <article className="chat-msg-card">
      <h4>{msg.user.username}</h4>
      <p>{msg.msg}</p>
    </article>
  )
}
