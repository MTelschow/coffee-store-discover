import { createApi } from 'unsplash-js';

const unsplash = createApi({
	accessKey: `${process.env.UNSPLASHED_API_KEY}`,
});

function getUrlForCoffeeStores(latLong: string, query: string, limit: number) {
	return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`;
}
async function getListOfCoffeeStorePhotos() {
	const photos = await unsplash.search.getPhotos({
		query: 'coffee shop',
		page: 1,
		perPage: 30,
	});
	const unsplashResults = photos.response?.results!;

	return unsplashResults.map((result) => result.urls['small']);
}

export async function fetchCoffeeStores() {
	const photos = await getListOfCoffeeStorePhotos();
	const options: any = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: process.env.FOURSQUARE_API_KEY,
		},
	};

	const response = await fetch(
		getUrlForCoffeeStores('49.97852435170035%2C9.133907480927235', 'coffee', 6),
		options
	);
	const data = await response.json();
	return data.results.map((result: any, idx: number) => {
		return  {
			// ...result,
			name: result.name, 
			id: result.fsq_id,
			city: result.location.locality,
			address: result.location.address,
			imgUrl: photos[idx]
		}
	});
	// .catch(err => console.error(err));
}
