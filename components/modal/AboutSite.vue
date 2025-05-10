<script setup lang="ts">
import { githubLink } from '~/constants/links';
import { Icons } from '~/types/icons';

const LABELS = {
    title: `Сайт разработал <a href="${githubLink}" target="_blank">Петр&nbsp;Халиков</a>`,
    stackLabel: 'Стек технологий',
};

const TECHNOLOGIES = [
    {
        name: 'Vue 3 composition api',
        icon: Icons.VUE,
    },
    {
        name: 'Nuxt 3',
        icon: Icons.NUXT,
    },
    {
        name: 'Pinia',
        icon: Icons.PINIA,
    },
];
</script>

<template>
    <div :class="$style.AboutSite">
        <h3
            :class="$style.title"
            v-html="LABELS.title"
        />

        <div :class="$style.stack">
            <p
                :class="$style.stackLabel"
                v-html="LABELS.stackLabel"
            />

            <ul :class="$style.technologies">
                <li
                    v-for="item in TECHNOLOGIES"
                    :class="$style.technology"
                    :title="item.name"
                >
                    <Icon
                        :name="item.icon"
                        mode="svg"
                        height="40"
                        width="40"
                    />
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" module>
.AboutSite {
    //
}

.title {
    @include text(h4);

    margin-bottom: 24px;
    font-weight: 400;

    a {
        text-decoration: none;
        color: $primary-500;
    }
}

.stackLabel {
    @include text(p2);

    margin-bottom: 8px;
}

.technologies {
    display: flex;
}

.technology {
    &:not(:last-child) {
        margin-right: 8px;
    }
}
</style>
