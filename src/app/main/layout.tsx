import MainFooter from '../../components/@layout/MainFooter';
import MainHeader from '../../components/@layout/MainHeader';
import QueryProvider from '@/lib/tanstackquery/providers';
export default function MainLayout({ children }: { children: React.ReactNode }) {
	return (
		<QueryProvider>
			<MainHeader />
			{children}
			<MainFooter />
		</QueryProvider>
	);
}
