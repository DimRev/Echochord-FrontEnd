import { useContext, useEffect, useState } from 'react'
import ChannelSideBar from '../cmps/ChannelSideBar'
import {
  Server,
  TextChannel,
  VoiceChannel,
} from '../services/api/server.service'
import {
  SelectedServerContext,
  SelectedServerContextType,
} from '../context/SelectedServerContext'
import { Outlet, useParams } from 'react-router-dom'
import { SelectedChannelContext } from '../context/SelectedChannelContext'
import { ServersContext, ServersContextType } from '../context/ServersContext'

export type OnSelectServer = (serverId: string) => void
export type OnSelectTextChannel = (channelId: string) => void
export type OnSelectVoiceChannel = (channelId: string) => void

export default function ChatPage() {
  const [selectedTextChannel, setSelectedTextChannel] =
    useState<TextChannel | null>(null)
  const [selectedVoiceChannel, setSelectedVoiceChannel] =
    useState<VoiceChannel | null>(null)
  const { selectedServer, setSelectedServer } = useContext(
    SelectedServerContext,
  ) as SelectedServerContextType
  const { servers } = useContext(ServersContext) as ServersContextType

  const { serverId } = useParams()
  useEffect(() => {
    const server = getServerByServerId(serverId)
    if (server) setSelectedServer(server)
  }, [serverId, servers])

  function getServerByServerId(
    serverId: string | undefined,
  ): Server | undefined {
    const server = servers?.find((server) => server._id === serverId)
    return server
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
      <SelectedChannelContext.Provider
        value={{
          selectedTextChannel,
          selectedVoiceChannel,
          setSelectedTextChannel,
          setSelectedVoiceChannel,
        }}>
        <ChannelSideBar
          onSelectTextChannel={onSelectTextChannel}
          onSelectVoiceChannel={onSelectVoiceChannel}
        />
        <Outlet />
      </SelectedChannelContext.Provider>
    </section>
  )
}
