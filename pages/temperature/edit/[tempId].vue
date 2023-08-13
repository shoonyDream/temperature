<i18n>
{
  "en": {
    "title": "Edit temperature value",
    "save": "Save",
    "cancel": "Cancel",
    "cancelDescription": "Are you sure you don't want to save changes?",
    "sure": "Sure",
    "notSure": "Not sure",
    "empty": "Element with this id does not exist. Don't worry =)",
    "goBack": "Go back"
  },
  "ru": {
    "title": "Редактировать значение температуры",
    "save": "Сохранить",
    "cancel": "Отменить",
     "cancelDescription": "Вы уверены, что не хотите сохранить изменения?",
    "sure": "Уверен(а)",
    "notSure": "Подумаю еще",
    "empty": "Элемента с таким id не существует. Не волнуйся =)",
    "goBack": "Вернуться"
  }
}
</i18n>
<template lang="pug">
Page.edit-temperature
  template(#header)
    H1 {{ t('title') }}
  template(#body)
    template(v-if='element?.id')
      input.input(v-model='inputValue')
      .container
        Button.btn(accent, :disabled='!inputValue.trim()', @click='onSave') {{ t('save') }}
        Dropdown.cancel-dropdown-container(:is-visible='isVisible', position='left')
          template(#target)
            Button.btn(@click='onCancel') {{ t('cancel') }}
          template(#dropdown)
            .description {{ t('cancelDescription') }}
            .column-container
              Button.btn(accent, @click='goBack') {{ t('sure') }}
              Button.btn(@click='cleanedData') {{ t('notSure') }}
    .empty-data(v-else)
      .description {{ t('empty') }}
        Button.btn(accent, @click='goBack') {{ t('goBack') }}
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  import { useStore } from 'effector-vue/composition';
  import useI18n from '~/composables/useI18n';
  import { teleportPopupApi } from '@/store/teleport';
  import { temperatureApi } from '@/store/temperature';
  import Page from '@/components/common/Page.vue';
  import H1 from '@/components/common/H1.vue';
  import Button from '@/components/common/Button.vue';
  import Dropdown from '@/components/common/Dropdown.vue';
  import type { TemperatureOption } from '@/types/Global';

  export default defineComponent({
    name: 'New',
    components: {
      Page,
      H1,
      Button,
      Dropdown,
    },
    setup() {
      const { openTeleportPopup, teleportPopupStore, cleanedData } = teleportPopupApi;
      const { temperatureStore, editTemperature, getTemperatureFx } = temperatureApi;

      const route = useRoute();
      const router = useRouter();

      const teleportPopup = useStore(teleportPopupStore);
      const temperatureData = useStore(temperatureStore);

      const { t } = useI18n();

      const element = ref<TemperatureOption>();
      const inputValue = ref('');

      const tempId = route.params.tempId as string;

      const isVisible = computed(() => Boolean(teleportPopup.value && teleportPopup.value.name === 'CancelNotify'));

      onMounted(async () => {
        if (!temperatureData.value.length) await getTemperatureFx();

        element.value = temperatureData.value?.find((item) => item.id === tempId) || { id: '', temperature: '' };
        inputValue.value = element.value?.temperature || '';
      });

      const onSave = () => {
        const setData = { id: tempId, temperature: inputValue.value.trim() };
        editTemperature(setData);
        goBack();
      };

      const onCancel = () => {
        if (element.value?.temperature === inputValue.value.trim()) {
          goBack();
        } else {
          isVisible.value ? cleanedData() : showContext();
        }
      };

      const showContext = () => {
        openTeleportPopup({
          name: 'CancelNotify',
        });
      };

      const goBack = async () => {
        await router.push({ name: 'index' });
      };

      return {
        t,
        inputValue,
        isVisible,
        router,
        element,
        onSave,
        onCancel,
        goBack,
        cleanedData,
      };
    },
  });
</script>

<style scoped>
  .edit-temperature {
    & .input {
      padding: var(--gutter);
      border-radius: var(--border-radius);
      border: 1px solid var(--accent);
    }

    & .container {
      display: flex;
      gap: var(--gutter);
      margin-top: 16px;
    }
  }

  .cancel-dropdown-container {
    position: relative;

    & .column-container {
      margin-top: var(--gutter);
      justify-content: flex-start;
      display: flex;
      gap: var(--gutter);
      width: 100%;
      height: 100%;

      & .btn {
        width: 100%;
      }
    }

    & .dropdown {
      position: absolute;
      top: 0;
      right: 40px;
      width: 200px;
      line-height: 1.1;
      background: #fff;
      box-shadow: var(--box-shadow);
      padding: var(--gutter);
      z-index: 1;
      border-radius: var(--border-radius);

      &::after {
        position: absolute;
        top: 12px;
        content: '';
        right: -5px;
        background: var(--accent);
        width: 10px;
        height: 10px;
        transform: rotate(45deg);
        box-shadow: var(--box-shadow);
        z-index: -1;
      }

      & .description {
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
</style>
