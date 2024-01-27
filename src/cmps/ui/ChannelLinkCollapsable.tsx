import { useState } from 'react'
import { TextChannel, VoiceChannel } from '../../services/api/server.service'
import { OnSelectTextChannel, OnSelectVoiceChannel } from '../../pages/ChatPage'

type PropType = {
  type: 'text' | 'voice'
  channels: TextChannel[] | VoiceChannel[] | undefined
  onSelectChannel: OnSelectTextChannel | OnSelectVoiceChannel
}
export default function ChannelLinkCollapsable({
  type,
  channels,
  onSelectChannel,
}: PropType) {
  const [isOpen, setIsOpen] = useState<boolean>(true)
  return (
    <div>
      <button onClick={() => setIsOpen((b) => !b)}>
        {`${isOpen ? 'V ' : '> '} ` + type.toUpperCase() + ' CHANNELS'}
      </button>
      {!(channels && isOpen)
        ? null
        : channels.map((channel) => (
            <ChannelLink
              type={type}
              channel={channel}
              onSelectChannel={onSelectChannel}
            />
          ))}
    </div>
  )
}

type ChannelPropType = {
  type: 'text' | 'voice'
  channel: TextChannel | VoiceChannel
  onSelectChannel: OnSelectTextChannel | OnSelectVoiceChannel
}
function ChannelLink({ type, channel, onSelectChannel }: ChannelPropType) {
  function handleChannelClick(channelId: string) {
    onSelectChannel(channelId)
  }
  return (
    <div onClick={() => handleChannelClick(channel.id)}>
      {type === 'text' ? '#️⃣' : type === 'voice' ? '🔊' : ''} {channel.name}
    </div>
  )
}
