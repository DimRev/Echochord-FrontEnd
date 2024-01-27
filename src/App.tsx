import { useEffect, useState } from 'react'
import ChatPage from './pages/ChatPage'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Server, serverService } from './services/api/server.service'
import { SelectedServerContext } from './context/SelectedServerContext'
import { ServersContext } from './context/ServersContext'

function App() {
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

  return (
    <ServersContext.Provider value={{ servers, setServers }}>
      <SelectedServerContext.Provider
        value={{ selectedServer, setSelectedServer }}>
        <Router>
          <Routes>
            <Route path="/" element={<ChatPage />}></Route>
          </Routes>
        </Router>
      </SelectedServerContext.Provider>
    </ServersContext.Provider>
  )
}

export default App
