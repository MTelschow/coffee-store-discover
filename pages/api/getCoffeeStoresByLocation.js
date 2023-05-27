import { fetchCoffeeStores } from '@/lib/coffee-stores';

export default async function getCoffeeStoresByLocation(req, res) {
	try {
		const { latLong, limit } = req.query;

		const response = await fetchCoffeeStores(latLong, limit);

		res.status(200).json(response);
	} catch (error) {
		console.error(error);
		res.status(500).json({message: error})
	}
}
