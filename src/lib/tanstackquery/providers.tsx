'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { getQueryClient } from './client';
export default function QueryProvider({ children }: { children: React.ReactNode }) {
	const queryClient = getQueryClient() as QueryClient;

	return (
		<QueryClientProvider client={queryClient}>
			<ReactQueryStreamedHydration>
				{children}
				<ReactQueryDevtools />
			</ReactQueryStreamedHydration>
		</QueryClientProvider>
	);
}
