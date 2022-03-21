<template>
  <div class="max-w-7xl mx-auto">
    <div class="hidden sm:block">
      <nav class="relative rounded-lg shadow flex divide-x divide-gray-800" aria-label="Tabs">
        <div
          v-for="(tab, index) in tabs" :key="index" @click="selectTab(index)"
          :class="{
            ['text-green-500']: index === activeIndex,
            ['text-gray-200 hover:text-green-500']: index !== activeIndex,
            ['rounded-l-lg']: index === 0,
            ['rounded-r-lg']: index === tabs.length - 1,
            ['group relative min-w-0 flex-1 overflow-hidden bg-gray-700 py-4 px-4 text-sm font-medium text-center hover:bg-gray-800 focus:z-10']: true,
          }"
        >
          <span v-text="tab.header"/>
          <span aria-hidden="true" :class="[index === activeIndex ? 'bg-indigo-500' : 'bg-transparent', 'absolute inset-x-0 bottom-0 h-0.5']" />
        </div>
      </nav>
    </div>

    <slot />
    <!-- <div class="sm:hidden">
      <label for="tabs" class="sr-only">Select a tab</label>
      <select id="tabs" name="tabs" class="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md">
        <option v-for="(tab, index) in tabs" :key="index" :selected="tab">
          <span v-text="tab" />
        </option>
      </select>
    </div> -->
  </div>
</template>

<script>

export default {
  data: () => ({
    activeIndex: 0,
    tabs: [],
  }),
  created () {
    this.tabs = this.$children
  },
  mounted () {
    this.selectTab(0)
  },
  methods: {
    selectTab (i) {
      this.activeIndex = i
      this.tabs.forEach((tab, index) => {
        tab.isActive = (index === i)
      })
    }
   }
}
</script>
