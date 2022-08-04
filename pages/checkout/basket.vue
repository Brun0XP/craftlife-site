<template>
  <Container :gap="0">
    <div class="flex flex-col col-span-12 md:col-span-8 bg-gray-900 rounded-t-lg md:rounded-tr-none md:rounded-bl-lg ">
      <div class="p-4 flex justify-between">
        <h2 class="text-gray-200 text-2xl font-bold">Carrinho de compras</h2>
        <h2 class="text-gray-200 text-2xl font-bold"><span v-text="shoppingCart.length"/> itens</h2>
      </div>
      <div class="flex-1 bottom-0 p-4">
        <ul role="list" class="mb-4">
          <li v-for="(product, index) in shoppingCart" :key="index" class="border-b border-gray-700 flex py-6 px-4 sm:px-6">
            <div class="bg-gray-600 rounded-lg flex-shrink-0">
              <img :src="product.image" class="w-20 h-20 p-2" />
            </div>

            <div class="w-full ml-6 flex justify-between text-gray-200">
              <div class="h-full flex flex-col justify-between">
                <h4 class="font-medium" v-text="product.name" />
                <div class="flex hover:text-red-700 cursor-pointer" @click="removeFromCart(product.id)">
                  <i class="mdi mdi-trash-can-outline mr-2 h-5 w-5 " aria-hidden="true" />
                  <span>Remover</span>
                </div>
              </div>
              <p class="font-medium" v-text="formatCurrency(product.price)" />    
            </div>
            
          </li>
        </ul>
        <NuxtLink to="/store" class="text-indigo-600 hover:text-indigo-700 rounded-md py-3 px-4 font-medium">
          <i class="mdi mdi-arrow-left mr-1 h-5 w-5 " aria-hidden="true" />
          <span>Continuar comprando</span>
        </NuxtLink>
      </div>
    </div>
    <div class="col-span-12 md:col-span-4 bg-gray-800 rounded-b-lg md:rounded-bl-none md:rounded-tr-lg">
      <div class="p-4">
        <h2 class="text-gray-200 text-2xl font-bold">Resumo</h2>
      </div>
      <div class="p-4">
        <dl class="space-y-2">
          <div class="flex items-center justify-between text-gray-200">
            <dt><span v-text="shoppingCart.length"/> ITENS</dt>
            <dd class="font-medium" v-text="totalFmt" />
          </div>
          <ValidationObserver ref="personal-form" class="py-8 grid grid-cols-1 gap-y-6">
            <InputText id="nickname" v-model="nickname" label="Nome no jogo" validation-rules="required" />
            <InputText id="coupon" v-model="coupon" label="Cupom de desconto"/>
          </ValidationObserver>
          <div class="flex items-center justify-between border-t border-gray-700 py-8 text-gray-200">
            <dt class="text-base font-medium">Custo total</dt>
            <dd class="text-base font-medium " v-text="totalFmt" />
          </div>

          <button
            class="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 rounded-md shadow-lg py-3 px-4 text-sm font-medium text-white"
            @click="checkout"
          >
            <span>Continuar para o pagamento</span>
          </button>
        </dl>
      </div>
    </div>
  </Container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  asyncData(context) {
    context.store.dispatch('mercadopago/initMercadopago', context);
  },
  data() {
    return {
      nickname: '',
      coupon: '',
    };
  },
  computed: {
    ...mapGetters({
      shoppingCart: 'store/shoppingCart',
      mercadopago: 'mercadopago/mercadopago',
    }),
    totalFmt() {
      const total = this.shoppingCart.reduce((total, product) => {
        return +total + +product.price;
      }, 0);

      return this.formatCurrency(total);
    }
  },
  mounted() {
    if (this.$auth.loggedIn)
      this.nickname = this.$auth.user.realname;
    
  },
  methods: {
    ...mapActions({
      removeFromCart: 'store/removeFromCart',
    }),
    async checkout() {
      const preferenceId = await this.$axios.$post('/payments/preference', {
        items: this.shoppingCart.map(product => product.id),
        nickname: this.nickname,
      });
      this.mercadopago.checkout({
        preference: {
          id: preferenceId
        },
        autoOpen: true,
      });
    },
    formatCurrency(value) {
      return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
    } 
  }
}
</script>
