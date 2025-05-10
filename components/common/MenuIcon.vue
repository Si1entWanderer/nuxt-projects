<script setup lang="ts">
import { Icons } from '~/types/icons';

withDefaults(
    defineProps<{
        name?: Icons;
    }>(),
    {
        name: Icons.MENU,
    }
);
</script>

<template>
    <button :class="$style.MenuIcon">
        <Icon
            :name="name"
            :class="$style.icon"
        />
    </button>
</template>

<style lang="scss" module>
.MenuIcon {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: $border-radius-m;
    border: none;
    background: white;
}

.icon {
    width: 20px;
    height: 20px;
    color: $dark-800;
}
</style>
