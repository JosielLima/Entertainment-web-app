import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div >
      <h1>Painel principal</h1>
    </div>
  )
}
