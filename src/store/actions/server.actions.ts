import { serverService } from "../../services/api/server.service"
import { SET_SELECTED_SERVER, SET_SERVERS } from "../reducers/server.reducer"
import { AppDispatch, store } from "../store"

const dispatch: AppDispatch = store.dispatch

export async function loadServers() {
  try {
    const servers = await serverService.getServers()
    dispatch(SET_SERVERS(servers))
  } catch (err) {
    console.error('Error loading servers', err)
  }
}

export async function selectServer(serverId: string | undefined) {
  try {
    dispatch(SET_SELECTED_SERVER(serverId))
  } catch (err) {

  }
}