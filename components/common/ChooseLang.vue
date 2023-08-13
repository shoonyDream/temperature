<i18n>
{
  "en": {
    "en": "English",
    "ru": "Русский"
  },
  "ru": {
    "en": "English",
    "ru": "Русский"
  }
}
</i18n>

<template lang="pug">
.choose-lang
  Button.lang(
    v-for='item in langList',
    :key='item.lang',
    :accent='item.lang === lang',
    @click='setLanguage(`${item.lang}`)'
  ) {{ item.label }}
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import useI18n from '~/composables/useI18n';
  import type { LangType } from '@/types/Global';
  import Button from '@/components/common/Button.vue';

  export default defineComponent({
    name: 'ChooseLang',
    components: {
      Button,
    },
    setup() {
      const { t } = useI18n();
      const i18n = useI18n({ useScope: 'global', inheritLocale: true });
      const lang = ref<LangType>(i18n.locale.value as LangType);

      const langList = computed(() => [
        {
          label: t('en'),
          lang: 'en',
        },
        {
          label: t('ru'),
          lang: 'ru',
        },
      ]);

      onMounted(() => {
        if (!localStorage.getItem('localLang')) {
          localStorage.setItem('localLang', lang.value);
        } else {
          lang.value = localStorage.getItem('localLang') as LangType;
          i18n.locale.value = lang.value;
        }
      });

      const setLanguage = (item: LangType) => {
        lang.value = item;
        i18n.locale.value = lang.value;
        localStorage.setItem('localLang', i18n.locale.value as LangType);
      };

      return {
        t,
        lang,
        langList,
        setLanguage,
      };
    },
  });
</script>

<style scoped>
  .choose-lang {
    display: flex;
    gap: var(--gutter);
  }
</style>
