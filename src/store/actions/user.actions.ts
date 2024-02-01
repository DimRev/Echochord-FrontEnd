import { userService } from "../../services/api/user.service"
import { SET_USER } from "../reducers/user.reducer"
import { AppDispatch, store } from "../store"

const dispatch: AppDispatch = store.dispatch

export async function loginTestUser() {
  try {
    const user = await userService.getUserById('u105')
    dispatch(SET_USER(user))
  } catch (err) {
    console.error('Error logging user', err)
  }
}