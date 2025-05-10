<script setup lang="ts">
import type { CardData } from '~/types/facet-filter';
import { DEFAULT_CARD_DATA } from '~/types/facet-filter';

const props = withDefaults(
    defineProps<{
        cardData?: CardData;
    }>(),
    {
        cardData: () => DEFAULT_CARD_DATA,
    }
);

const style = useCssModule();

const categoriesNames = computed(() =>
    props.cardData.categories.map(item => item.name)
);

const priceClassList = computed(() => ({
    [style._share]: props.cardData.isShare,
}));
</script>

<template>
    <article :class="$style.Card">
        <div :class="$style.imageContainer">
            <NuxtImg
                :class="$style.image"
                :src="cardData.image"
                loading="lazy"
            />
        </div>

        <div :class="$style.content">
            <h3
                :class="$style.title"
                v-html="cardData.name"
            />

            <p
                :class="$style.brand"
                v-html="cardData.brand.name"
            />

            <p :class="$style.categories">
                Категории: {{ categoriesNames.join(', ') }}
            </p>

            <div :class="$style.rating">
                <Rating
                    :class="$style.stars"
                    :model-value="cardData.rating"
                    readonly
                />

                <p :class="$style.ratingLabel">
                    {{ cardData.rating }}
                </p>
            </div>

            <p :class="[$style.price, priceClassList]">
                <span :class="$style.regularPrice">
                    {{ cardData.price }}&#8381;
                </span>

                <span :class="$style.sharePrice">
                    {{ cardData.sharePrice }}&#8381;
                </span>
            </p>
        </div>
    </article>
</template>

<style lang="scss" module>
.Card {
    display: flex;
}

.imageContainer {
    flex-shrink: 0;
    height: 240px;
    width: 160px;
    margin-right: 12px;
}

.image {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.content {
    display: flex;
    flex-direction: column;
}

.title {
    @include text(h4);
}

.brand {
    @include text(p3);

    color: $dark-400;
}

.categories {
    @include text(p2);

    margin-top: 12px;
}

.rating {
    display: flex;
    margin-top: 12px;
    margin-bottom: 12px;
}

.ratingLabel {
    @include text(p3);

    margin-left: 8px;
}

.price {
    @include text(h2);

    display: flex;
    flex-direction: column;
    margin-top: auto;

    &._share {
        .regularPrice {
            color: $dark-400;
            text-decoration: line-through;
        }

        .sharePrice {
            display: initial;
        }
    }
}

.sharePrice {
    display: none;
}
</style>
