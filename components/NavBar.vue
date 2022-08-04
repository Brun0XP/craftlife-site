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
            <div v-for="(navItem, index) in navItems" :key="index" >
              <component
                :is="navItem.external ? 'a' : 'NuxtLink'" :to="navItem.href" :href="navItem.href" :target="navItem.external ? '_blank' : ''"
                class="py-2 px-2 font-semibold"
                :class="{
                  'text-green-500 border-b-4 border-green-500': $route.path === navItem.href,
                  'text-gray-200 hover:text-green-500 transition duration-300': $route.path !== navItem.href,
                }"
              >
                <span v-text="navItem.name"></span>
              </component>
            </div>
          </div>
        </div>
        <!-- Secondary Navbar items -->
        <div class="hidden md:flex items-center space-x-3 ">
          <NuxtLink to="/checkout/basket" class="w-10 h-10 flex relative items-center justify-center text-gray-200 rounded-lg mr-2">
            <i class="mdi mdi-cart-outline text-xl"></i>
            <span class="sr-only">Carrinho de compras</span>
            <div class="inline-flex absolute top-0 -right-1 justify-center items-center w-5 h-5 text-xs font-bold text-gray-200 bg-red-500 rounded-full border-2 border-red-300" v-text="shoppingCart.length"/>
          </NuxtLink>
          <AccountDropdown v-if="$auth.loggedIn"/>
          <NuxtLink v-else to="/auth/login" class="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Fazer login</NuxtLink>
        </div>
        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button class="outline-none" @click="showMobileMenu = !showMobileMenu">
            <svg class="hamburger" :class="{ ['is-opened']: showMobileMenu }">
              <line x1="0" y1="50%" x2="100%" y2="50%" class="hamburger__bar hamburger__bar--top" />
              <line x1="0" y1="50%" x2="100%" y2="50%" class="hamburger__bar hamburger__bar--mid" />
              <line x1="0" y1="50%" x2="100%" y2="50%" class="hamburger__bar hamburger__bar--bot" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <!-- mobile menu -->
    <div v-if="showMobileMenu">
      <ul class="py-2">
        <li v-for="(navItem, index) in navItems" :key="index">
          <component
            :is="navItem.external ? 'a' : 'NuxtLink'" :to="navItem.href" :href="navItem.href" :target="navItem.external ? '_blank' : ''"
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
import { mapGetters } from 'vuex';

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
  computed: {
    ...mapGetters({
      shoppingCart: 'store/shoppingCart',
    }),
  },
}
</script>

<style scoped>
.hamburger {
  width: 16px;
  height: 16px;
}

.hamburger__bar {
  transition-property: transform;
  transition-duration: 0.3s;
  transform-origin: center;
  stroke: white;
  stroke-width: 10%;
}

.hamburger__bar--top {
  transform: translateY(-40%);
}

.hamburger__bar--bot {
  transform: translateY(40%);
}

.is-opened .hamburger__bar--top {
  transform: rotate(45deg);
}

.is-opened .hamburger__bar--mid {
  transform: scaleX(0.1);
}

.is-opened .hamburger__bar--bot {
  transform: rotate(-45deg);
}
</style>
