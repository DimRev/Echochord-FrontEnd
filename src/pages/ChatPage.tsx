import ChatSection from '../cmps/ChatSection'
import RoomSideBar from '../cmps/RoomSideBar'
import ServerSideBar from '../cmps/ServerSideBar'

export default function ChatPage() {
  return (
    <section className="page chat-page">
      <ServerSideBar />
      <RoomSideBar />
      <ChatSection />
    </section>
  )
}
