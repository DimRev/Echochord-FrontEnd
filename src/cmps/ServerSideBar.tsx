import { useContext } from 'react'
import { ServersContexts } from '../context/ServersContext'
import ServerAvatar from './ui/ServerAvatar'

import { OnSelectServer } from '../pages/ChatPage'
import { Server } from '../services/api/server.service'

type PropType = {
  onSelectServer: OnSelectServer
}

export default function ServerSideBar({ onSelectServer }: PropType) {
  const servers: Server[] | null = useContext(ServersContexts)
  return (
    <section className="server-sidebar">
      {servers?.map((server, idx) => (
        <ServerAvatar
          key={idx}
          serverId={server._id}
          name={server.name}
          imgUrl={server.imgUrl}
          onSelectServer={onSelectServer}
        />
      ))}
    </section>
  )
}
