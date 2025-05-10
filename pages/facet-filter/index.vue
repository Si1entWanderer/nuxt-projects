<script setup lang="ts">
import type {
    CardDataParams,
    CardData,
    FilterValues,
} from '~/types/facet-filter';

import { FacetFilterService } from '~/services/facetFilterService';

import { isNil, debounce } from 'lodash';

const LABELS = {
    title: 'Фасетный фильтр',
    title2: 'Купить одежду и аксессуары по низкой цене',
};

const values = reactive<FilterValues>({
    minPrice: null,
    maxPrice: null,
    categories: [],
    isShare: false,
    isHighRating: false,
});

const cardItems = ref<CardData[]>([]);
const facets = ref<CardDataParams>({});
const specs = ref<CardDataParams>({});
const isLoading = ref<boolean>(false);

const { data } = await useAsyncData('facetFilterData', async () => {
    const [specs, facets, items] = await Promise.all([
        FacetFilterService.getSpecs(),
        FacetFilterService.getFacets(),
        FacetFilterService.getItems(),
    ]);

    return {
        specs,
        facets,
        items,
    };
});

specs.value = data.value?.specs || {};
facets.value = data.value?.facets || {};
cardItems.value = data.value?.items || [];

const queryValues = computed(() => {
    let newObj: Record<string, unknown> = {};
    Object.entries(values).forEach(([key, value]) => {
        const isArrayValueEmpty = Array.isArray(value) && !value.length;
        const isBooleanValueFalse =
            ['isHighRating', 'isShare'].includes(key) && !value;

        if (isNil(value) || isArrayValueEmpty || isBooleanValueFalse) {
            return;
        }

        if (key === 'categories') {
            newObj[key] = (value as string[]).join(',');
        } else {
            newObj[key] = value;
        }
    });

    return newObj;
});

const setValuesFromFacets = () => {
    values.categories = values.categories?.filter?.(item => {
        const isItemInFacets = facets.value?.categories?.find?.(
            facetItem => facetItem.id === item
        );

        return isItemInFacets ? true : false;
    });

    if (
        values?.maxPrice &&
        facets.value?.maxPrice &&
        values?.maxPrice > facets.value.maxPrice
    ) {
        values.maxPrice = facets.value.maxPrice;
    }

    if (
        values?.minPrice &&
        facets.value?.minPrice &&
        values.minPrice < facets.value.minPrice
    ) {
        values.minPrice = facets.value.minPrice;
    }
};

const getItems = async () => {
    isLoading.value = true;
    try {
        const cardItemsData = await FacetFilterService.getItems({
            query: queryValues.value,
        });

        cardItems.value = cardItemsData || [];
    } catch (e) {
        console.warn(e);
    } finally {
        isLoading.value = false;
    }
};

const getFacets = async () => {
    try {
        facets.value = await FacetFilterService.getFacets({
            query: queryValues.value,
        });

        setValuesFromFacets();
    } catch (e) {
        console.warn(e);
    }
};

const getDebouncedData = debounce(async () => {
    await getFacets();
    await getItems();
}, 2000);

const getFastDebouncedData = debounce(async () => {
    await getFacets();
    await getItems();
}, 500);

const handleInput = async ({
    name,
    payload,
}: {
    name: keyof FilterValues;
    payload: any;
}) => {
    values[name] = payload;

    if (name === 'categories') {
        getDebouncedData();
    } else {
        getFastDebouncedData();
    }
};
</script>

<template>
    <div :class="$style.index">
        <h1 :class="$style.title">
            {{ LABELS.title }}
        </h1>

        <FacetFilterMain
            :class="$style.filter"
            :specs="specs"
            :facets="facets"
            :values="values"
            @input="handleInput"
        />

        <h2 :class="[$style.title, $style._hidden]">
            {{ LABELS.title2 }}
        </h2>

        <FacetFilterCards
            :cards-data="cardItems"
            :is-loading="isLoading"
        />
    </div>
</template>

<style lang="scss" module>
.index {
    //
}

.title {
    @include text(h1);

    margin-top: 24px;

    &._hidden {
        visibility: hidden;
        height: 0;
        margin: 0;
    }
}

.filter {
    margin-top: 24px;
}
</style>
