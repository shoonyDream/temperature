<i18n>
{
  "en": {
    "header": "Temperature sensor status",
    "deleteDescription": "Are you sure you want to delete the {n} temperature value?",
    "id": "ID",
    "temperature": "Temperature",
    "add": "Add new",
    "empty": "Scientists have calculated that the chances of the real existence of such an openly absurd world are equal to one in a million. However, wizards have calculated that the chance of \"one in a million\" falls nine times out of ten.",
    "addEmpty": "Let's do it!",
    "delete": "Delete",
    "cancel": "Cancel"
  },
  "ru": {
    "header": "Состояние датчика температур",
    "deleteDescription": "Вы уверены, что хотите удалить {n} значение температуры?",
    "id": "ID",
    "temperature": "Температура",
    "add": "Добавить",
    "empty": "Ученые подсчитали, что шансы реального существования столь откровенно абсурдного мира равняются одному на миллион. Однако волшебники подсчитали, что шанс «один на миллион» выпадает в девяти случаях из десяти.",
    "addEmpty": "К новым наблюдениям!",
    "delete": "Удалить",
    "cancel": "Отменить"
  }
}
</i18n>

<template lang="pug">
Page.index
  template(#header)
    H1 {{ t('header') }}
    Button.btn(v-if='data.length', accent, @click='onAdd')
      Icon.icon(name='ic20-plus', width='20', height='20')
      span.text {{ t('add') }}
  template(#body)
    .container
      .empty-data(v-if='!data.length')
        .lead {{ t('empty') }}
        Button.btn(accent, @click='onAdd')
          Icon.icon(name='ic20-plus', width='20', height='20')
          span.text {{ t('addEmpty') }}
      Table(v-else, :columns='columns', :data='data')
        template(#action='{ row }')
          .column-container
            Button.btn(@click='onEdit(row.id)')
              Icon.icon(name='ic20-edit', width='20', height='20')
            Dropdown.delete-dropdown-container(:is-visible='isVisible && teleportName === `DeleteNotify-${row.id}`')
              template(#target)
                Button.btn(@click='onDelete(row.id)')
                  Icon.icon(name='ic20-delete', width='20', height='20')
              template(#dropdown)
                .description {{ t('deleteDescription', { n: row.temperature }) }}
                .column-container
                  Button.btn(accent, @click='onRowDelete(row.id)') {{ t('delete') }}
                  Button.btn(@click='cleanedData') {{ t('cancel') }}
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { useStore } from 'effector-vue/composition';
  import { useRouter } from 'vue-router';
  import useI18n from '~/composables/useI18n';
  import { teleportPopupApi } from '@/store/teleport';
  import { temperatureApi } from '@/store/temperature';
  import Table from '@/components/common/Table.vue';
  import Icon from '@/components/common/Icon.vue';
  import Button from '@/components/common/Button.vue';
  import Dropdown from '@/components/common/Dropdown.vue';
  import Page from '@/components/common/Page.vue';
  import H1 from '@/components/common/H1.vue';

  export default defineComponent({
    name: 'Index',
    components: {
      Table,
      Icon,
      Dropdown,
      Button,
      Page,
      H1,
    },

    setup() {
      const { openTeleportPopup, teleportPopupStore, cleanedData } = teleportPopupApi;
      const { temperatureStore, getTemperatureFx, deleteTemperature } = temperatureApi;

      const { t } = useI18n();
      const router = useRouter();

      const teleportPopup = useStore(teleportPopupStore);
      const data = useStore(temperatureStore);

      const teleportName = ref('');

      const isVisible = computed(() =>
        Boolean(teleportPopup.value && teleportName.value && teleportPopup.value.name === teleportName.value)
      );

      const columns = computed(() => [
        {
          field: 'id',
          title: t('id'),
        },
        {
          field: 'temperature',
          title: t('temperature'),
        },
        {
          field: 'action',
          title: '',
          slot: true,
        },
      ]);

      onMounted(async () => {
        await getTemperatureFx();
      });

      const onEdit = async (id: string) => {
        await router.push({
          name: 'temperature-edit-tempId',
          params: { tempId: id },
        });
      };

      const onDelete = (id: string) => {
        isVisible.value ? hideContext() : showContext(id);
      };

      const showContext = (id: string) => {
        teleportName.value = `DeleteNotify-${id}`;
        openTeleportPopup({
          name: `DeleteNotify-${id}`,
        });
      };

      const hideContext = () => {
        teleportName.value = '';
        cleanedData();
      };

      const onRowDelete = (id: string) => {
        deleteTemperature(id);
      };

      const onAdd = async () => {
        await router.push({
          name: 'temperature-new',
        });
      };

      return {
        t,
        columns,
        data,
        isVisible,
        teleportName,
        cleanedData,
        onEdit,
        onAdd,
        onDelete,
        onRowDelete,
      };
    },
  });
</script>

<style scoped>
  .index {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    position: relative;
    gap: var(--gutter);

    & .title {
      font-size: 32px;
      font-weight: 600;
    }

    & .container {
      overflow: hidden;
      position: relative;
      height: 100%;
    }

    & .column-container {
      display: flex;
      gap: var(--gutter);
      width: 100%;
      height: 100%;
      justify-content: flex-end;
    }

    & .empty-data {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 16px;

      & .lead {
        text-align: center;
        line-height: 1.3;
        font-size: 18px;
        max-width: 800px;
      }

      & .btn {
        width: fit-content;
      }
    }
  }

  .delete-dropdown-container {
    position: relative;

    & .column-container {
      margin-top: var(--gutter);
      justify-content: flex-start;

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
      background: white;
      box-shadow: var(--box-shadow);
      padding: 8px;
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
