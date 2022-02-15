<template>
  <footer class="bg-gray-900">
    <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
      <div class="flex justify-center space-x-6 md:order-2">
        <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-gray-200 hover:text-gray-400 cursor-pointer">
          <span class="sr-only">{{ item.name }}</span>
          <i :class="item.icon" class="text-xl" aria-hidden="true" />
        </a>
      </div>
      <div class="mt-8 md:mt-0 md:order-1">
        <p class="text-left text-base text-gray-200">&copy; 2012-2022 CraftLife. Todos os direitos reservados.</p>
        <p class="text-left text-base text-gray-200">Site desenvolvido por <a href="https://www.brunodsr.com" class="text-indigo-500">Bruno Rodrigues.</a></p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data: () => ({
    navigation: [
      {
        name: 'Facebook',
        href: '#',
        icon: 'mdi mdi-facebook'
      },
      {
        name: 'Instagram',
        href: '#',
        icon: 'mdi mdi-instagram'
      },
      {
        name: 'Twitter',
        href: '#',
        icon: 'mdi mdi-twitter',
      },
      {
        name: 'GitHub',
        href: '#',
        icon: 'mdi mdi-github',
      },
    ]
  })
}
</script>
