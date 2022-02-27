<template>
  <div class="mt-4 p-4 bg-gray-900 rounded-lg">
    <h1 class="text-xl text-center text-gray-200">Seu QRCode sera gerado apos você confirmar a compra!</h1>
        <!-- Small Modal -->
    <div v-if="qrCode" class="overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-4 z-50 flex justify-center items-center md:inset-0 h-modal sm:h-full" id="small-modal">
      <div class="relative px-4 w-full max-w-md h-full md:h-auto">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div class="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
            <h3 class="text-xl font-medium text-gray-900 dark:text-white">
              Seu pedido foi criado!
            </h3>
            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="small-modal">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
            </button>
          </div>
          <div class="p-6 flex flex-col">
            <h2 class="text-xl leading-relaxed text-gray-500 dark:text-gray-400">
              Pague R$ 20.00
            </h2>
            <ol class="list-decimal list-inside mt-6">
              <li class="mb-1">
                Abra o app do seu banco ou seu app de pagamentos.
              </li>
              <li class="mb-1">
                Busque a opção de pagar com pix.
              </li>
              <li class="mb-1">
                Escanei o seguinte código.
              </li>
            </ol>
            <img :src="'data:image/png;base64, ' + qrCode.base64" alt="QRCode" width="200" class="self-center"/>
            <span class="text-base text-gray-500 dark:text-gray-400 self-center">
              Código válido por 23 horas.
            </span>
          </div>
          <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
            <button
              class="w-full border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
              @click="checkout" v-text="'Conluir'"
            />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    transaction_amount: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
  },
  computed: {
    ...mapGetters({
      qrCode: 'mercadopago/qrCode'
    })
  },
}
</script>
