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
                  <div class="relative rounded-lg overflow-hidden">
                    <img v-if="product.image" :src="product.image" class="mb-4 w-full h-full object-center object-cover" />
                  </div>
                  <div class="flex justify-between text-gray-200">
                    <h3 class="font-medium" v-text="product.name" />
                    <h3 class="text-xl font-bold " v-text="formatCurrency(product.price)" />
                  </div>
                </div>
                <div class="mt-6">
                  <Button v-if="!hasInCart(product.id)" @click="addToCart(product)" class="w-full bg-green-500 border border-transparent rounded-md py-2 px-8 text-sm font-medium text-gray-900 hover:bg-green-700">
                    Adicionar ao carrinho <span class="sr-only" v-text="product.name" />
                  </Button>
                  <Button v-else @click="removeFromCart(product.id)" class="w-full bg-red-600 border border-transparent rounded-md py-2 px-8 text-sm font-medium text-gray-900 hover:bg-red-800">
                    Remover do carrinho <span class="sr-only" v-text="product.name" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  props: {
    category: {
      type: Object,
      required: true
    },
  },
  methods: {
    ...mapActions({
      addToCart: 'store/addToCart',
      removeFromCart: 'store/removeFromCart',
    }),
    hasInCart(productId) {
      return this.shoppingCart.map(item => item.id).includes(productId);
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    } 
  },
  computed: {
    ...mapGetters({
      shoppingCart: 'store/shoppingCart'
    })
  },
}
</script>
