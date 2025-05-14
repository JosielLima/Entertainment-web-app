import {
  Outlet,
  createRootRouteWithContext,
  redirect,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import Header from '../components/Header'
import SearchBar from '../components/SearchBar'

import TanstackQueryLayout from '../integrations/tanstack-query/layout'

import type { QueryClient } from '@tanstack/react-query'

interface MyRouterContext {
  queryClient: QueryClient
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <>
      <div className="flex md:flex-row min-h-screen flex-col">
        <Header />
        <div>
          <SearchBar />
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />

      <TanstackQueryLayout />
    </>
  ),
  // Adicione esta parte para redirecionar a rota raiz
  beforeLoad: async ({ location }) => {
    // Se estiver na rota raiz exata, redirecione para /home
    if (location.pathname === '/') {
      throw redirect({
        to: '/home',
        replace: true,
      })
    }
  },
})
