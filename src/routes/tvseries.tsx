import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useQueries } from '@tanstack/react-query'
// It's better to have api.js as api.ts or ensure proper JS to TS interop
// For now, we'll assume the functions return what we expect.
// @ts-ignore
import { getSeriesByYear, getContentId } from '../services/api'
import MediaCard from '../components/MediaCard' // Assuming MediaCard will accept a 'rated' prop
import { SkeletonGrid } from '@/components/SkeletonGrid'
// Interface for the basic series structure from getSeriesByYear
interface Series {
  imdbID: string
  Title: string
  Poster: string
  Type: string
  Year: string
}

// Interface for the detailed series data from getContentId
interface DetailedSeriesData extends Series {
  Rated?: string
  // You can add other properties from getContentId response here if needed
  // e.g., Plot: string, Genre: string, etc.
}

// Combined interface for what MediaCard might eventually use
interface CombinedSeriesData extends DetailedSeriesData {}

export const Route = createFileRoute('/tvseries')({
  component: TvSeries,
})

function TvSeries() {
  // 1. Fetch the initial list of series
  const seriesQuery = useQuery<Series[], Error>({
    queryKey: ['trendingSeriesByYear', '2025'], // More descriptive queryKey
    queryFn: () => getSeriesByYear('2025'),
  })

  // Extract series IDs for dependent queries once seriesQuery.data is available
  const seriesIds = seriesQuery.data?.map((series) => series.imdbID) ?? []

  // 2. Modificamos o useQueries para simplificar a tipagem
  const detailedSeriesQueries = useQueries({
    queries: seriesIds.map((id) => ({
      queryKey: ['seriesDetail', id] as const, // Usando as const para ajudar na inferência de tipos
      queryFn: () => getContentId(id),
      enabled: !!id,
    })),
  })

  // Handle loading state for the initial series list
  if (seriesQuery.isLoading) {
    return <SkeletonGrid />
  }

  // Handle error state for the initial series list
  if (seriesQuery.isError) {
    return (
      <>
        <h3>Error loading series list</h3>
        <p>{seriesQuery.error?.message || 'An unknown error occurred'}</p>
      </>
    )
  }

  // Handle loading state for the detailed series information
  // Check if seriesQuery.data exists before checking detailed queries loading state
  const areDetailsLoading =
    seriesQuery.data &&
    seriesQuery.data.length > 0 &&
    detailedSeriesQueries.some((query) => query.isLoading)
  if (areDetailsLoading) {
    return <SkeletonGrid />
  }

  // Handle error state for detailed series information (optional: more granular error display)
  const firstDetailErrorResult = detailedSeriesQueries.find(
    (query) => query.isError,
  )
  if (firstDetailErrorResult) {
    return (
      <>
        <h3>Error loading some series details</h3>
        <p>
          {firstDetailErrorResult.error?.message || 'An unknown error occurred'}
        </p>
      </>
    )
  }

  // 3. Combine the basic series data with the detailed data - versão simplificada
  const combinedSeriesData = (seriesQuery.data || []).map((basicSeries) => {
    // Encontra os detalhes correspondentes pelo ID
    const detailResult = detailedSeriesQueries.find(
      (query) => query.data && query.data.imdbID === basicSeries.imdbID,
    )

    // Se temos detalhes, usamos eles; caso contrário, usamos os dados básicos
    if (detailResult?.data) {
      return detailResult.data as CombinedSeriesData
    }

    // Fallback para os dados básicos (sem rated)
    return {
      ...basicSeries,
      Rated: undefined,
    } as CombinedSeriesData
  })

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">TV Series</h1>
      {combinedSeriesData.length === 0 &&
      !seriesQuery.isLoading &&
      !areDetailsLoading ? (
        <p>No TV series found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {combinedSeriesData.map((series) => (
            <MediaCard
              key={series.imdbID}
              poster={series.Poster}
              title={series.Title}
              type={series.Type}
              year={series.Year}
              imdbID={series.imdbID}
              rated={series.Rated} // Pass the 'Rated' property to MediaCard
            />
          ))}
        </div>
      )}
    </div>
  )
}
