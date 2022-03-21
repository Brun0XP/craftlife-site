<template>
  <div class="mt-4 p-4 bg-gray-900 rounded-lg">
    <h1 class="text-xl text-center text-gray-200">Seu QRCode sera gerado apos você confirmar a compra!</h1>
    <Modal title="Seu pedido foi criado!" :visible.sync="maskShowModal">
      <template slot="body">
        <h2 class="text-xl leading-relaxed text-gray-500 dark:text-gray-400">
              Pague R$ {{ transaction_amount }}
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
        <img v-if="qrCode" :src="'data:image/png;base64, ' + qrCode.base64" alt="QRCode" width="200" class="self-center"/>
        <span class="text-base text-gray-500 dark:text-gray-400 self-center">
          Código válido por 23 horas.
        </span>
      </template>
    </Modal>
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
  data() {
    return {
      maskShowModal: !!this.qrCode,
    }
  },
  watch: {
    qrCode(old, newVal) {
      this.maskShowModal = !!newVal
    }
  },
  computed: {
    ...mapGetters({
      qrCode: 'mercadopago/qrCode'
    })
  },
}
</script>
