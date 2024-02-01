import ServerAvatar from './ui/ServerAvatar'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'
import { Server } from '../services/api/server.service'
import { selectServer } from '../store/actions/server.actions'

type PropType = {}

export default function ServerSideBar({}: PropType) {
  const servers: Server[] = useSelector<RootState, Server[]>(
    (storeState) => storeState.server.servers,
  )
  const selectedServer: Server | null = useSelector<RootState, Server | null>(
    (storeState) => storeState.server.selectedServer,
  )

  function onSelectServer(serverId: string): void {
    selectServer(serverId)
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
