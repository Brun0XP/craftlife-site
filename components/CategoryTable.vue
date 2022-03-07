<template>
  <Container v-if="!category.only_subcategories">
      <div class="col-span-12 md:col-span-9">
        <div class="mb-4 p-4 bg-gray-900 rounded-lg">
          <h2 class="text-2xl font-bold text-gray-200 text-center" v-text="'Pacotes da sessão ' + category.name" />
        </div>
        <div class="bg-gray-900 rounded-lg">
          <div class="max-w-2xl mx-auto py-16 px-4 sm:pb-24 sm:pt-4 sm:px-4 lg:max-w-7xl lg:px-4">
            <div class="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-3">
              <div v-for="product in category.packages" :key="product.id" class="bg-gray-700 p-4 rounded-lg">
                <div class="relative">
                  <div class="relative w-full h-72 rounded-lg overflow-hidden">
                    <img :src="product.image" class="w-full h-full object-center object-cover" />
                  </div>
                  <div class="mt-4 flex justify-between text-gray-200">
                    <h3 class="font-medium" v-text="product.name" />
                    <h3 class="text-xl font-bold " v-text="'R$ ' + product.price" />
                  </div>
                </div>
                <div class="mt-6">
                  <NuxtLink :to="'/store/' + product.id" class="relative flex bg-green-500 border border-transparent rounded-md py-2 px-8 items-center justify-center text-sm font-medium text-gray-900 hover:bg-gray-200 cursor-pointer">
                    Comprar agora<span class="sr-only" v-text="product.name" />
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: true
    },
  }
}
</script>
