<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        spinnerClass?: string;
    }>(),
    {
        spinnerClass: '',
    }
);

const spinnerClassList = computed(() => ({
    [props.spinnerClass]: props.spinnerClass,
}));
</script>

<template>
    <div :class="$style.Loader">
        <ProgressSpinner
            :class="[$style.spinner, spinnerClassList]"
            style="width: 50px; height: 50px"
        />
    </div>
</template>

<style lang="scss" module>
.Loader {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    background: rgba(white, 0.6);
}
</style>
