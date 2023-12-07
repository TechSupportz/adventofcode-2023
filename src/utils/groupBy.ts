export const groupBy = (items: any[], key: string): Record<string, any[]> =>
	items.reduce(
		(result, item) => ({
			...result,
			[item[key]]: [...(result[item[key]] || []), item],
		}),
		{},
	)
