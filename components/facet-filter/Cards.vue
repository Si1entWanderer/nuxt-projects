<script setup lang="ts">
import type { CardData } from '~/types/facet-filter';

withDefaults(
    defineProps<{
        cardsData?: CardData[];
        isLoading?: boolean;
    }>(),
    {
        cardsData: () => [],
        isLoading: false,
    }
);
</script>

<template>
    <div :class="$style.Cards">
        <DataView
            data-key="id"
            :value="cardsData"
            :class="$style.data"
        >
            <template #list="slotProps">
                <div :class="$style.grid">
                    <FacetFilterCard
                        v-for="item in slotProps.items"
                        :card-data="item"
                    >
                    </FacetFilterCard>
                </div>
            </template>
        </DataView>

        <UiLoader
            v-if="isLoading"
            :spinner-class="$style.spinner"
            :class="$style.loader"
        />
    </div>
</template>

<style lang="scss" module>
.Cards {
    position: relative;
}

.grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 24px 24px;
    padding: 24px 0;

    @include respond-to(s_tablet) {
        grid-template-columns: 1fr;
    }
}

.loader {
    position: absolute;
    left: 0;
    top: 0;
    z-index: 3;

    .spinner {
        position: absolute;
        left: 50%;
        top: 48px;
    }
}
</style>
