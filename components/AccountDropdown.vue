<template>
  <div class="relative">
    <button @click="isOpen = !isOpen" class="block h-10 w-10 rounded-lg overflow-hidden border-2 border-gray-200 focus:outline-none focus:border-green-500 hover:border-green-500 transition duration-300">
      <img class="h-full w-full object-cover" :src="'https://minotar.net/avatar/' + $auth.user.realname" alt="">
    </button>
    <div v-if="isOpen" @click="isOpen = false" class="fixed top-0 left-0 right-0 bottom-0 z-40 bg-black opacity-30"></div>
    <div v-if="isOpen" class="absolute right-0 z-50 mt-2 py-2 w-48 bg-white rounded-lg shadow-xl">
      <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Teste</a>
      <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Teste 2</a>
      <a href="#" class="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white">Teste 3</a>
    </div>
  </div>

</template>

<script>
export default {
  data: () => ({
    isOpen: false,
  })
}
</script>
