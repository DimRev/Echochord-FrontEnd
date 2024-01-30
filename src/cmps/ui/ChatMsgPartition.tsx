import { ChatMsg } from '../../services/api/ChatMsg.service'

type PropTypes = {
  msgs: ChatMsg[]
  msg: ChatMsg
}
export default function ChatMsgPartition({ msgs, msg }: PropTypes) {
  function isFirstOfDate(messages: ChatMsg[], message: ChatMsg): boolean {
    const idx = messages.findIndex((msg) => msg.id === message.id)
    if (idx === 0) return true
    const currDate = new Date(msg.createdAt)
    const prevDate = new Date(messages[idx - 1].createdAt)
    if (
      currDate.getDate() === prevDate.getDate() &&
      currDate.getMonth() === prevDate.getMonth() &&
      currDate.getFullYear() === prevDate.getFullYear()
    )
      return false
    else return true
  }

  function formattedDate(msg: ChatMsg): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
    const partitionDate = new Date(msg.createdAt)
    const monthName = months[partitionDate.getMonth()]
    const date = partitionDate.getDate()
    const year = partitionDate.getFullYear()

    return `${monthName} ${date}, ${year}`
  }

  if (isFirstOfDate(msgs, msg) === false) return <></>
  return (
    <div className="date-partition">
      <div className="line line-left"></div>
      {formattedDate(msg)}
      <div className="line line-right"></div>
    </div>
  )
}
