import { useEffect, useState } from 'react'
import ChannelChatSection from '../cmps/ChannelSection'
import ChannelSideBar from '../cmps/ChannelSideBar'
import ServerSideBar from '../cmps/ServerSideBar'
import { SelectedServerContext } from '../context/SelectedServerContext'
import {
  Server,
  TextChannel,
  VoiceChannel,
  serverService,
} from '../services/api/server.service'
import { ServersContexts } from '../context/ServersContext'

export type OnSelectServer = (serverId: string) => void
export type OnSelectTextChannel = (channelId: string) => void
export type OnSelectVoiceChannel = (channelId: string) => void

export default function ChatPage() {
  const [servers, setServers] = useState<Server[] | null>(null)
  const [selectedServer, setSelectedServer] = useState<Server | null>(null)
  const [selectedTextChannel, setSelectedTextChannel] =
    useState<TextChannel | null>(null)
  const [selectedVoiceChannel, setSelectedVoiceChannel] =
    useState<VoiceChannel | null>(null)

  useEffect(() => {
    loadServers()
  }, [])

  async function loadServers(): Promise<void> {
    const servers = await serverService.getServers()
    try {
      setServers(servers)
    } catch (err) {
      console.error('Error loading servers', err)
    }
  }

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
      <ServersContexts.Provider value={servers}>
        <SelectedServerContext.Provider value={selectedServer}>
          <ServerSideBar onSelectServer={onSelectServer} />
          <ChannelSideBar
            onSelectTextChannel={onSelectTextChannel}
            onSelectVoiceChannel={onSelectVoiceChannel}
          />
          <ChannelChatSection selectedTextChannel={selectedTextChannel} />
        </SelectedServerContext.Provider>
      </ServersContexts.Provider>
    </section>
  )
}
