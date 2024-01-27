import { useContext } from 'react'
import {
  SelectedServerContext,
  SelectedServerContextType,
} from '../context/SelectedServerContext'
import ChannelLinksCollapsable from './ui/ChannelLinkCollapsable'
import ChevronDownIcon from './svgs/ChevronDownIcon'
import {
  SelectedChannelContext,
  SelectedChannelContextType,
} from '../context/SelectedChannelContext'
import { Outlet } from 'react-router-dom'

type PropType = {}

export default function ChannelSideBar({}: PropType) {
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
      <Outlet />
    </>
  )
}
