import type { CardDataParams } from '~/types/facet-filter';

export const FacetFilterService = {
    getSpecs(params = {}) {
        return $fetch<CardDataParams>('/api/facet-filter/get-specs', params);
    },

    getFacets(params = {}) {
        return $fetch<CardDataParams>('/api/facet-filter/get-facets', params);
    },

    getItems(params = {}) {
        return $fetch('/api/facet-filter/get-items', params);
    },
};
