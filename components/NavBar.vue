<template>
  <nav class="bg-gray-900 shadow-lg">
			<div class="max-w-6xl mx-auto px-4">
				<div class="flex justify-between">
					<div class="flex space-x-7">
						<div>
							<!-- Website Logo -->
							<a href="#" class="flex items-center py-4 px-2">
								<img src="@/assets/img/icon.png" alt="Logo" class="h-8 w-8 mr-2">
								<span class="font-semibold text-gray-200 text-lg">CraftLife</span>
							</a>
						</div>
						<!-- Primary Navbar items -->
						<div class="hidden md:flex items-center space-x-1">
              <NuxtLink v-for="(navItem, index) in navItems" :key="index" :to="navItem.href"
                class="py-4 px-2 font-semibold"
                :class="{
                  'text-green-500 border-b-4 border-green-500': navItem.isActive,
                  'text-gray-200 hover:text-green-500 transition duration-300': !navItem.isActive,
                }"
              >
                <span v-text="navItem.name"></span>
              </NuxtLink>
            </div>
					</div>
					<!-- Secondary Navbar items -->
					<div class="hidden md:flex items-center space-x-3 ">
            <a v-if="this.$auth.loggedIn" href="" class="py-2 px-2 font-medium text-gray-200 hover:text-green-500 transition duration-300">
              <span v-text="this.$auth.user.realname"/>
              <i class="mdi mdi-menu-down text-2xl"/>
            </a>

						<NuxtLink v-else to="/auth/login" class="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">Fazer login</NuxtLink>
					</div>
					<!-- Mobile menu button -->
					<div class="md:hidden flex items-center">
						<button class="outline-none mobile-menu-button" @click="toggleMobileMenu()">
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
				<ul class="">
					<li class="active"><a href="index.html" class="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">Home</a></li>
					<li><a href="#services" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Services</a></li>
					<li><a href="#about" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">About</a></li>
					<li><a href="#contact" class="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">Contact Us</a></li>
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
  methods: {
    toggleMobileMenu() {
      this.showMobileMenu = !this.showMobileMenu;
    }
  }
}
</script>
