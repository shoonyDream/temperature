<template lang="pug">
.dropdown-container
  .target(ref='targetRef')
    slot(name='target')
  .dropdown(v-if='isVisible', ref='dropdownRef', :style='getStyles')
    .arrow(:style='getArrowStyles')
    slot(name='dropdown')
</template>

<script lang="ts">
  import type { PropType } from 'vue';
  import { defineComponent, ref, toRefs } from 'vue';
  import { teleportPopupApi } from '@/store/teleport';

  export default defineComponent({
    name: 'Dropdown',
    components: {},
    props: {
      isVisible: {
        type: Boolean,
        default: false,
      },
      position: {
        type: String as PropType<'left' | 'right'>,
        default: 'right',
      },
    },
    setup(props) {
      const { cleanedData } = teleportPopupApi;

      const { position } = toRefs(props);
      const targetRef = ref<HTMLElement | null>(null);
      const dropdownRef = ref<HTMLElement | null>(null);

      const getStyles = computed(() => {
        return {
          ...(position.value === 'left' ? { left: '100%' } : { right: '40px' }),
        };
      });

      const getArrowStyles = computed(() => {
        return {
          ...(position.value === 'left' ? { left: '-5px' } : { right: '-5px' }),
        };
      });

      onMounted(() => {
        window.addEventListener('click', handleClickOutside);
      });

      onBeforeUnmount(() => {
        window.removeEventListener('click', handleClickOutside);
      });

      const handleClickOutside = (event: MouseEvent) => {
        if (!dropdownRef.value) return;
        const { target } = event;

        if (
          dropdownRef.value !== target &&
          !dropdownRef.value?.contains(target as HTMLElement) &&
          targetRef.value !== target &&
          !targetRef.value?.contains(target as HTMLElement)
        ) {
          cleanedData();
        }
      };

      return {
        cleanedData,
        targetRef,
        dropdownRef,
        getStyles,
        getArrowStyles,
      };
    },
  });
</script>

<style scoped>
  .dropdown {
    position: absolute;
    top: 0;
    right: 40px;
    width: 280px;
    line-height: 1.1;
    background: #fff;
    box-shadow: var(--box-shadow);
    padding: var(--gutter);
    z-index: 1;
    border-radius: var(--border-radius);

    & .arrow {
      position: absolute;
      top: 12px;
      right: -5px;
      background: var(--accent);
      width: 10px;
      height: 10px;
      transform: rotate(45deg);
      box-shadow: var(--box-shadow);
      z-index: -1;
    }
  }
</style>
