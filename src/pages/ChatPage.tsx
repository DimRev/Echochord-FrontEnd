import { useEffect, useState } from 'react'
import ChatSection from '../cmps/ChatSection'
import RoomSideBar from '../cmps/RoomSideBar'
import ServerSideBar from '../cmps/ServerSideBar'
import { SelectedServerContext } from '../context/SelectedServerContext'
import { Server, serverService } from '../services/api/server.service'
import { ServersContexts } from '../context/ServersContext'

export default function ChatPage() {
  const [servers, setServers] = useState<Server[] | null>(null)
  const [selectedServer, setSelectedServer] = useState<Server | null>(null)

  useEffect(() => {
    loadServers()
  }, [])

  async function loadServers() {
    const servers = await serverService.getServers()
    try {
      setServers(servers)
    } catch (err) {
      console.error('Error loading servers', err)
    }
  }

  return (
    <section className="page chat-page">
      <ServersContexts.Provider value={servers}>
        <ServerSideBar />
        <SelectedServerContext.Provider value={selectedServer}>
          <RoomSideBar />
          <ChatSection />
        </SelectedServerContext.Provider>
      </ServersContexts.Provider>
    </section>
  )
}
