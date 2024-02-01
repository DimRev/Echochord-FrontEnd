import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'

// import { SelectedServerContext } from './context/SelectedServerContext'
// import { ServersContext } from './context/ServersContext'
// import { LoggedinUserContext } from './context/LoggedinUserContext'

import ChatPage from './pages/ChatPage'
import ServerSideBar from './cmps/ServerSideBar'
import ChannelTextSection from './cmps/ChannelMainSection'
import ServerMainSection from './cmps/ServerMainSection'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { useEffect } from 'react'
import { loginTestUser } from './store/actions/user.actions'

function App() {
  useEffect(() => {
    loginTestUser()
  }, [])

  return (
    <section className="app">
      <Provider store={store}>
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
      </Provider>
    </section>
  )
}

export default App
