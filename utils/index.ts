export const isEmpty = (object: any) => {
	return Object.keys(object).length === 0;
};

export const fetcher = (url: string) => fetch(url).then((res) => res.json());