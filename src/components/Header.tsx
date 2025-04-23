import { Link } from '@tanstack/react-router'
import Logo from '../assets/logo.svg'

export default function Header() {
  return (
    <header className="p-2 flex gap-2 bg-white text-black justify-between">
      <nav className="flex flex-col">
        <div>
          <img src={Logo} alt="logo" />
        </div>
        <div className="px-2 font-bold">
          <Link to="/">Home</Link>
        </div>

        <div className="px-2 font-bold">
          <Link to="/login">Login</Link>
        </div>
         <div className="px-2 font-bold">
          <Link to="/bookmarked">Bookmarked</Link>
        </div>
         <div className="px-2 font-bold">
          <Link to="/movies">Movies</Link>
        </div>
         <div className="px-2 font-bold">
          <Link to="/tvseries">TV Series</Link>
        </div>
      </nav>
    </header>
  )
}
