<script setup></script>

<template>
    <div :class="$style.Default">
        <div :class="$style.menu">
            <CommonMenu />
        </div>

        <div :class="$style.content">
            <CommonContainer>
                <slot />
            </CommonContainer>
        </div>
    </div>
</template>

<style lang="scss" module>
.Default {
    display: flex;
    height: 100vh;

    @include respond-to(tablet) {
        flex-direction: column-reverse;
    }
}

.menu {
    flex-shrink: 0;
}

.content {
    flex-grow: 1;
    overflow: auto;
}
</style>
