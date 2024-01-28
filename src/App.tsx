import { useEffect, useState } from 'react'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'

import { SelectedServerContext } from './context/SelectedServerContext'
import { ServersContext } from './context/ServersContext'
import { LoggedinUserContext } from './context/LoggedinUserContext'

import { User, userService } from './services/api/user.service'
import { Server, serverService } from './services/api/server.service'

import ChatPage from './pages/ChatPage'
import ServerSideBar from './cmps/ServerSideBar'
import ChannelTextSection from './cmps/ChannelTextSection'
import ServerMainSection from './cmps/ServerMainSection'

function App() {
  const [servers, setServers] = useState<Server[] | null>(null)
  const [selectedServer, setSelectedServer] = useState<Server | null>(null)
  const [loggedinUser, setLoggedinUser] = useState<User | null>(null)

  useEffect(() => {
    loadServers()
    //!for frontEnd Testing!
    loginTestUser()
  }, [])

  async function loadServers(): Promise<void> {
    const servers = await serverService.getServers()
    try {
      setServers(servers)
    } catch (err) {
      console.error('Error loading servers', err)
    }
  }
  async function loginTestUser() {
    const user = await userService.getUserById('u105')
    try {
      setLoggedinUser(user)
    } catch (err) {
      console.error('Error logging user', err)
    }
  }

  return (
    <section className="app">
      <LoggedinUserContext.Provider value={{ loggedinUser, setLoggedinUser }}>
        <ServersContext.Provider value={{ servers, setServers }}>
          <SelectedServerContext.Provider
            value={{ selectedServer, setSelectedServer }}>
            <Router>
              <ServerSideBar />
              <Routes>
                <Route path="/" element={<ChatPage />}>
                  <Route index path="/" element={<ChannelTextSection />} />
                  <Route path="/:serverId" element={<ServerMainSection />}>
                    <Route
                      index
                      path="/:serverId/:channelId"
                      element={<ChannelTextSection />}
                    />
                  </Route>
                </Route>
              </Routes>
            </Router>
          </SelectedServerContext.Provider>
        </ServersContext.Provider>
      </LoggedinUserContext.Provider>
    </section>
  )
}

export default App
