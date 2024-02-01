import { useEffect } from 'react'
import { loadServers, selectServer } from '../store/actions/server.actions'
import { selectTextChannel } from '../store/actions/channel.actions'
import { RootState } from '../store/store'
import { Outlet, useParams } from 'react-router-dom'

export type OnSelectServer = (serverId: string) => void
export type OnSelectTextChannel = (channelId: string) => void
export type OnSelectVoiceChannel = (channelId: string) => void

export default function ChatPage() {
  const { serverId, channelId } = useParams()

  useEffect(() => {
    routeLoad()
  }, [])

  async function routeLoad() {
    await loadServers()
    if (serverId) selectServer(serverId)
    else selectServer('')
    if (channelId) selectTextChannel(channelId)
    else selectTextChannel('')
  }

  return (
    <section className="page chat-page">
      <Outlet />
    </section>
  )
}
