<template lang="pug">
div
  Html
    Head
      Title Temperature
  ClientOnly
    NuxtLayout
      NuxtPage
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';

  export default defineComponent({
    name: 'App',
    setup() {
      const router = useRouter();

      router.beforeEach((to, from, next) => {
        next();
      });
    },
  });
</script>
