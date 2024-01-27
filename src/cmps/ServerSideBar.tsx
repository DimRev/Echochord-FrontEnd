import { useContext } from 'react'
import { ServersContext, ServersContextType } from '../context/ServersContext'
import ServerAvatar from './ui/ServerAvatar'

import { OnSelectServer } from '../pages/ChatPage'
import { Server } from '../services/api/server.service'
import {
  SelectedServerContext,
  SelectedServerContextType,
} from '../context/SelectedServerContext'

type PropType = {
  onSelectServer: OnSelectServer
}

export default function ServerSideBar({ onSelectServer }: PropType) {
  const { servers } = useContext(ServersContext) as ServersContextType
  const { selectedServer } = useContext(
    SelectedServerContext,
  ) as SelectedServerContextType

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
