import { utilService } from '../../services/helpers/util.service'
import { ChatMsg } from '../../services/api/server.service'
import UserAvatar from './UserAvatar'

type PropType = {
  msg: ChatMsg
}

export default function ChatMsgPreview({ msg }: PropType) {
  return (
    <article className="chat-msg-card">
      <UserAvatar username={msg.user.username} imgUrl={msg.user.imgUrl} />
      <header className="chat-header">
        <span className="chat-user-name">{msg.user.username}</span>
        <span className="chat-time-diff">
          {utilService.getTimeDifference(msg.createdAt)}
        </span>
      </header>
      <p className="chat-msg-content">{msg.msg}</p>
    </article>
  )
}
