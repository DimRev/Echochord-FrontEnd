import { useContext } from 'react'
import { Server } from '../services/api/server.service'
import { SelectedServerContext } from '../context/SelectedServerContext'
import ChannelLinksCollapsable from './ui/ChannelLinkCollapsable'
import { OnSelectTextChannel, OnSelectVoiceChannel } from '../pages/ChatPage'

type PropType = {
  onSelectTextChannel: OnSelectTextChannel
  onSelectVoiceChannel: OnSelectVoiceChannel
}

export default function ChannelSideBar({
  onSelectTextChannel,
  onSelectVoiceChannel,
}: PropType) {
  const selectedServer = useContext<Server | null>(SelectedServerContext)

  return (
    <section className="room-sidebar">
      <ChannelLinksCollapsable
        type={'text'}
        channels={selectedServer?.textChannels}
        onSelectChannel={onSelectTextChannel}
      />
      <ChannelLinksCollapsable
        type={'voice'}
        channels={selectedServer?.voiceChannels}
        onSelectChannel={onSelectVoiceChannel}
      />
    </section>
  )
}
