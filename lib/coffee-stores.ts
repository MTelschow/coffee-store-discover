export async function fetchCoffeeStores() {
    const options: any = {
		method: 'GET',
		headers: {
			accept: 'application/json',
			Authorization: process.env.FOURSQUARE_API_KEY,
		},
	};

	const response = await fetch(
		getUrlForCoffeeStores(
			'49.97852435170035%2C9.133907480927235',
			'coffee',
			6
		),
		options
	);
	const data = await response.json();
	return data.results
	// .catch(err => console.error(err));
}

export function getUrlForCoffeeStores(latLong: string, query: string, limit: number) {
	return `https://api.foursquare.com/v3/places/search?query=${query}&ll=${latLong}&limit=${limit}`
}
