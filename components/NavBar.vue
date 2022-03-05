<template>
  <nav class="bg-gray-900 shadow-lg">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-between py-2">
        <div class="flex space-x-7">
          <div class="flex items-center">
            <!-- Website Logo -->
            <a href="#" class="flex items-center px-2">
              <img src="@/assets/img/icon.png" alt="Logo" class="h-10 w-10 mr-2">
              <span class="font-semibold text-gray-200 text-lg">CraftLife</span>
            </a>
          </div>
          <!-- Primary Navbar items -->
          <div class="hidden md:flex items-center space-x-1">
            <NuxtLink v-for="(navItem, index) in navItems" :key="index" :to="navItem.href"
              class="py-2 px-2 font-semibold"
              :class="{
                'text-green-500 border-b-4 border-green-500': $route.path === navItem.href,
                'text-gray-200 hover:text-green-500 transition duration-300': $route.path !== navItem.href,
              }"
            >
              <span v-text="navItem.name"></span>
            </NuxtLink>
          </div>
        </div>
        <!-- Secondary Navbar items -->
        <div class="hidden md:flex items-center space-x-3 ">
          <AccountDropdown v-if="this.$auth.loggedIn"/>
          <NuxtLink v-else to="/auth/login" class="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Fazer login</NuxtLink>

        </div>
        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button class="outline-none" @click="showMobileMenu = !showMobileMenu">
          <svg class=" w-6 h-6 text-gray-500 hover:text-green-500 "
            x-show="!showMenu"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        </div>
      </div>
    </div>
    <!-- mobile menu -->
    <div v-if="showMobileMenu">
      <ul class="py-2">
        <li v-for="(navItem, index) in navItems" :key="index">
          <NuxtLink :to="navItem.href"
            class="block text-md px-6 py-2 text-gray-200"
            :class="{
              'text-green-500 font-semibold': $route.path === navItem.href,
              'hover:bg-green-500 transition duration-300': $route.path !== navItem.href,
            }"
            v-text="navItem.name"
          />
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  props: {
    navItems: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    showMobileMenu: false,
  }),
}
</script>
