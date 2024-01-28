import { useContext } from 'react'

import {
  SelectedServerContext,
  SelectedServerContextType,
} from '../context/SelectedServerContext'
import { ServersContext, ServersContextType } from '../context/ServersContext'

import ServerAvatar from './ui/ServerAvatar'

type PropType = {}

export default function ServerSideBar({}: PropType) {
  const { servers } = useContext(ServersContext) as ServersContextType
  const { selectedServer, setSelectedServer } = useContext(
    SelectedServerContext,
  ) as SelectedServerContextType

  function onSelectServer(serverId: string): void {
    const server = servers?.find((server) => server._id === serverId)
    if (server) setSelectedServer(server)
  }

  return (
    <section className="server-sidebar">
      {servers?.map((server, idx) => (
        <ServerAvatar
          key={idx}
          serverId={server._id}
          name={server.name}
          imgUrl={server.imgUrl}
          onSelectServer={onSelectServer}
          selectedServerId={selectedServer?._id}
        />
      ))}
    </section>
  )
}
