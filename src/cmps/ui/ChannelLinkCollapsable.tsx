import { useState } from 'react'
import { TextChannel, VoiceChannel } from '../../services/api/server.service'

type PropType = {
  type: 'text' | 'voice'
  channels: VoiceChannel[] | TextChannel[] | undefined
}
export default function ChannelLinkCollapsable({ type, channels }: PropType) {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  return (
    <div>
      <button onClick={() => setIsOpen((b) => !b)}>
        {`${isOpen ? 'V ' : '> '} ` + type.toUpperCase() + ' CHANNELS'}
      </button>
      {!(channels && isOpen)
        ? null
        : channels.map((channel) => (
            <ChannelLink type={type} channel={channel} />
          ))}
    </div>
  )
}

type ChannelPropType = {
  type: 'text' | 'voice'
  channel: VoiceChannel | TextChannel
}
function ChannelLink({ type, channel }: ChannelPropType) {
  return (
    <div>
      {type === 'text' ? '#️⃣' : type === 'voice' ? '🔊' : ''} {channel.name}
    </div>
  )
}
