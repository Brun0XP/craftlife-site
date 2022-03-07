<template>
  <div>
    <TabView>
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
export default {
  middleware: 'auth',
  data: () => ({
    listing: [],
    category: null,
    subcategory: null,
  }),
  async created() {
    await this.$axios.get('/product').then(response => {
      this.listing = response.data;
    });
    console.log(this.product)
  },
  methods: {
    selectCategory(category) {
      this.category = category
    },
    selectSubcategory(subCategory) {
      this.subcategory = subCategory
    },
  }
}
</script>
