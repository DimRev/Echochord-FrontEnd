import { useContext } from 'react'
import { Outlet } from 'react-router-dom'

import {
  SelectedServerContext,
  SelectedServerContextType,
} from '../context/SelectedServerContext'
import {
  SelectedChannelContext,
  SelectedChannelContextType,
} from '../context/SelectedChannelContext'

import ChannelLinksCollapsable from './ui/ChannelLinkCollapsable'
import LoggedinUserShield from './ui/LoggedinUserShield'

import ChevronDownIcon from './svgs/ChevronDownIcon'

type PropType = {}

export default function ServerMainSection({}: PropType) {
  const { selectedServer } = useContext(
    SelectedServerContext,
  ) as SelectedServerContextType

  const { setSelectedTextChannel, setSelectedVoiceChannel } = useContext(
    SelectedChannelContext,
  ) as SelectedChannelContextType

  function onSelectTextChannel(TextChannelId: string): void {
    const textChannel = selectedServer?.textChannels.find(
      (textChannel) => textChannel.id === TextChannelId,
    )
    if (textChannel) setSelectedTextChannel(textChannel)
  }

  function onSelectVoiceChannel(VoiceChannelId: string): void {
    const voiceChannel = selectedServer?.voiceChannels.find(
      (voiceChannel) => voiceChannel.id === VoiceChannelId,
    )
    if (voiceChannel) setSelectedVoiceChannel(voiceChannel)
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
