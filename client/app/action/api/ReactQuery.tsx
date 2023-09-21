import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import {Home} from "../../display/page"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  )
}