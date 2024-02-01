import { Outlet } from 'react-router-dom'
import ChannelLinksCollapsable from './ui/ChannelLinkCollapsable'
import LoggedinUserShield from './ui/LoggedinUserShield'

import ChevronDownIcon from './svgs/ChevronDownIcon'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Server } from '../services/api/server.service'
import {
  selectTextChannel,
  selectVoiceChannel,
} from '../store/actions/channel.actions'

type PropType = {}

export default function ServerMainSection({}: PropType) {
  const selectedServer: Server | null = useSelector<RootState, Server | null>(
    (storeState) => storeState.server.selectedServer,
  )

  function onSelectTextChannel(textChannelId: string): void {
    selectTextChannel(textChannelId)
  }

  function onSelectVoiceChannel(voiceChannelId: string): void {
    selectVoiceChannel(voiceChannelId)
  }

  return (
    <>
      <section className="channel-sidebar">
        <header className="channel-sidebar-header">
          <span>{selectedServer?.name}</span> <ChevronDownIcon />
        </header>
        <main className="channel-sidebar-content">
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
        </main>
        <footer className="channel-sidebar-footer">
          <LoggedinUserShield />
        </footer>
      </section>
      <Outlet />
    </>
  )
}
