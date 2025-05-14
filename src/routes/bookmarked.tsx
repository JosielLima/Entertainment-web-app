import { createFileRoute } from '@tanstack/react-router'
import { useBookmarks } from '../hooks/useBookmarks'
import { useQueries } from '@tanstack/react-query'
import { getContentId } from '../services/api'
import MediaCard from '../components/MediaCard'
import { SkeletonGrid } from '@/components/SkeletonGrid'

interface BookmarkedMedia {
  imdbID: string
  Title: string
  Poster: string
  Type: string
  Year: string
  Rated?: string
}

export const Route = createFileRoute('/bookmarked')({
  component: Bookmarked,
})

function Bookmarked() {
  const { getBookmarkedIds } = useBookmarks()
  const bookmarkedIds = getBookmarkedIds()

  // Usa o React Query para buscar detalhes de cada item favorito
  const bookmarkedQueries = useQueries({
    queries: bookmarkedIds.map((id) => ({
      queryKey: ['movieDetail', id] as const,
      queryFn: () => getContentId(id),
      enabled: !!id,
    })),
  })

  // Verifica se os dados estão carregando
  const isLoading = bookmarkedQueries.some((query) => query.isLoading)

  if (isLoading) {
    return <SkeletonGrid />
  }

  // Filtra para obter apenas os resultados carregados com sucesso
  const bookmarkedMedia = bookmarkedQueries
    .filter((query) => query.data && !query.isError)
    .map((query) => query.data as BookmarkedMedia)

  // Separa os itens por categoria
  const bookmarkedMovies = bookmarkedMedia.filter(
    (media) => media.Type === 'movie',
  )
  const bookmarkedSeries = bookmarkedMedia.filter(
    (media) => media.Type === 'series',
  )

  const noBookmarks = bookmarkedMedia.length === 0

  return (
    <div className="p-6 space-y-8">
      {noBookmarks ? (
        <div className="text-center p-10">
          <h2 className="text-2xl font-semibold mb-4">No Bookmarks Yet</h2>
          <p className="text-gray-400">
            Start exploring and saving your favorite movies and TV shows.
          </p>
        </div>
      ) : (
        <>
          {/* Seção de Filmes */}
          <section>
            <h2 className="text-4xl font-semibold mb-4">Bookmarked Movies</h2>
            {bookmarkedMovies.length === 0 ? (
              <p className="text-gray-400 mb-6">No bookmarked movies yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {bookmarkedMovies.map((movie) => (
                  <MediaCard
                    key={movie.imdbID}
                    poster={movie.Poster}
                    title={movie.Title}
                    type={movie.Type}
                    year={movie.Year}
                    imdbID={movie.imdbID}
                    rated={movie.Rated}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Seção de Séries */}
          <section>
            <h2 className="text-4xl font-semibold mb-4">
              Bookmarked TV Series
            </h2>
            {bookmarkedSeries.length === 0 ? (
              <p className="text-gray-400 mb-6">No bookmarked TV series yet.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {bookmarkedSeries.map((series) => (
                  <MediaCard
                    key={series.imdbID}
                    poster={series.Poster}
                    title={series.Title}
                    type={series.Type}
                    year={series.Year}
                    imdbID={series.imdbID}
                    rated={series.Rated}
                  />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  )
}
