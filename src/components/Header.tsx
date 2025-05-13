import { Link } from '@tanstack/react-router'
import Logo from '../assets/logo.svg'
import BookmarkIcon from '../assets/icon-nav-bookmark.svg'
import HomeIcon from '../assets/icon-nav-home.svg'
import MoviesIcon from '../assets/icon-nav-movies.svg'
import SeriesIcon from '../assets/icon-nav-tv-series.svg'
import Avatar from '../assets/image-avatar.png'

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-zinc-800 justify-between rounded-lg my-4 ml-2 py-4 ">
      <nav className="flex flex-row md:flex-col gap-16 items-center justify-between w-full">
        <div>
          <img src={Logo} alt="logo" className="w-[2rem]" />
        </div>
        <div className="flex flex-row md:flex-col gap-8 flex-1 justify-center md:justify-start">
          <div className="px-2 font-bold">
            <Link to="/home" className="opacity-50 [&.active]:opacity-100">
              <img src={HomeIcon} alt="Home" className="w-[2rem]" />
            </Link>
          </div>
          <div className="px-2 font-bold">
            <Link
              to="/bookmarked"
              className="opacity-50 [&.active]:opacity-100"
            >
              <img src={BookmarkIcon} alt="Bookmarked" className="w-[2rem]" />
            </Link>
          </div>
          <div className="px-2 font-bold">
            <Link to="/movies" className="opacity-50 [&.active]:opacity-100">
              <img src={MoviesIcon} alt="Movies" className="w-[2rem]" />
            </Link>
          </div>
          <div className="px-2 font-bold">
            <Link to="/tvseries" className="opacity-50 [&.active]:opacity-100">
              <img src={SeriesIcon} alt="TV Series" className="w-[2rem]" />
            </Link>
          </div>
        </div>
        <div>
          <img src={Avatar} alt="Avatar" className="w-[32px]" />
        </div>
      </nav>
    </header>
  )
}
