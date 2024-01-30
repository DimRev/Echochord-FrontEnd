import { ChangeEvent, FormEvent, useState } from 'react'
import EmojiIcon from '../svgs/EmojiIcon'
import GifIcon from '../svgs/GifIcon'
import GiftIcon from '../svgs/GiftIcon'
import PlusIcon from '../svgs/PlusIcon'
import StickerIcon from '../svgs/StickerIcon'

type PropType = {
  onSubmitChatMsg(txt: string): void
}

export default function ChatTextInput({ onSubmitChatMsg }: PropType) {
  const [txt, setTxt] = useState('')

  function handleSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    onSubmitChatMsg(txt)
    setTxt('')
  }

  function handleChange(ev: ChangeEvent<HTMLInputElement>) {
    setTxt(ev.target.value)
  }

  return (
    <form className="text-input" onSubmit={handleSubmit}>
      <div className="container left-container">
        <div className="icon-wrapper plus-icon-wrapper">
          <PlusIcon />
        </div>
      </div>
      <input type="text" value={txt} onChange={handleChange} />
      <div className="container right-container">
        <div className="icon-wrapper gift-icon-wrapper">
          <GiftIcon />
        </div>
        <div className="icon-wrapper gif-icon-wrapper">
          <GifIcon />
        </div>
        <div className="icon-wrapper sticker-icon-wrapper">
          <StickerIcon />
        </div>
        <div className="icon-wrapper emoji-icon-wrapper">
          <EmojiIcon />
        </div>
      </div>
    </form>
  )
}
