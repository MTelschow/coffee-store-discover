import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Banner from '@/components/banner/banner';
import Image from 'next/image';
import Card from '@/components/card/card';

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
			</Head>

			<main className={`${styles.main} `}>
				<Banner
					buttonText='View stores nearby'
					handleOnClick={handleOnBannerButtonClick}
				/>
				<div className={styles.heroImage}>
					<Image
						src='/static/hero-image.png'
						width={700}
						height={400}
						alt='hero image'
					/>
				</div>
				<div className={styles.cardLayout}>
					<Card
						name={'Store'}
						imageUrl={'/favicon.png'}
						storeLink={'/icon'}
						
					/>
				</div>
			</main>
		</>
	);
}
