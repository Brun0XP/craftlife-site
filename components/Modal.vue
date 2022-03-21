<!-- This example requires Tailwind CSS v2.0+ -->
<template>
  <div
    class="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 flex justify-center items-center md:inset-0 h-modal sm:h-full"
    :class="{ 'hidden': !visible }"
  >
    <div class="relative px-4 w-full max-w-lg h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
            <slot name="header">
              <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                {{ title }}
              </h3>
              <button
                type="button"
                class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                @click="close"
              >
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </button>
            </slot>
          </div>
            <div class="p-6 space-y-6">
              <slot name="body">
                <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                  Modal body
                </p>
              </slot>
            </div>
            <!-- Modal footer -->
            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <button class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Modal footer
              </button>
            </div>
        </div>
    </div>
</div>

</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: 'Default modal',
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      maskVisible: this.visible,
    }
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    },
  },
}
</script>
