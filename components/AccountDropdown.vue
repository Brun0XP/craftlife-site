<template>
  <div class="relative">
    <button @click="isOpen = !isOpen" class="block h-10 w-10 rounded-lg overflow-hidden border-2 border-gray-200 focus:outline-none focus:border-green-500 hover:border-green-500 transition duration-300">
      <img class="h-full w-full object-cover" :src="'https://minotar.net/avatar/' + $auth.user.realname" alt="">
    </button>
    <div v-if="isOpen" @click="isOpen = false" class="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black opacity-30"></div>
    <div v-if="isOpen" class="absolute right-0 z-50 mt-2 w-64 bg-gray-900 rounded-lg shadow-xl divide-y divide-gray-700">
      <div class="px-4 py-3 ">
        <p class="text-sm text-gray-200">Logado como <span class="font-semibold" v-text="$auth.user.realname"/></p>
        <p class="text-sm font-medium truncate text-gray-100" v-text="$auth.user.email"/>
      </div>
      <div class="py-1">
        <a href="#" class="block px-4 py-2 text-gray-200 hover:bg-green-500 hover:text-white">
          <i class="mdi mdi-lock-reset mr-3 h-5 w-5 " aria-hidden="true" />
          Trocar senha
        </a>
        <button @click="logout" class="block w-full text-left px-4 py-2 text-gray-200 hover:bg-green-500 hover:text-white">
          <i class="mdi mdi-logout mr-3 h-5 w-5 " aria-hidden="true" />
          Sair
        </button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data: () => ({
    isOpen: false,
  }),
  methods: {
    logout() {
      this.$auth.logout()
    },
  }
}
</script>
