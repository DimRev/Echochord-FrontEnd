type PropType = {
  imgUrl?: string
  name: string
}
export default function ServerAvatar({ imgUrl, name }: PropType) {
  function getAbbreviation(name: string): string {
    const word = name.split(' ')
    const abbreviation = word
      .map((word) => word.charAt(0).toUpperCase())
      .join('')
    return abbreviation
  }
  return (
    <div className="server-avatar">
      {imgUrl ? (
        <img src={imgUrl} alt={name} />
      ) : (
        <span>{getAbbreviation(name)}</span>
      )}
    </div>
  )
}
