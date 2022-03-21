<template>
  <Container>
    <div class="col-start-1 col-span-12 sm:col-start-3 sm:col-span-8 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4">
      <ValidationObserver ref="form-login" tag="form" class="bg-gray-800 shadow-md rounded px-8 pb-8 my-10 space-y-4 flex flex-col" @submit.prevent="login" v-slot="{ invalid }">
        <img :src="headSkin" alt="skin" class="rounded-lg mx-auto transform -translate-y-10" width="96">
        <InputText v-model="user.username" label="Nome de usuário ou e-mail" validation-rules="required" @blur="changeHeadSkin()"/>
        <InputText v-model="user.password" label="Senha" validation-rules="required|min:3" :link="{name: 'Esqueceu sua senha?', to: '#' }"/>
        <vue-hcaptcha sitekey="61774e15-d712-4ad0-9943-c48703d80188" v-if="requireHcaptcha" class="flex justify-center mb-4" @verify="verifyCaptcha"></vue-hcaptcha>
        <button
          :disabled="invalid"
          class=" w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          :class="{
            'bg-gray-400 cursor-default': invalid,
            'bg-blue-500 hover:bg-blue-700': !invalid,
          }"
          type="submit" v-text="'Entrar'"
        />
      </ValidationObserver>
    </div>
  </Container>
</template>

<script>
import VueHcaptcha from '@hcaptcha/vue-hcaptcha';


export default {
  components: {
    VueHcaptcha,
  },
  data: () => ({
    user: {
      username: '',
      password: '',
      captchaToken: ''
    },
    headSkin: 'https://minotar.net/avatar/steve',
    requireHcaptcha: false
  }),
  methods: {
    async login() {
      if (!await this.$refs['form-login'].validate()) return;
      await this.$auth.loginWith('local', { data: this.user })
      .then(() => {
        this.$router.push('/')
      })
      .catch(e => {
        console.log(e)
      })
    },
    verifyCaptcha(token) {
      this.user.captchaToken = token;
    },
    changeHeadSkin() {
      if (this.user.username)
        this.headSkin = `https://minotar.net/avatar/${this.user.username}`
    },
  },
  async mounted() {
    // await this.$axios.get('/auth/rate-limit').then(res => {
    //   this.requireHcaptcha = res.data.status
    // })
  }
}
</script>
