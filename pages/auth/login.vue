<template>
  <Container>
    <div class="col-start-1 col-span-12 sm:col-start-3 sm:col-span-8 md:col-start-4 md:col-span-6 lg:col-start-5 lg:col-span-4">
      <ValidationObserver ref="form">
        <form class="bg-gray-800 shadow-md rounded px-8 pb-8 my-10" @submit.prevent="login">
          <img :src="hatUrl" alt="skin" class="rounded-lg mx-auto transform -translate-y-10" width="96">
          <ValidationProvider v-slot="{ errors }" name="Username" rules="required|max:16">
            <div :class="{ 'mb-2': errors[0], 'mb-4': !errors[0] }">
              <label class="block text-gray-200 text-sm font-bold mb-2" for="username">
                Nome de usuário ou email
              </label>
              <input v-model="user.username" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                :class="{ 'border-red-500': errors[0] }"
                id="username" type="text" placeholder="Username" required
              >
            </div>
            <p class="text-red-600 text-xs mb-2" v-text="errors[0]" />
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" name="Email" rules="required|min:3">
            <div :class="{ 'mb-2': errors[0], 'mb-6': !errors[0] }">
              <label class="text-gray-200 text-sm font-bold mb-2 flex items-center justify-between" for="password">
                <span>Senha</span>
                <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                  Esqueceu sua senha?
                </a>
              </label>
              <input v-model="user.password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                :class="{ 'border-red-500': errors[0] }"
                id="password" type="password" placeholder="******************" required>
            </div>
            <p class="text-red-600 text-xs mb-4" v-text="errors[0]" />
          </ValidationProvider>
          <vue-hcaptcha sitekey="61774e15-d712-4ad0-9943-c48703d80188" v-if="requireHcaptcha" class="flex justify-center mb-4" @verify="verifyCaptcha"></vue-hcaptcha>
          <button class="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit" v-text="'Entrar'"/>
        </form>
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
    hatUrl: 'https://minotar.net/avatar/steve',
    requireHcaptcha: false
  }),
  methods: {
    async login() {
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
    }
  },
  async mounted() {
    // await this.$axios.get('/auth/rate-limit').then(res => {
    //   this.requireHcaptcha = res.data.status
    // })
  }
}
</script>
