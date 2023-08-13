<i18n>
{
  "en": {
    "title": "New temperature value",
    "save": "Save",
    "cancel": "Cancel"
  },
  "ru": {
    "title": "Новое значение температуры",
    "save": "Сохранить",
    "cancel": "Отменить"
  }
}
</i18n>
<template lang="pug">
Page.new-temperature
  template(#header)
    H1 {{ t('title') }}
  template(#body)
    input.input(v-model='inputValue')
    .container
      Button.btn(accent, :disabled='!inputValue.trim()', @click='onSave') {{ t('save') }}
      Button.btn(@click='router.back()') {{ t('cancel') }}
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import useI18n from '~/composables/useI18n';
  import { temperatureApi } from '@/store/temperature';
  import Page from '@/components/common/Page.vue';
  import H1 from '@/components/common/H1.vue';
  import Button from '@/components/common/Button.vue';

  export default defineComponent({
    name: 'New',
    components: {
      Page,
      H1,
      Button,
    },
    props: {
      isVisible: {
        type: Boolean,
        default: false,
      },
    },
    setup() {
      const { addNewTemperature } = temperatureApi;

      const router = useRouter();
      const { t } = useI18n();
      const inputValue = ref('');

      const onSave = () => {
        addNewTemperature(inputValue.value.trim());
        goBack();
      };

      const goBack = async () => {
        await router.push({ name: 'index' });
      };

      return {
        t,
        inputValue,
        router,
        onSave,
      };
    },
  });
</script>

<style scoped>
  .new-temperature {
    & .input {
      padding: var(--gutter);
      border-radius: var(--border-radius);
      border: 1px solid var(--accent);
    }

    & .container {
      display: flex;
      gap: var(--gutter);
    }

    & .btn {
      margin-top: 16px;
    }
  }
</style>
