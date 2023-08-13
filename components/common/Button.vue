<template lang="pug">
button.button(:class='{ accent }')
  slot
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';

  export default defineComponent({
    name: 'Button',
    components: {},
    props: {
      accent: {
        type: Boolean,
        default: false,
      },
    },
  });
</script>

<style scoped>
  .button {
    display: flex;
    gap: var(--gutter);
    align-items: center;
    justify-content: center;
    background: var(--bg);
    border-radius: var(--border-radius);
    padding: var(--gutter);
    font-weight: 600;

    &.accent {
      background: var(--accent);
      color: var(--accent-color);
    }

    &[disabled] {
      cursor: not-allowed;
      opacity: 0.4;
    }
  }
</style>
