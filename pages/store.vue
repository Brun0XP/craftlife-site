<template>
  <div>
    <TabView v-if="listing.categories">
      <TabPanel v-for="(category, index) in listing.categories" :key="index" :header="category.name" @tab-activated="selectCategory(category)">
        <TabView v-if="category.only_subcategories" class="pt-4">
          <TabPanel v-for="(subcategory, index) in category.subcategories" :key="index" :header="subcategory.name" @tab-activated="selectSubcategory(subcategory)">
            <CategoryTable :category="subcategory"/>
          </TabPanel>
        </TabView>
        <CategoryTable v-else :category="category"/>
      </TabPanel>
    </TabView>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data: () => ({
    category: null,
    subcategory: null,
  }),
  created() {
    this.$store.dispatch('store/fetchListing')
  },
  methods: {
    selectCategory(category) {
      this.category = category
    },
    selectSubcategory(subCategory) {
      this.subcategory = subCategory
    },
  },
  computed: {
    ...mapGetters({
      listing: 'store/listing',
    }),
  },
}
</script>
