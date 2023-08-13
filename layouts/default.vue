<i18n>
{
  "en": {
    "header": "Have a nice day! =)",
    "footer": "See you soon!"
  },
  "ru": {
    "header": "Хорошего дня! =)",
    "footer": "До скорой встречи!"
  }
}
</i18n>

<template lang="pug">
.layouts-default
  header.header
    span {{ t('header') }}
    ChooseLang
  main.content
    slot
  footer.footer {{ t('footer') }}
  Icons
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import useI18n from '~/composables/useI18n';
  import Icons from '@/components/common/Icons.vue';
  import ChooseLang from '@/components/common/ChooseLang.vue';

  export default defineComponent({
    name: 'Default',
    components: {
      Icons,
      ChooseLang,
    },
    setup() {
      const { t } = useI18n();
      const route = useRoute();

      onMounted(() => {
        route.meta.layout = 'default';
      });

      return {
        t,
      };
    },
  });
</script>

<style scoped>
  .layouts-default {
    height: 100%;
    display: flex;
    flex-direction: column;

    & .header,
    & .footer {
      padding: var(--gutter) calc(var(--gutter) * 2);
      background: var(--custom-bg);
      font-weight: 600;
    }

    & .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    & .content {
      position: relative;
      flex-grow: 1;
      padding: var(--gutter) calc(var(--gutter) * 2);
      height: calc(100% - 100px);
    }
  }
</style>
