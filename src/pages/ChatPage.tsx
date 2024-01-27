import { useEffect, useState } from 'react'
import ChatSection from '../cmps/ChatSection'
import ChannelSideBar from '../cmps/ChannelSideBar'
import ServerSideBar from '../cmps/ServerSideBar'
import { SelectedServerContext } from '../context/SelectedServerContext'
import { Server, serverService } from '../services/api/server.service'
import { ServersContexts } from '../context/ServersContext'

export type OnSelectedServer = (serverId: string) => void

export default function ChatPage() {
  const [servers, setServers] = useState<Server[] | null>(null)
  const [selectedServer, setSelectedServer] = useState<Server | null>(null)

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

  return (
    <section className="page chat-page">
      <ServersContexts.Provider value={servers}>
        <ServerSideBar onSelectServer={onSelectServer} />
        <SelectedServerContext.Provider value={selectedServer}>
          <ChannelSideBar />
          <ChatSection />
        </SelectedServerContext.Provider>
      </ServersContexts.Provider>
    </section>
  )
}
