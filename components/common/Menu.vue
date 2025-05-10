<script setup>
import { Icons } from '~/types/icons';

const style = useCssModule();

const isInfoDrawerVisible = ref(false);

const handleInfoClick = () => {
    isInfoDrawerVisible.value = true;
};

const menuItems = [
    {
        label: 'На главную',
        icon: Icons.HOME,
        action: () => {},
    },
    {
        label: 'О сайте',
        icon: Icons.INFO,
        cssClass: style._last,
        action: handleInfoClick,
    },
];
</script>

<template>
    <div :class="$style.Menu">
        <div :class="$style.content">
            <CommonMenuIcon
                v-for="item in menuItems"
                :name="item.icon"
                :title="item.label"
                :class="[
                    $style.icon,
                    {
                        [item.cssClass]: item.cssClass,
                    },
                ]"
                @click="item.action"
            />
        </div>

        <Drawer
            v-model:visible="isInfoDrawerVisible"
            header="О сайте"
        >
            <ModalAboutSite />
        </Drawer>
    </div>
</template>

<style lang="scss" module>
.Menu {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    width: 60px;
    height: 100%;
    padding: 24px 0;
    background: $dark-700;

    @include respond-to(tablet) {
        width: 100%;
        height: 60px;
        padding: 0 24px;
    }
}

.content {
    display: flex;
    flex-direction: column;
    height: 100%;

    @include respond-to(tablet) {
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
}

.icon {
    cursor: pointer;

    &:not(:last-child) {
        margin-bottom: 12px;

        @include respond-to(tablet) {
            margin-bottom: unset;
            margin-right: 12px;
        }
    }

    &._last {
        margin-top: auto;

        @include respond-to(tablet) {
            margin-top: unset;
            margin-left: auto;
        }
    }
}
</style>
