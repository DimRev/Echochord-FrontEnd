import GearIcon from '../svgs/GearIcon'
import MicIcon from '../svgs/MicIcon'
import SpeakerFullIcon from '../svgs/SpeakerFullIcon'
import UserAvatar from './UserAvatar'

export default function LoggedinUserShield() {
  const username = 'Dima R'
  const active = 'active'
  return (
    <div className="loggedin-user-shield">
      <div className="user-logo">
        <UserAvatar username={username} />
      </div>
      <div className="user-details">
        <span>{username}</span>
        <span>{active}</span>
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
