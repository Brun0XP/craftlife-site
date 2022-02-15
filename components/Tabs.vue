<template>
  <div class="max-w-7xl mx-auto">
    <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <!-- Use an "onChange" listener to redirect the user to the selected tab URL. -->
      <select id="tabs" name="tabs" class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
        <option v-for="tab in tabs" :key="tab.name" :selected="tab.current">
          <span v-text="tab.name" />
        </option>
      </select>
    </div>
    <div class="hidden sm:block">
      <nav class="relative z-0 rounded-lg shadow flex divide-x divide-gray-800" aria-label="Tabs">
        <div v-for="(tab, index) in tabs" :key="index"
          :class="[index === selectedIndex ? 'text-green-500' : 'text-gray-200 hover:text-green-500', index === 0 ? 'rounded-l-lg' : '', index === tabs.length - 1 ? 'rounded-r-lg' : '', 'group relative min-w-0 flex-1 overflow-hidden bg-gray-700 py-4 px-4 text-sm font-medium text-center hover:bg-gray-800 focus:z-10']"
          class="flex items-center justify-center"
          :aria-current="index === selectedIndex ? 'page' : undefined"
          @click="selectTab(index)"
        >
          <span v-text="tab.name"></span>
          <i v-if="tab.only_subcategories" class="mdi mdi-menu-down text-2xl" />

          <span aria-hidden="true" :class="[index === selectedIndex ? 'bg-indigo-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']" />
        </div>
      </nav>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },
    selectedIndex: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    selectTab(index) {
      this.$emit('update:selectedIndex', index);
    },
  }
}
</script>
