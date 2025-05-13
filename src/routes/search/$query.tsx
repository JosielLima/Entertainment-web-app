import { createFileRoute } from '@tanstack/react-router'
import { getSearch } from '../../services/api'
import MediaCard from '../../components/MediaCard' // Assuming MediaCard will accept a 'rated' prop

export const Route = createFileRoute('/search/$query')({
  loader: async ({ params }) => {
    const results = await getSearch(params.query)
    return results
  },
  component: RouteComponent,
})

function RouteComponent() {
  const { query } = Route.useParams()
  const results = Route.useLoaderData()
  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">
        Found {results.length} results for {query}
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {results.map((result) => (
          <MediaCard
            key={result.imdbID}
            poster={result.Poster}
            title={result.Title}
            type={result.Type}
            year={result.Year}
            imdbID={result.imdbID}
            rated={result.Rated} // Pass the 'Rated' property to MediaCard
          />
        ))}
      </div>
    </div>
  )
}
