// Имитация работы апи получения спеков

import getItemsParams from '~/helpers/facet-filter/getItemsParams';

export default defineEventHandler(async () => {
    const data = await $fetch('/api/_content/query/facet-filter-items');
    const items = data[0].body;

    return getItemsParams(items);
});
