import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query'

export const Route = createFileRoute('/bookmarked')({
  component: Bookmarked,
})

function Bookmarked() {
  const { data } = useQuery({
    queryKey: ['people'],
    queryFn: () =>
      Promise.resolve([{ name: 'John Doe' }, { name: 'Jane Doe' }]),
    initialData: [],
  })

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Página de Bookmarked</h1>
      <ul>
        {data.map((person) => (
          <li key={person.name}>{person.name}</li>
        ))}
      </ul>
    </div>
  )
}
