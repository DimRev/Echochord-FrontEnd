import { useContext } from 'react'
import { ServersContexts } from '../context/ServersContext'
import ServerAvatar from './ui/ServerAvatar'

export default function ServerSideBar() {
  const servers = useContext(ServersContexts)
  return (
    <section className="server-sidebar">
      {servers?.map((server, idx) => (
        <ServerAvatar key={idx} name={server.name} imgUrl={server.imgUrl} />
      ))}
    </section>
  )
}
