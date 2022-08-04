<template>
  <div class="bg-gray-900 pt-4">
    <div class="max-w-7xl mx-auto bg-gray-700 rounded-lg shadow-lg grid grid-cols-12" :class="'gap-' + gap + ' p-' + padding">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    gap: {
      type: Number,
      default: 4,
    },
    padding: {
      type: Number,
      default: 4,
    },
  },
}
</script>