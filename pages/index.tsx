import Head from 'next/head';
import { Inter } from 'next/font/google';
import styles from '@/styles/Home.module.css';
import Banner from '@/components/banner/banner';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
	const handleOnBannerButtonClick = () => {
		console.log('banner button press');
	};

	return (
		<>
			<Head>
				<title>Coffee Connoisseur</title>
				<meta name='Coffee Connoisseur' content='Coffee Store in your area' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={`${styles.main} ${inter.className}`}>
				<Banner
					buttonText='View stores nearby'
					handleOnClick={handleOnBannerButtonClick}
				/>
			</main>
		</>
	);
}
