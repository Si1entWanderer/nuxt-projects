<script setup lang="ts">
import { v4 } from 'uuid';
import type { CardDataParams, FilterValues } from '~/types/facet-filter';

const props = withDefaults(
    defineProps<{
        specs?: CardDataParams | null;
        facets?: CardDataParams | null;
        values?: FilterValues;
    }>(),
    {
        specs: () => ({}),
        facets: () => ({}),
        values: () => ({}),
    }
);

const emit = defineEmits<{
    input: [
        {
            name: keyof FilterValues;
            payload: any;
        }
    ];
}>();

const style = useCssModule();

const { data: ids } = await useAsyncData(
    'facetFilterIds',
    () =>
        new Promise<Record<string, string>>(resolve => {
            resolve({
                priceMinId: v4(),
                priceMaxId: v4(),
                categoryId: v4(),
                isShareId: v4(),
                isHighRatingId: v4(),
            });
        })
);

const LABELS = {
    category: 'Категория',
    minPrice: 'Мин.цена',
    maxPrice: 'Макс.цена',
    isShare: 'Участвует в акции',
    isHighRating: 'Высокий рейтинг',
};

const highRatingClassList = computed(() => ({
    [style._disabled]: !props.facets?.isHighRating,
}));

const shareClassList = computed(() => ({
    [style._disabled]: !props.facets?.isShare,
}));

const handleMinPriceInput = (payload: number | null) => {
    let newPayload = payload;

    if (payload) {
        if (props?.facets?.minPrice && payload < props.facets.minPrice) {
            newPayload = props.facets.minPrice;
        }

        if (props?.values?.maxPrice && payload > props.values.maxPrice) {
            newPayload = props.values.maxPrice;
        }

        if (props?.facets?.maxPrice && payload > props.facets.maxPrice) {
            newPayload = props.facets.maxPrice;
        }
    }

    emit('input', {
        name: 'minPrice',
        payload: newPayload,
    });
};

const handleMaxPriceInput = (payload: number | null) => {
    let newPayload = payload;

    if (payload) {
        if (props?.facets?.maxPrice && payload > props.facets.maxPrice) {
            newPayload = props.facets.maxPrice;
        }

        if (props?.values?.minPrice && payload < props.values.minPrice) {
            newPayload = props.values.minPrice;
        }

        if (props?.facets?.minPrice && payload < props.facets.minPrice) {
            newPayload = props.facets.minPrice;
        }
    }

    emit('input', {
        name: 'maxPrice',
        payload: newPayload,
    });
};

const handleCheckInput = (name: keyof FilterValues, payload: boolean) => {
    emit('input', {
        name,
        payload,
    });
};

const handleSelectInput = (payload: string[]) => {
    emit('input', {
        name: 'categories',
        payload,
    });
};
</script>

<template>
    <Panel
        :class="$style.Main"
        header="Фильтровать"
    >
        <div :class="$style.content">
            <div :class="$style.field">
                <label
                    :class="$style.label"
                    :for="ids?.categoryId"
                >
                    {{ LABELS.category }}
                </label>

                <MultiSelect
                    :id="ids?.categoryId"
                    :options="facets?.categories"
                    option-label="name"
                    option-value="id"
                    :model-value="props.values.categories"
                    :show-toggle-all="false"
                    :max-selected-labels="1"
                    @update:model-value="handleSelectInput"
                />
            </div>

            <div :class="$style.field">
                <label
                    :class="$style.label"
                    :for="ids?.priceMinId"
                    >{{ LABELS.minPrice }}
                </label>

                <InputNumber
                    :id="ids?.priceMinId"
                    :model-value="values.minPrice"
                    :placeholder="facets?.minPrice?.toString()"
                    @update:model-value="handleMinPriceInput"
                />
            </div>

            <div :class="$style.field">
                <label
                    :class="$style.label"
                    :for="ids?.priceMaxId"
                    >{{ LABELS.maxPrice }}
                </label>
                <InputNumber
                    :id="ids?.priceMaxId"
                    :model-value="values.maxPrice"
                    :placeholder="facets?.maxPrice?.toString()"
                    @update:model-value="handleMaxPriceInput"
                />
            </div>

            <div :class="$style.checkGroup">
                <div :class="[$style.checkField, shareClassList]">
                    <Checkbox
                        :id="ids?.isShareId"
                        :disabled="!facets?.isShare"
                        :model-value="values.isShare"
                        @update:model-value="
                            handleCheckInput('isShare', $event)
                        "
                        binary
                    />

                    <label
                        :class="$style.checkLabel"
                        :for="ids?.isShareId"
                        >{{ LABELS.isShare }}
                    </label>
                </div>

                <div :class="[$style.checkField, highRatingClassList]">
                    <Checkbox
                        :id="ids?.isHighRatingId"
                        :disabled="!facets?.isHighRating"
                        :model-value="values.isHighRating"
                        @update:model-value="
                            handleCheckInput('isHighRating', $event)
                        "
                        binary
                    />

                    <label
                        :class="$style.checkLabel"
                        :for="ids?.isHighRatingId"
                        >{{ LABELS.isHighRating }}
                    </label>
                </div>
            </div>
        </div>
    </Panel>
</template>

<style lang="scss" module>
.Main {
    //
}

.content {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px 24px;

    @include respond-to(mobile) {
        grid-template-columns: 1fr;
    }
}

.field {
    display: flex;
    flex-direction: column;
}

.label {
    @include text(p3);

    margin-bottom: 8px;
}

.checkGroup {
    display: flex;
    grid-column: span 2;

    @include respond-to(mobile) {
        grid-column: span 1;
    }
}

.checkField {
    display: flex;
    align-items: center;

    &:not(:last-child) {
        margin-right: 24px;
    }

    &._disabled {
        opacity: 0.6;
    }
}

.checkLabel {
    @include text(p3);

    margin-left: 8px;
}
</style>
