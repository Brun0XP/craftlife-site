<template>
  <div class="mt-4 p-4 bg-gray-900 rounded-lg">
    <h1 class="text-xl text-center text-gray-200">Seu QRCode sera gerado apos você confirmar a compra!</h1>
    <img v-if="qrCode" :src="'data:image/png;base64, ' + qrCode.base64" alt="QRCode" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      qrCode: 'mercadopago/qrCode'
    })
  },
}
</script>
