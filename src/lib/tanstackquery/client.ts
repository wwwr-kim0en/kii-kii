import { QueryClient } from '@tanstack/react-query';

export function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
			},
			// dehydrate: {
			// 	shouldDehydrateQuery: (query) => defaultShouldDehydrateQuery(query) || query.state.status === 'pending',
			// },
		},
	});
}

// let browserQueryClient: QueryClient | undefined = undefined;

export function getQueryClient() {
	// console.log('isServer,', isServer);
	// if (isServer) {
	// Server: always make a new query client
	return makeQueryClient();
	// }
	// Browser: make a new query client if we don't already have one
	// This is very important, so we don't re-make a new client if React
	// suspends during the initial render. This may not be needed if we
	// have a suspense boundary BELOW the creation of the query client
	// if (!browserQueryClient) {
	// 	browserQueryClient = makeQueryClient();
	// 	console.log('browserQueryClient', browserQueryClient);
	// 	return browserQueryClient;
	// }
}
