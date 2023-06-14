import {
  QueryClient,
} from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 2, // 2 minutes
    },
  },
});

const API_BASE_URL = 'http://localhost:3001/';

export { queryClient, API_BASE_URL };