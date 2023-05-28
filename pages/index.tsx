import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';

import Banner from '@/components/banner/banner';
import Card from '@/components/card/card';

import { fetchCoffeeStores } from '@/lib/coffee-stores';
import useTrackLocation from '@/hooks/use-track-location';

import { useState, useEffect, useContext } from 'react';

import { ACTION_TYPES, StoreContext } from '../store/store-context';

export async function getStaticProps() {
	const coffeeStores = await fetchCoffeeStores();

	return {
		props: { coffeeStores }, // will be passed to the page component as props
	};
}

export default function Home(props: any) {
	// const { coffeeStores } = props;

	const { handleTrackLocation, locationErrorMsg, isFindingLocation } =
		useTrackLocation();

	// const [coffeeStores, setCoffeeStores] = useState<any[]>([]);

	const [coffeeStoresError, setcoffeeStoresError] = useState<any>(null);

	const { dispatch, state } = useContext(StoreContext);

	const { coffeeStores, latLong } = state;

	useEffect(() => {
		async function setCoffeeStoresByLocation() {
			if (latLong) {
				try {
					const response = await fetch(
						`/api/getCoffeeStoresByLocation?latLong=${latLong}&limit=${18}`
					);
					const fetchedCoffeeStores = await response.json();

					// setCoffeeStores(fetchedCoffeeStores);
					dispatch({
						type: ACTION_TYPES.SET_COFFEE_STORES,
						payload: {
							coffeeStores: fetchedCoffeeStores,
						},
					});
					setcoffeeStoresError('');
				} catch (error: any) {
					setcoffeeStoresError(error.message);
				}
			}
		}
		setCoffeeStoresByLocation();
	}, [latLong]);

	const handleOnBannerButtonClick = () => {
		handleTrackLocation();
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
					buttonText={isFindingLocation ? 'Locating...' : 'View stores nearby'}
					handleOnClick={handleOnBannerButtonClick}
				/>
				{locationErrorMsg && <p>{locationErrorMsg}</p>}
				{coffeeStoresError && <p>{coffeeStoresError}</p>}
				<div className={styles.heroImage}>
					<Image
						src='/static/hero-image.png'
						width={700}
						height={400}
						alt='hero image'
					/>
				</div>

				{coffeeStores.length > 0 && (
					<div className={styles.sectionWrapper}>
						<h2 className={styles.heading2}>
							{'Stores near ' + coffeeStores[0].city}
							{/* Stores near me */}
						</h2>
						<div className={styles.cardLayout}>
							{coffeeStores.map((store: any) => {
								return (
									<Card
										key={store.id}
										name={store.name}
										imageUrl={
											store.imgUrl ||
											'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
										}
										storeLink={'/coffee-store/' + store.id}
									/>
								);
							})}
						</div>
					</div>
				)}

				{props.coffeeStores.length > 0 && (
					<div className={styles.sectionWrapper}>
						<h2 className={styles.heading2}>
							{props.coffeeStores[0].city + ' stores'}
						</h2>
						<div className={styles.cardLayout}>
							{props.coffeeStores.map((store: any) => {
								return (
									<Card
										key={store.id}
										name={store.name}
										imageUrl={
											store.imgUrl ||
											'https://images.unsplash.com/photo-1504753793650-d4a2b783c15e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80'
										}
										storeLink={'/coffee-store/' + store.id}
									/>
								);
							})}
						</div>
					</div>
				)}
			</main>
		</>
	);
}
