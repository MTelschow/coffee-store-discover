import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

export default function CoffeeStore() {
	const router = useRouter();
	const { id } = router.query;

	return (
		<div>
			<Head>
				<title>Coffee Store {id}</title>
			</Head>
			<main>
				<p>Coffee Store {id}</p>
				<Link href='/' prefetch>
					Back to home
				</Link>
			</main>
		</div>
	);
}
