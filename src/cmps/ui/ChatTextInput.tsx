import EmojiIcon from '../svgs/EmojiIcon'
import GifIcon from '../svgs/GifIcon'
import GiftIcon from '../svgs/GiftIcon'
import PlusIcon from '../svgs/PlusIcon'
import StickerIcon from '../svgs/StickerIcon'

export default function ChatTextInput() {
  return (
    <section className="text-input">
      <div className="container left-container">
        <div className="icon-wrapper plus-icon-wrapper">
          <PlusIcon />
        </div>
      </div>
      <input type="text" />
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
    </section>
  )
}
