<template lang="pug">
.table-container.scrollbar
  table.table
    thead.head
      tr.row
        th.col(v-for='column in columns', :key='column.field')
          .content
            .title {{ column.title }}
    tbody.body
      tr.row(v-for='(row, index) in data', :key='row.id')
        td.col(v-for='column in columns', :key='column.field')
          .content
            template(v-if='column.slot')
              slot(:row='row', :index='index', :name='column.field')
            .value(v-else) {{ row[column.field] }}
</template>
<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent } from 'vue';
  import type { TableColumn, TableRow } from '@/types/Table';

  export default defineComponent({
    name: 'Table',
    props: {
      columns: {
        type: Array as PropType<TableColumn[]>,
        default: () => [],
      },
      data: {
        type: Array as PropType<TableRow[]>,
        default: () => [],
      },
    },
  });
</script>

<style scoped>
  .table-container {
    border: none;
    border-radius: var(--border-radius);
    position: relative;
    overflow: auto;
    height: 100%;

    & .table {
      border: none;
      border-collapse: separate;
      border-spacing: 0;
      background-clip: border-box;
      width: 100%;
      min-width: 768px;
      table-layout: fixed;

      & .head {
        & .col {
          font-weight: 600;
        }
      }

      & .row {
        box-shadow: 0 -1px 0 0 var(--bg);

        & .col {
          vertical-align: middle;
          text-align: left;
          padding: 0;

          & .content {
            display: flex;
            align-items: center;
            width: 100%;
            height: 100%;
            padding: calc(var(--gutter) / 2) var(--gutter);
            min-width: 0;

            & .value {
              overflow: hidden;
              text-overflow: ellipsis;
              max-width: 100%;
            }
          }
        }
      }
    }
  }
</style>
