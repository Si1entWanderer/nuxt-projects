<script setup></script>

<template>
    <div :class="$style.Container">
        <slot />
    </div>
</template>

<style lang="scss" module>
.Container {
    width: 100%;
    max-width: $container-width;
    height: 100%;
    margin: auto;
    padding: 0 24px;

    @include respond-to(tablet) {
        padding: 0 16px;
    }
}
</style>
