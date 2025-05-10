import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
// @ts-ignore
import { getMoviesByYear } from '../services/api'
import MediaCard from '../components/MediaCard'

interface Movie {
  imdbID: string
  Title: string
  Poster: string
  Type: string
  Year: string
}

export const Route = createFileRoute('/movies')({
  component: Movies,
})

function Movies() {
  const { data, isLoading, isError, error } = useQuery<Movie[]>({
    queryKey: ['trendingMovies'],
    queryFn: () => getMoviesByYear('2025'),
    initialData: [],
  })

  if (isLoading) return <h3>Loading!</h3>

  if (isError)
    return (
      <>
        <h3>Error</h3>
        <p>{error.toString()}</p>
      </>
    )

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Movies</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {data.map((movie) => (
            <MediaCard
              key={movie.imdbID}
              poster={movie.Poster}
              title={movie.Title}
              type={movie.Type}
              year={movie.Year}
              imdbID={movie.imdbID}
            />
          ))}
        </div>
      )}
    </div>
  )
}
