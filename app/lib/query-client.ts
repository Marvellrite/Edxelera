import { isServer, QueryClient } from '@tanstack/react-query';

let browserClient: QueryClient | undefined;

const makeQueryClient = () => new QueryClient();

export const getQueryClient = () => {
  if (isServer) {
    return makeQueryClient();
  }

  if (!browserClient) {
    browserClient = makeQueryClient();
  }

  return browserClient;
};

