import { Outlet, createRootRouteWithContext } from '@tanstack/react-router'
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
      <div className="flex flex-row">
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
})
