import { Link, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import searchIcon from '../assets/icon-search.svg'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()

  // Desabilita o botão quando o campo está vazio
  const isEmpty = searchTerm.trim() === ''

  // Função para lidar com o enter
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !isEmpty) {
      navigate({ to: '/search/$query', params: { query: searchTerm } })
    }
  }

  return (
    <div className="flex items-center justify-between bg-zinc-800 rounded-lg p-2 mt-4 ml-2 w-[calc(100% - 2rem)]">
      <Link
        to="/search/$query"
        params={{ query: searchTerm }}
        disabled={isEmpty}
        className={isEmpty ? 'opacity-50 cursor-not-allowed' : ''}
      >
        <button className="pa-4 rounded-lg pointer mt-0.5" disabled={isEmpty}>
          <img src={searchIcon} alt="Search" className="w-6 h-6 mr-2" />
        </button>
      </Link>
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent text-white focus:outline-none focus:border-b-2 focus:border-white w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  )
}
