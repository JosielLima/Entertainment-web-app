import { Link } from '@tanstack/react-router'
import { useState } from 'react'

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('')

  // Desabilita o botão quando o campo está vazio
  const isEmpty = searchTerm.trim() === ''

  return (
    <div className="flex items-center justify-between bg-zinc-800 rounded-lg p-2 mt-2 ml-2">
      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent text-white border-none focus:outline-none w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Usamos o formato que o TanStack Router espera para rotas dinâmicas */}
      <Link
        to="/search/$query"
        params={{ query: searchTerm }}
        disabled={isEmpty}
        className={isEmpty ? 'opacity-50 cursor-not-allowed' : ''}
      >
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          disabled={isEmpty}
        >
          Search
        </button>
      </Link>
    </div>
  )
}
