import { useState } from 'react'

type PropType = {
  imgUrl?: string
  username: string
}
export default function UserAvatar({ imgUrl, username }: PropType) {
  const [isLoaded, setIsLoaded] = useState<boolean | null>(null)

  function getAbbreviation(name: string): string {
    const word = name.split(' ')
    const abbreviation = word
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
    const firstTwoLetters = abbreviation.slice(0, 2)
    return firstTwoLetters
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

  return (
    <div className="user-avatar">
      <div>
        {imgUrl && isLoaded ? (
          <img src={imgUrl} alt={username} />
        ) : (
          <span>{getAbbreviation(username)}</span>
        )}
      </div>
    </div>
  )
}
