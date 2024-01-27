import { useContext } from 'react'
import { Server } from '../services/api/server.service'
import { SelectedServerContext } from '../context/SelectedServerContext'
import ChannelLinksCollapsable from './ui/ChannelLinkCollapsable'

export default function ChannelSideBar() {
  const selectedServer = useContext<Server | null>(SelectedServerContext)
  return (
    <section className="room-sidebar">
      <ChannelLinksCollapsable
        type={'text'}
        channels={selectedServer?.textChannels}
      />
      <ChannelLinksCollapsable
        type={'voice'}
        channels={selectedServer?.voiceChannels}
      />
    </section>
  )
}
