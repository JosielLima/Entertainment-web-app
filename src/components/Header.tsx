import { Link } from '@tanstack/react-router'
import Logo from '../assets/logo.svg?react'
import BookmarkIcon from '../assets/icon-nav-bookmark.svg?react'
import HomeIcon from '../assets/icon-nav-home.svg?react'
import MoviesIcon from '../assets/icon-nav-movies.svg?react'
import SeriesIcon from '../assets/icon-nav-tv-series.svg?react'
import Avatar from '../assets/image-avatar.png'

export default function Header() {
  return (
    <header className="px-6 flex gap-2 bg-zinc-800 justify-between rounded-lg my-4 ml-2 py-4 ">
      <nav className="flex flex-row md:flex-col gap-16 items-center justify-between w-full">
        <div>
          <Logo />
        </div>
        <div className="flex flex-row md:flex-col gap-8 flex-1 items-center justify-center md:justify-start  ">
          <div className="font-bold  w-fit">
            <Link
              to="/home"
              className="opacity-50 [&.active]:opacity-100 pb-[6px] hover:border-b-2  hover:pb-1 border-red-500 block"
            >
              <HomeIcon />
            </Link>
          </div>
          <div className="px-2 font-bold">
            <Link
              to="/bookmarked"
              className="opacity-50 [&.active]:opacity-100 pb-[6px] hover:border-b-2  hover:pb-1 border-red-500 block"
            >
              <BookmarkIcon />
            </Link>
          </div>
          <div className="px-2 font-bold">
            <Link
              to="/movies"
              className="opacity-50 [&.active]:opacity-100 pb-[6px] hover:border-b-2  hover:pb-1 border-red-500 block"
            >
              <MoviesIcon />
            </Link>
          </div>
          <div className="px-2 font-bold">
            <Link
              to="/tvseries"
              className="opacity-50 [&.active]:opacity-100 pb-[6px] hover:border-b-2  hover:pb-1 border-red-500 block"
            >
              <SeriesIcon />
            </Link>
          </div>
        </div>
        <div>
          <img
            src={Avatar}
            alt="Avatar"
            className="w-[2rem] border-2 border-white rounded-full"
          />
        </div>
      </nav>
    </header>
  )
}
