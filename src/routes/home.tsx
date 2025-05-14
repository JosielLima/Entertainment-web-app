import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useQueries } from '@tanstack/react-query'
// It's better to have api.js as api.ts or ensure proper JS to TS interop
// For now, we'll assume the functions return what we expect.
// @ts-ignore
import { getAllMedias, getContentId, getMoviesByYear } from '../services/api'
import MediaCard from '../components/MediaCard'
import TrendingCard from '../components/TrendingCard'
import { SkeletonGrid } from '@/components/SkeletonGrid'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'

// Interface for the basic movie structure from getMoviesByYear
interface AllMedia {
  imdbID: string
  Title: string
  Poster: string
  Type: string
  Year: string
}

// Interface for the detailed movie data from getContentId
interface DetailedMediaData extends AllMedia {
  Rated?: string
  // You can add other properties from getContentId response here if needed
  // e.g., Plot: string, Genre: string, etc.
}

// Combined interface for what MediaCard might eventually use
interface CombinedMediaData extends DetailedMediaData {}

export const Route = createFileRoute('/home')({
  component: Movies,
})

function Movies() {
  // 1. Fetch the initial list of movies
  const allMediaQuery = useQuery<AllMedia[], Error>({
    queryKey: ['trendingMoviesByYear', '2025'], // More descriptive queryKey
    queryFn: () => getAllMedias(),
  })

  const trendingQuery = useQuery<AllMedia[], Error>({
    queryKey: ['trending', '2025'], // More descriptive queryKey
    queryFn: () => getMoviesByYear('2025'),
  })

  // Extract movie IDs for dependent queries once allMediaQuery.data is available
  const mediaIds = allMediaQuery.data?.map((media) => media.imdbID) ?? []
  const trendingIds = trendingQuery.data?.map((media) => media.imdbID) ?? []

  // 2. Modificamos o useQueries para simplificar a tipagem
  const detailedMediaQueries = useQueries({
    queries: mediaIds.map((id) => ({
      queryKey: ['movieDetail', id] as const, // Usando as const para ajudar na inferência de tipos
      queryFn: () => getContentId(id),
      enabled: !!id,
    })),
  })

  const detailedTrendingQueries = useQueries({
    queries: trendingIds.map((id) => ({
      queryKey: ['movieDetail', id] as const, // Usando as const para ajudar na inferência de tipos
      queryFn: () => getContentId(id),
      enabled: !!id,
    })),
  })

  // Handle loading state for the initial movie list
  if (allMediaQuery.isLoading && trendingQuery.isLoading) {
    return <SkeletonGrid />
  }

  // Handle error state for the initial movie list
  if (allMediaQuery.isError || trendingQuery.isError) {
    return (
      <>
        <h3>Error loading movies list</h3>
        <p>{allMediaQuery.error?.message || 'An unknown error occurred'}</p>
      </>
    )
  }

  // Handle loading state for the detailed movie information
  // Check if allMediaQuery.data exists before checking detailed queries loading state
  const areDetailsLoading =
    allMediaQuery.data &&
    allMediaQuery.data.length > 0 &&
    detailedMediaQueries.some((query) => query.isLoading)
  if (areDetailsLoading) {
    return <h3>Loading media details...</h3>
  }

  const areDetailsTrendingLoading =
    allMediaQuery.data &&
    allMediaQuery.data.length > 0 &&
    detailedMediaQueries.some((query) => query.isLoading)
  if (areDetailsTrendingLoading) {
    return <h3>Loading media details...</h3>
  }

  // Handle error state for detailed movie information (optional: more granular error display)
  const firstDetailErrorResult = detailedMediaQueries.find(
    (query) => query.isError,
  )
  if (firstDetailErrorResult) {
    return (
      <>
        <h3>Error loading some media details</h3>
        <p>
          {firstDetailErrorResult.error?.message || 'An unknown error occurred'}
        </p>
      </>
    )
  }

  // 3. Combine the basic media data with the detailed data - versão simplificada
  const combinedMediasData = (allMediaQuery.data || []).map((basicMedia) => {
    // Encontra os detalhes correspondentes pelo ID
    const detailResult = detailedMediaQueries.find(
      (query) => query.data && query.data.imdbID === basicMedia.imdbID,
    )

    // Se temos detalhes, usamos eles; caso contrário, usamos os dados básicos
    if (detailResult?.data) {
      return detailResult.data as CombinedMediaData
    }

    // Fallback para os dados básicos (sem rated)
    return {
      ...basicMedia,
      Rated: undefined,
    } as CombinedMediaData
  })

  const combinedTrendingData = (trendingQuery.data || []).map((basicMedia) => {
    // Encontra os detalhes correspondentes pelo ID
    const detailResult = detailedTrendingQueries.find(
      (query) => query.data && query.data.imdbID === basicMedia.imdbID,
    )

    // Se temos detalhes, usamos eles; caso contrário, usamos os dados básicos
    if (detailResult?.data) {
      return detailResult.data as CombinedMediaData
    }

    // Fallback para os dados básicos (sem rated)
    return {
      ...basicMedia,
      Rated: undefined,
    } as CombinedMediaData
  })

  return (
    <div>
      <div className="p-4">
        <h1 className="text-2xl mb-4">Trending</h1>
        <div className="flex flex-nowrap flex-row">
          {combinedTrendingData.length === 0 &&
          !allMediaQuery.isLoading &&
          !areDetailsTrendingLoading ? (
            <p>No movies found.</p>
          ) : (
            <div>
              <ScrollArea className="max-w-[calc(100vw-160px)] whitespace-nowrap">
                <div className="flex w-max space-x-4">
                  {combinedTrendingData.map((movie) => (
                    <div className="shrink-0" key={movie.imdbID}>
                      <TrendingCard
                        poster={movie.Poster}
                        title={movie.Title}
                        type={movie.Type}
                        year={movie.Year}
                        imdbID={movie.imdbID}
                        rated={movie.Rated} // Pass the 'Rated' property to MediaCard
                      />
                    </div>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
      <div className="p-4">
        <h1 className="text-2xl mb-4">Recommended for you</h1>
        {combinedMediasData.length === 0 &&
        !allMediaQuery.isLoading &&
        !areDetailsLoading ? (
          <p>No movies found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {combinedMediasData.map((movie) => (
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
    </div>
  )
}
