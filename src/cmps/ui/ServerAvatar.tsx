import { useState } from 'react'
import { NavLink } from 'react-router-dom'

type PropType = {
  serverId: string
  imgUrl?: string
  defTextChannelId: string
  name: string
  selectedServerId: string | undefined
  onSelectServer(serverId: string, textChannelId: string): void
}
export default function ServerAvatar({
  serverId,
  imgUrl,
  name,
  selectedServerId,
  onSelectServer,
  defTextChannelId,
}: PropType) {
  const [isLoaded, setIsLoaded] = useState<boolean | null>(null)

  function getAbbreviation(name: string): string {
    const word = name.split(' ')
    const abbreviation = word
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
    return abbreviation
  }

  function loadImage(imgUrl: string | null | undefined): Promise<boolean> {
    return new Promise((resolve) => {
      if (imgUrl === null || imgUrl === undefined) return resolve(false)
      const img = new Image()

      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)

      img.src = imgUrl
    })
  }

  ;(async () => {
    const isLoaded = await loadImage(imgUrl)
    setIsLoaded(isLoaded)
  })()

  function isActive() {
    return selectedServerId === serverId
  }

  return (
    <div
      className={`server-avatar ${isActive() ? 'active' : ''}`}
      onClick={() => onSelectServer(serverId, defTextChannelId)}>
      <NavLink to={`/${serverId}/${defTextChannelId ? defTextChannelId : ''}`}>
        {imgUrl && isLoaded ? (
          <img src={imgUrl} alt={name} />
        ) : (
          <span>{getAbbreviation(name)}</span>
        )}
      </NavLink>
    </div>
  )
}
