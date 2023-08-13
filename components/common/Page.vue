<template lang="pug">
.page
  .header
    slot(name='header')
  .body
    slot(name='body')
</template>

<script lang="ts" setup></script>

<style scoped>
  .page {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    position: relative;
    gap: var(--gutter);

    & .header {
      display: flex;
      gap: var(--gutter);
      justify-content: space-between;
      align-items: center;
    }

    & .body {
      flex-grow: 1;
      min-height: 0;
    }
  }
</style>
