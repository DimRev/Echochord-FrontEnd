import { useContext, useState } from 'react'
import ChannelChatSection from '../cmps/ChannelSection'
import ChannelSideBar from '../cmps/ChannelSideBar'
import ServerSideBar from '../cmps/ServerSideBar'
import { TextChannel, VoiceChannel } from '../services/api/server.service'
import { ServersContext, ServersContextType } from '../context/ServersContext'
import {
  SelectedServerContext,
  SelectedServerContextType,
} from '../context/SelectedServerContext'

export type OnSelectServer = (serverId: string) => void
export type OnSelectTextChannel = (channelId: string) => void
export type OnSelectVoiceChannel = (channelId: string) => void

export default function ChatPage() {
  const [selectedTextChannel, setSelectedTextChannel] =
    useState<TextChannel | null>(null)
  const [selectedVoiceChannel, setSelectedVoiceChannel] =
    useState<VoiceChannel | null>(null)

  const { servers } = useContext(ServersContext) as ServersContextType
  const { selectedServer, setSelectedServer } = useContext(
    SelectedServerContext,
  ) as SelectedServerContextType

  function onSelectServer(serverId: string): void {
    const server = servers?.find((server) => server._id === serverId)
    if (server) setSelectedServer(server)
  }

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
    <section className="page chat-page">
      <ServerSideBar onSelectServer={onSelectServer} />
      <ChannelSideBar
        onSelectTextChannel={onSelectTextChannel}
        onSelectVoiceChannel={onSelectVoiceChannel}
      />
      <ChannelChatSection selectedTextChannel={selectedTextChannel} />
    </section>
  )
}
