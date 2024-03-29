import { useState } from 'react'
import { NavLink } from 'react-router-dom'

import HashtagIcon from '../svgs/HashtagIcon'
import SpeakerIcon from '../svgs/SpeakerIcon'
import ChevronDownIcon from '../svgs/ChevronDownIcon'
import ChevronRightIcon from '../svgs/ChevronRightIcon'

import { Server, VoiceChannel } from '../../services/api/server.service'
import { TextChannel } from '../../services/api/textChannel.service'

import { OnSelectTextChannel, OnSelectVoiceChannel } from '../../pages/ChatPage'
import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'

type PropType = {
  type: 'voice' | 'text'
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
    <section className="channel-links-collapsable">
      <div className="expend-btn" onClick={() => setIsOpen((b) => !b)}>
        {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
        {type.toUpperCase() + ' CHANNELS'}
      </div>
      {!(channels && isOpen)
        ? null
        : channels.map((channel, idx) => (
            <ChannelLink
              key={idx}
              type={type}
              channel={channel}
              onSelectChannel={onSelectChannel}
            />
          ))}
    </section>
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
  const selectedServer: Server | null = useSelector<RootState, Server | null>(
    (storeState) => storeState.server.selectedServer,
  )
  return (
    <article
      className="channel-link"
      onClick={() => handleChannelClick(channel.id)}>
      <NavLink
        to={`/${selectedServer?._id}/${channel.id}`}
        className={'nav-link'}>
        {type === 'text' ? (
          <HashtagIcon />
        ) : type === 'voice' ? (
          <SpeakerIcon />
        ) : (
          ''
        )}{' '}
        {channel.name}
      </NavLink>
    </article>
  )
}
