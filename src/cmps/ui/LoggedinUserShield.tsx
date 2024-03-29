import GearIcon from '../svgs/GearIcon'
import MicIcon from '../svgs/MicIcon'
import SpeakerFullIcon from '../svgs/SpeakerFullIcon'
import UserAvatar from './UserAvatar'

import { useSelector } from 'react-redux'
import { RootState } from '../../store/store'
import { User } from '../../services/api/user.service'

export default function LoggedinUserShield() {
  const loggedinUser: User | null = useSelector<RootState, User | null>(
    (storeState) => storeState.user.loggedinUser,
  )

  if (loggedinUser === null) return <></>
  return (
    <div className="loggedin-user-shield">
      <div className="user-content">
        <div className={`user-logo ${loggedinUser.status}`}>
          <UserAvatar
            username={loggedinUser.username}
            imgUrl={loggedinUser.imgUrl}
          />
        </div>
        <div className="user-details">
          <span>{loggedinUser.username}</span>
          <span>{loggedinUser.status}</span>
        </div>
      </div>
      <div className="user-btns">
        <div className="mic-icon-wrapper">
          <MicIcon />
        </div>
        <div className="headphones-icon-wrapper">
          <SpeakerFullIcon />
        </div>
        <div className="gear-icon-wrapper">
          <GearIcon />
        </div>
      </div>
    </div>
  )
}
