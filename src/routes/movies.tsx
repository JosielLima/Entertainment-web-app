import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'
// @ts-ignore
import { getMoviesByYear } from '../services/api'

interface Movie {
  imdbID: string
  Title: string
}

export const Route = createFileRoute('/movies')({
  component: Movies,
})

function Movies() {
  const { data, isLoading, isError, error } = useQuery<Movie[]>({
    queryKey: ['trendingMovies'],
    queryFn: () => getMoviesByYear("2025"),
    initialData: [],
  })


if (isLoading) return <h3>Loading!</h3>

if (isError) return <>
  <h3>Error</h3>
  <p>{error.toString()}</p>
</>



  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Página de filmes</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {data.map((movie) => (
            <li key={movie.imdbID}>{movie.Title}</li>
          ))}
        </ul>
      )}
    </div>
  )
}
