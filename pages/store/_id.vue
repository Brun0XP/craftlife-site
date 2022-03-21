<template>
  <Container>
    <div class="col-span-6">
      <div class="p-4 bg-gray-900 rounded-lg">
        <h2 class="text-gray-200 text-2xl font-bold">Informações pessoais</h2>
      </div>
      <div class="p-4 mt-4 bg-gray-900 rounded-lg">
        <ValidationObserver ref="personal-form" class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
          <InputText id="first-name" v-model="form.name" label="Nome" validation-rules="required"/>
          <InputText id="surname" v-model="form.surname"  label="Sobrenome" validation-rules="required"/>
          <InputText id="email" v-model="form.email" label="E-mail" validation-rules="required|email" class="sm:col-span-2"/>
          <InputText id="cpf" v-model="form.identificationNumber" label="CPF" validation-rules="required|cpf" mask="###.###.###-##" autocomplete="cpf" class="sm:col-span-2"/>
        </ValidationObserver>
      </div>

      <div class="p-4 mt-4 bg-gray-900 rounded-lg">
        <h2 class="text-gray-200 text-2xl font-bold">Dados de pagamento</h2>
        <fieldset class="mt-4">
          <legend class="sr-only">Payment type</legend>
          <div class="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
            <div v-for="(paymentMethod) in paymentMethods" :key="paymentMethod.id" class="flex items-center">
              <input :id="paymentMethod.id" :value="paymentMethod.id" name="payment-type" type="radio" class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" v-model="selectedPmtMethod"/>
              <label :for="paymentMethod.id" class="ml-3 block text-sm font-medium text-gray-200">
                {{ paymentMethod.title }}
              </label>
            </div>
          </div>
        </fieldset>
      </div>

      <PixCard v-if="selectedPmtMethod == 'pix'" :transaction_amount="total" :description="product.name + 'de' + $auth.user.realname"/>
      <CreditCard v-if="selectedPmtMethod == 'credit-card'" />

    </div>
    <div class="col-span-6">
      <div class="p-4 bg-gray-900 rounded-lg">
        <h2 class="text-gray-200 text-2xl font-bold">Resumo do pedido</h2>
      </div>
      <div class="mt-4 bg-gray-900 rounded-lg shadow-sm">
        <ul role="list" class="divide-y divide-gray-200">
          <li class="flex py-6 px-4 sm:px-6">
            <div class="flex-shrink-0">
              <img :src="product.image" class="w-20 rounded-md" />
            </div>

            <div class="ml-6 flex-1 flex flex-col">
              <div class="flex">
                <div class="min-w-0 flex-1">
                  <h4 class="text-gray-200 font-medium" v-text="product.name" />
                </div>
              </div>

              <div class="flex-1 pt-2 flex items-end justify-between">
                <p class="mt-1 font-medium text-gray-200" v-text="product.price" />
              </div>
            </div>
          </li>
        </ul>
        <dl class="border-t border-gray-200 py-6 px-4 space-y-2 sm:px-6">
          <div class="flex items-center justify-between text-gray-200">
            <dt>Subtotal</dt>
            <dd class="font-medium">R$ {{ product.price }}</dd>
          </div>
          <div class="flex items-center justify-between text-gray-200">
            <dt>Tarifas</dt>
            <dd class="font-medium">R$ {{ tarifa }}</dd>
          </div>
          <div class="flex items-center justify-between border-t border-gray-200 pt-6 text-gray-200">
            <dt class="text-base font-medium">Total</dt>
            <dd class="text-base font-medium ">R$ {{ total }}</dd>
          </div>
        </dl>

        <div class="border-t border-gray-200 py-6 px-4 sm:px-6">
          <button
            :disabled="!selectedPmtMethod"
            class="w-full border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50"
            :class="{
              'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500': selectedPmtMethod,
              'bg-gray-400 cursor-default': !selectedPmtMethod,
            }"
            @click="checkout"
          >
            <span v-if="loading()">Loading...</span>
            <span v-else>Confirmar compra</span>
          </button>
        </div>
      </div>

      <div class="mt-4 bg-red-700 rounded-lg shadow-sm">
        <p v-if="error()" class="p-4 text-center font-bold text-xl text-red-200" v-text="error()" />
      </div>
    </div>
  </Container>
</template>

<script>
import { mapActions, mapGetters} from 'vuex';

export default {
  middleware: 'auth',
  asyncData(context) {
    context.store.dispatch('mercadopago/initMercadopago', context);
  },
  data: () => ({
    product: {},
    tarifa: 3.5,
    paymentMethods: [
      { id: 'pix', title: 'Pix', selected: true },
      { id: 'credit-card', title: 'Cartão de crédito', selected: false },
      { id: 'boleto', title: 'Boleto', selected: false },
    ],
    selectedPmtMethod: '',
    form: {
      name: '',
      surname: '',
      email: '',
      cardNumber: '' ,
      cardholderName: '',
      cardExpirationMonth: '',
      cardExpirationYear: '',
      securityCode: '',
      identificationType: 'CPF',
      identificationNumber: '',
    },
    showPixModal: false,
  }),
  computed: {
    cardExpirationDate: {
      get() {
        if (this.form.cardExpirationMonth.length >= 2) {
          return this.form.cardExpirationMonth + '/' + this.form.cardExpirationYear;
        }
        return this.form.cardExpirationMonth;
      },
      set(value) {
        this.form.cardExpirationMonth = value.split('/')[0] ? value.split('/')[0] : '';
        this.form.cardExpirationYear = value.split('/')[1] ? value.split('/')[1] : '';
      }
    },
    total() {
      return this.product.price + this.tarifa;
    }
  },
  created() {
    this.$axios.get('/product/' + this.$route.params.id).then(response => {
      this.product = response.data;
    });
  },
  watch: {
    selectedPmtMethod(value) {
      if (value === 'boleto') {
        this.tarifa = 3.5;
      } else {
        this.tarifa = 0;
      }
    }
  },
  methods: {
    ...mapActions({
      createCardToken: 'mercadopago/createCardToken',
      createPayment: 'mercadopago/createPayment',
      checkoutPix: 'mercadopago/checkoutPix',
    }),
    ...mapGetters({
      error: 'error',
      loading: 'loading',
    }),
    async checkout() {
      const isPersonalFormValid = await this.$refs['personal-form'].validate()
      if (!isPersonalFormValid) return;
      if (this.selectedPmtMethod === 'pix') {
        this.checkoutPix({
          productId: this.$route.params.id,
          email: this.form.email,
          firstName: this.form.name,
          lastName: this.form.surname,
          cpf: this.form.identificationNumber
        })
        this.showPixModal = true;
      }
    },
  }
}
</script>
