<template>
  <div>
    <NavBar :nav-items="navbarItems"/>
    <!-- Header -->
    <div class="relative">
      <div class="absolute inset-0">
        <img class="w-full h-full object-cover" src="https://i.imgur.com/AVoKStB.png" alt="" />
        <div class="absolute inset-0 bg-gray-800 bg-opacity-40" aria-hidden="true" />
      </div>
      <div id="particles-js" class="absolute inset-0 part-header"/>
      <div class="relative max-w-7xl mx-auto py-6 px-4 sm:py-10 sm:px-6 lg:px-8">
        <img class="hero mx-auto" height="300px" width="300px" src="@/assets/img/hero.png">
        <section class="max-w-5xl mx-auto z-10 pb-10 px-4 sm:px-6 lg:px-8" aria-labelledby="contact-heading">
          <div class="grid grid-cols-1 gap-y-10 lg:grid-cols-2 lg:gap-y-0 lg:gap-x-40">
            <div class="bg-white bg-opacity-30 rounded-2xl shadow-xl cursor-pointer transition ease-in-out transform hover:-translate-y-2" @click="copyIp()">
              <div class="flex justify-between items-center pl-6 pr-2 py-2">
                <div>
                  <h3 class="text-2xl font-medium text-gray-200">
                    jogar.craftlife.com.br
                  </h3>
                  <p class="text-base text-gray-300">Clique para copiar o IP</p>
                </div>
                <div class="p-5 inline-block bg-indigo-600 rounded-xl shadow-lg">
                  <i class="mdi mdi-minecraft text-4xl text-white" aria-hidden="true" />
                </div>
              </div>
            </div>
            <div class="bg-white bg-opacity-30 rounded-2xl shadow-xl cursor-pointer transition ease-in-out transform hover:-translate-y-2">
              <div class="flex justify-between items-center pl-2 pr-6 py-2">
                <div class="p-5 inline-block bg-indigo-600 rounded-xl shadow-lg">
                  <i class="mdi mdi-discord text-4xl text-white" aria-hidden="true" />
                </div>
                <div>
                  <h3 class="text-2xl font-medium text-gray-200 text-right">
                    <span v-text="online_discord"/> ONLINE AGORA
                  </h3>
                  <p class="text-base text-gray-300 text-right">Clique para se juntar</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import 'particles.js';
import particlesConfig from '@/assets/particles.json'

export default {
  data: () => ({
    supportLinks: [
      {
        name: 'Sales',
        href: '#',
        description:
          'Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.',
        icon: 'mdi mdi-minecraft',
      },
      {
        name: 'Media Inquiries',
        href: '#',
        description:
          'Varius facilisi mauris sed sit. Non sed et duis dui leo, vulputate id malesuada non. Cras aliquet purus dui laoreet diam sed lacus, fames.',
        icon: 'mdi mdi-discord',
      },
    ],
    navbarItems: [
      {
        name: 'Home',
        href: '/',
        icon: 'mdi mdi-home',
      },
      {
        name: 'Regras',
        href: 'https://williamestrela.gitbook.io/craftlife-ajuda/regras',
        icon: 'mdi mdi-comment-text-multiple',
        external: true,
      },
      {
        name: 'Loja',
        href: '/store',
        icon: 'mdi mdi-cart-arrow-right',
      },
      {
        name: 'Punições',
        href: '/punishments',
        icon: 'mdi mdi-shield-off',
      },
      // {
      //   name: 'Votar',
      //   href: '/vote',
      //   icon: 'mdi mdi-shield-check',
      // },
      {
        name: 'Discord',
        href: '/discord',
        icon: 'mdi mdi-discord',
      },
      {
        name: 'Contato',
        href: '/contact',
        icon: 'mdi mdi-phone',
      }
    ],
    online_discord: 0,
  }),
  created() {
    this.$axios.$get('https://discordapp.com/api/guilds/94235856516153344/widget.json')
      .then(response => {
        this.online_discord = response.presence_count
      })
  },
  mounted() {
    window.particlesJS('particles-js', particlesConfig);
  },
  methods: {
    copyIp() {
      navigator.clipboard.writeText('jogar.craftlife.com.br');
      alert("Ip do servidor copiado para sua área de transferência!");
    }
  }
}
</script>

<style scoped>
.part-header {
  background: linear-gradient(0deg, rgba(17,24,39,1) 0%, rgba(17,24,39,0) 50%);
}
@keyframes float {
	0% {
		transform: translatey(0px);
	}
	50% {
		transform: translatey(-20px);
	}
	100% {
		transform: translatey(0px);
	}
}
.hero {
  transform: translatey(0px);
  animation: float 6s ease-in-out infinite;
}
</style>
