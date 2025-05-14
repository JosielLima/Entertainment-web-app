import { useBookmarks } from '../hooks/useBookmarks'
import { useState } from 'react'
import bookmarkEmpty from '../assets/icon-bookmark-empty.svg'
import bookmarkFull from '../assets/icon-bookmark-full.svg'

interface BookmarkButtonProps {
  mediaId: string
}

export function BookmarkButton({ mediaId }: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark } = useBookmarks()
  const [isHovered, setIsHovered] = useState(false)

  return (
    <button
      className="absolute top-2 right-2 p-2 bg-black/40 rounded-full transition-transform hover:scale-110"
      onClick={(e) => {
        e.stopPropagation()
        toggleBookmark(mediaId)
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={isBookmarked(mediaId) ? bookmarkFull : bookmarkEmpty}
        alt="Bookmark"
        className={`w-4 h-4 ${isHovered ? 'animate-pulse' : ''}`}
      />
    </button>
  )
}
