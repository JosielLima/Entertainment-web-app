import { Link } from '@tanstack/react-router'
import Logo from '../assets/logo.svg'
import BookmarkIcon from '../assets/icon-nav-bookmark.svg'
import HomeIcon from '../assets/icon-nav-home.svg'
import MoviesIcon from '../assets/icon-nav-movies.svg'
import SeriesIcon from '../assets/icon-nav-tv-series.svg'

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-zinc-800 justify-between rounded-lg mt-2 ml-2 py-4">
      <nav className="flex flex-col gap-16 items-center">
        <div>
          <img src={Logo} alt="logo" className="w-[32px]" />
        </div>
        <div className="flex flex-col gap-8">
          <div className="px-2 font-bold">
            <Link to="/home">
              <img src={HomeIcon} alt="Home" className="w-[32px]" />
            </Link>
          </div>
          <div className="px-2 font-bold">
            <Link to="/bookmarked">
              <img src={BookmarkIcon} alt="Bookmarked" className="w-[32px]" />
            </Link>
          </div>
          <div className="px-2 font-bold">
            <Link to="/movies">
              <img src={MoviesIcon} alt="Movies" className="w-[32px]" />
            </Link>
          </div>
          <div className="px-2 font-bold">
            <Link to="/tvseries">
              <img src={SeriesIcon} alt="TV Series" className="w-[32px]" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
