import type { CardData, CardDataParams } from '~/types/facet-filter';

export default (items: CardData[]) =>
    items &&
    items.reduce((acc, item) => {
        if (item.price) {
            const price = item.sharePrice ?? item.price;

            acc.minPrice = acc?.minPrice ? acc.minPrice : 9999999;
            acc.maxPrice = acc?.maxPrice ? acc.maxPrice : 0;

            acc.minPrice = price < acc.minPrice ? price : acc.minPrice;
            acc.maxPrice = price > acc.maxPrice ? price : acc.maxPrice;
        }

        if (item.categories[0]) {
            acc.categories = acc.categories ? acc.categories : [];

            item.categories.forEach(itemCategory => {
                const isCategoryInAcc = acc.categories.find(
                    categoryItem => categoryItem.id === itemCategory.id
                );

                if (!isCategoryInAcc) {
                    acc.categories.push(itemCategory);
                }
            });
        }

        if (item.isShare) {
            acc.isShare = true;
        }

        if (item.rating >= 4.5) {
            acc.isHighRating = true;
        }

        return acc;
    }, <CardDataParams>{});
