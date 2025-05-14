import { createFileRoute } from '@tanstack/react-router'
import { getSearch, getContentId } from '../../services/api'
import MediaCard from '../../components/MediaCard'
import { useQueries } from '@tanstack/react-query'
import { SkeletonGrid } from '@/components/SkeletonGrid'

export const Route = createFileRoute('/search/$query')({
  loader: async ({ params }) => {
    const results = await getSearch(params.query)
    return results
  },
  component: RouteComponent,
})

interface SearchResult {
  imdbID: string
  Title: string
  Poster: string
  Type: string
  Year: string
  Rated?: string
}

// Interface para os detalhes completos
interface DetailedSearchResult extends SearchResult {
  Rated?: string
  // Outros campos detalhados que podem vir da API
}

function RouteComponent() {
  const { query } = Route.useParams()
  const baseResults = Route.useLoaderData() as SearchResult[]

  // Extrair IDs para fazer as consultas detalhadas
  const resultIds = baseResults.map((result) => result.imdbID)

  // Fazer a segunda requisição para obter os detalhes completos de cada resultado
  const detailedResultsQueries = useQueries({
    queries: resultIds.map((id) => ({
      queryKey: ['searchDetail', id] as const,
      queryFn: () => getContentId(id),
      enabled: !!id,
    })),
  })

  // Verificar se os detalhes estão carregando
  const areDetailsLoading =
    baseResults.length > 0 &&
    detailedResultsQueries.some((query) => query.isLoading)

  if (areDetailsLoading) {
    return <SkeletonGrid />
  }

  // Combinar os resultados básicos com os detalhes
  const combinedResults = baseResults.map((basicResult) => {
    // Encontrar os detalhes correspondentes pelo ID
    const detailResult = detailedResultsQueries.find(
      (query) => query.data && query.data.imdbID === basicResult.imdbID,
    )

    // Se temos detalhes, usamos eles; caso contrário, usamos os dados básicos
    if (detailResult?.data) {
      return detailResult.data as DetailedSearchResult
    }

    // Fallback para os dados básicos (sem rated)
    return {
      ...basicResult,
      Rated: undefined,
    } as DetailedSearchResult
  })

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">
        Found {combinedResults.length} results for "{query}"
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {combinedResults.map((result) => (
          <MediaCard
            key={result.imdbID}
            poster={result.Poster}
            title={result.Title}
            type={result.Type}
            year={result.Year}
            imdbID={result.imdbID}
            rated={result.Rated} // Agora inclui a propriedade Rated
          />
        ))}
      </div>
    </div>
  )
}
