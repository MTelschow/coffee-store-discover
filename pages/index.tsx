import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import Banner from '@/components/banner/banner';
import Image from 'next/image';
import Card from '@/components/card/card';
import coffeeStores from '@/data/coffee-stores.json';

interface CoffeeStore {
	id: number;
	name: string;
	imgUrl: string;
    websiteUrl: string;
    address: string;
    neighbourhood: string;
}

export async function getStaticProps(context) {
	return {
		props: { coffeeStores }, // will be passed to the page component as props
	};
}

export default function Home(props: { coffeeStores: CoffeeStore[]}) {
	const {coffeeStores} = props;
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
					{coffeeStores.map((store) => {
						const { id, name, imgUrl, websiteUrl, address, neighbourhood } =
							store;
						return (
							<Card
								key={id}
								name={name}
								imageUrl={imgUrl}
								storeLink={'/coffee-store/' + id}
							/>
						);
					})}
				</div>
			</main>
		</>
	);
}
