import { useContext, useEffect, useState } from 'react'
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
  const { setSelectedServer } = useContext(
    SelectedServerContext,
  ) as SelectedServerContextType

  const { servers } = useContext(ServersContext) as ServersContextType
  const { serverId, channelId } = useParams()

  useEffect(() => {
    const server = getServerByServerId(serverId)
    const textChannel = getTextChannelById(channelId)
    if (server && serverId) setSelectedServer(server)
    else setSelectedServer(null)
    if (textChannel && channelId) setSelectedTextChannel(textChannel)
    else setSelectedTextChannel(null)
  }, [serverId, channelId, servers])

  function getServerByServerId(
    serverId: string | undefined,
  ): Server | undefined {
    const server = servers?.find((server) => server._id === serverId)
    return server
  }

  function getTextChannelById(
    channelId: string | undefined,
  ): TextChannel | undefined {
    const server = servers?.find((server) => server._id === serverId)
    const textChannel = server?.textChannels.find(
      (textChannel) => textChannel.id === channelId,
    )
    return textChannel
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
        <Outlet />
      </SelectedChannelContext.Provider>
    </section>
  )
}
