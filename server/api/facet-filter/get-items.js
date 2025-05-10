// Имитация работы апи получения списка товаров

export default defineEventHandler(async event => {
    const query = getQuery(event);

    const data = await $fetch('/api/_content/query/facet-filter-items');

    const body = data?.[0]?.body || [];
    let filteredBody = body.filter(item => {
        const price = item?.sharePrice || item?.price || 0;

        if (query?.categories && item?.categories) {
            const categories = query.categories.split(',');
            const isCategoryFound = item.categories?.find?.(category => {
                return categories.includes(category.id);
            });

            if (!isCategoryFound) {
                return false;
            }
        }

        if (query?.minPrice && price < Number(query.minPrice)) {
            return false;
        }

        if (query?.maxPrice && price > query.maxPrice) {
            return false;
        }

        if (query?.isShare && item?.isShare?.toString() !== query.isShare) {
            return false;
        }

        if (query?.isHighRating && item.rating < 4.5) {
            return false;
        }

        return true;
    });

    return filteredBody;
});
