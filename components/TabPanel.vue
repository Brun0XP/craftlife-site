<template>
  <div v-show="isActive">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    header: {
      type: String,
      required: true
    },
  },
  data: () => ({
    isActive: false
  }),
  watch: {
    isActive(value) {
      if (value) {
        this.$emit('tab-activated', this.header);
      }
    }
  }
}
</script>
