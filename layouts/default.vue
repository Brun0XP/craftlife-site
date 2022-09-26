<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />

    <a class="flex justify-center items-center fixed right-5 bottom-5 bg-green-500 text-white w-12 h-12 rounded-full cursor-pointer" :href="url" target="_blank">
      <i class="mdi mdi-whatsapp text-4xl"></i>
    </a>
  </div>
</template>

<script>
  export default {
    computed: {
      url() {
        if (this.$auth.loggedIn) {
          return `https://api.whatsapp.com/send?phone=5562992638525&text=Ol%C3%A1,%20me%20chamo%20${this.$auth.user.realname}%20e%20gostaria%20de%20ajuda!`
        }
        return 'https://api.whatsapp.com/send?phone=5562992638525&text=Ol%C3%A1,%20preciso%20de%20ajuda!'
      }
    }
  }
</script>