import Aura from '@primevue/themes/aura';

const primevueOptions = {
    options: {
        theme: {
            preset: Aura,
            options: {
                darkModeSelector: '.app-dark-mode',
            },
        },
    },
};

const googleFontsOptions = {
    families: {
        Inter: [300, 400, 500, 600],
    },
};

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    modules: [
      '@nuxt/image',
      '@nuxt/icon',
      ['@primevue/nuxt-module', primevueOptions],
      '@pinia/nuxt',
      ['@nuxtjs/google-fonts', googleFontsOptions],
      '@nuxt/content',
    ],
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: '@use "~/assets/style/main.scss" as *;',
                },
            },
        },
    },
});