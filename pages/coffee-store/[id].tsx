import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import coffeeStoreData from '@/data/coffee-stores.json';

export async function getStaticProps({ params }: { params: any }) {
	return {
		props: {
			coffeeStore: coffeeStoreData.find((coffeeStore) => {
				return coffeeStore.id === Number(params.id);
			}),
		}, // will be passed to the page component as props
	};
}

export async function getStaticPaths() {
	return {
		paths: [{ params: { id: '0' } }, { params: { id: '1' } }],
		fallback: true,
	};
}

export default function CoffeeStore(props: any) {
	const { address, name, neighbourhood } = props.coffeeStore;
	const router = useRouter();

	if (router.isFallback) {
		return <div>Loading...</div>;
	}
	const { id } = router.query;

	return (
		<div>
			<Head>
				<title>{name}</title>
			</Head>
			<main>
				<Link href='/' prefetch>
					Back to home
				</Link>
				<p>{address}</p>
				<p>{name}</p>
				<p>{neighbourhood}</p>
			</main>
		</div>
	);
}
