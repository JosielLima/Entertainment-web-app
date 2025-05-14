import { useState, useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'

interface BookmarkedMedia {
  imdbID: string
  isBookmarked: boolean
}

export function useBookmarks() {
  // Estado local para rastrear IDs dos itens favoritos
  const [bookmarkedIds, setBookmarkedIds] = useState<BookmarkedMedia[]>(() => {
    // Inicializa do localStorage na primeira renderização
    const saved = localStorage.getItem('bookmarkedMedia')
    return saved ? JSON.parse(saved) : []
  })

  const queryClient = useQueryClient()

  // Salva no localStorage quando o estado muda
  useEffect(() => {
    localStorage.setItem('bookmarkedMedia', JSON.stringify(bookmarkedIds))
  }, [bookmarkedIds])

  // Verifica se um item está nos favoritos
  const isBookmarked = (id: string) =>
    bookmarkedIds.some((item) => item.imdbID === id && item.isBookmarked)

  // Adiciona/remove um item dos favoritos
  const toggleBookmark = (id: string) => {
    setBookmarkedIds((prev) => {
      const exists = prev.find((item) => item.imdbID === id)

      if (exists) {
        // Inverte o status de favorito
        return prev.map((item) =>
          item.imdbID === id
            ? { ...item, isBookmarked: !item.isBookmarked }
            : item,
        )
      } else {
        // Adiciona novo item como favorito
        return [...prev, { imdbID: id, isBookmarked: true }]
      }
    })

    // Opcional: Atualiza o cache do React Query
    queryClient.invalidateQueries({ queryKey: ['bookmarkedMedia'] })
  }

  // Retorna apenas os IDs que estão ativamente marcados como favoritos
  const getBookmarkedIds = () =>
    bookmarkedIds.filter((item) => item.isBookmarked).map((item) => item.imdbID)

  return { isBookmarked, toggleBookmark, getBookmarkedIds }
}
