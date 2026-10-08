import { appRouter } from './app.router'
import { RouterProvider } from 'react-router'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from './components/ui/sonner';
import { CheckAuthProvider } from './providers';

const queryClient = new QueryClient();

export const TesloShopApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <CheckAuthProvider>
        <RouterProvider router={appRouter} />
      </CheckAuthProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
