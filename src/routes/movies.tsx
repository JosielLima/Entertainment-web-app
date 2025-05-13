import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useQueries } from '@tanstack/react-query'
// It's better to have api.js as api.ts or ensure proper JS to TS interop
// For now, we'll assume the functions return what we expect.
// @ts-ignore
import { getMoviesByYear, getContentId } from '../services/api'
import MediaCard from '../components/MediaCard' // Assuming MediaCard will accept a 'rated' prop
import { SkeletonGrid } from '@/components/SkeletonGrid'
// Interface for the basic movie structure from getMoviesByYear
interface Movie {
  imdbID: string
  Title: string
  Poster: string
  Type: string
  Year: string
}

// Interface for the detailed movie data from getContentId
interface DetailedMovieData extends Movie {
  Rated?: string
  // You can add other properties from getContentId response here if needed
  // e.g., Plot: string, Genre: string, etc.
}

// Combined interface for what MediaCard might eventually use
interface CombinedMovieData extends DetailedMovieData {}

export const Route = createFileRoute('/movies')({
  component: Movies,
})

function Movies() {
  // 1. Fetch the initial list of movies
  const moviesQuery = useQuery<Movie[], Error>({
    queryKey: ['trendingMoviesByYear', '2025'], // More descriptive queryKey
    queryFn: () => getMoviesByYear('2025'),
  })

  // Extract movie IDs for dependent queries once moviesQuery.data is available
  const movieIds = moviesQuery.data?.map((movie) => movie.imdbID) ?? []

  // 2. Modificamos o useQueries para simplificar a tipagem
  const detailedMoviesQueries = useQueries({
    queries: movieIds.map((id) => ({
      queryKey: ['movieDetail', id] as const, // Usando as const para ajudar na inferência de tipos
      queryFn: () => getContentId(id),
      enabled: !!id,
    })),
  })

  // Handle loading state for the initial movie list
  if (moviesQuery.isLoading) {
    return <SkeletonGrid />
  }

  // Handle error state for the initial movie list
  if (moviesQuery.isError) {
    return (
      <>
        <h3>Error loading movies list</h3>
        <p>{moviesQuery.error?.message || 'An unknown error occurred'}</p>
      </>
    )
  }

  // Handle loading state for the detailed movie information
  // Check if moviesQuery.data exists before checking detailed queries loading state
  const areDetailsLoading =
    moviesQuery.data &&
    moviesQuery.data.length > 0 &&
    detailedMoviesQueries.some((query) => query.isLoading)
  if (areDetailsLoading) {
    return <div />
  }

  // Handle error state for detailed movie information (optional: more granular error display)
  const firstDetailErrorResult = detailedMoviesQueries.find(
    (query) => query.isError,
  )
  if (firstDetailErrorResult) {
    return (
      <>
        <h3>Error loading some movie details</h3>
        <p>
          {firstDetailErrorResult.error?.message || 'An unknown error occurred'}
        </p>
      </>
    )
  }

  // 3. Combine the basic movie data with the detailed data - versão simplificada
  const combinedMoviesData = (moviesQuery.data || []).map((basicMovie) => {
    // Encontra os detalhes correspondentes pelo ID
    const detailResult = detailedMoviesQueries.find(
      (query) => query.data && query.data.imdbID === basicMovie.imdbID,
    )

    // Se temos detalhes, usamos eles; caso contrário, usamos os dados básicos
    if (detailResult?.data) {
      return detailResult.data as CombinedMovieData
    }

    // Fallback para os dados básicos (sem rated)
    return {
      ...basicMovie,
      Rated: undefined,
    } as CombinedMovieData
  })

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Movies</h1>
      {combinedMoviesData.length === 0 &&
      !moviesQuery.isLoading &&
      !areDetailsLoading ? (
        <p>No movies found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {combinedMoviesData.map((movie) => (
            <MediaCard
              key={movie.imdbID}
              poster={movie.Poster}
              title={movie.Title}
              type={movie.Type}
              year={movie.Year}
              imdbID={movie.imdbID}
              rated={movie.Rated} // Pass the 'Rated' property to MediaCard
            />
          ))}
        </div>
      )}
    </div>
  )
}
