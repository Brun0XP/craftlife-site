<template>
  <div>
    <TabView>
      <TabPanel header="Bans" @tab-activated="getPunishes('bans')" />
      <TabPanel header="Mutes" @tab-activated="getPunishes('mutes')" />
      <TabPanel header="Kicks" @tab-activated="getPunishes('kicks')" />
      <TabPanel header="Alertas" @tab-activated="getPunishes('warnings')" />
    </TabView>
    <PunishTable v-if="!loading" :punishs="punishs" />
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: true,
    punishs: [],
  }),
  methods: {
    async getPunishes(type) {
      this.loading = true;
      await this.$axios.get(`/punishment/${type}`, {
        params: {
          page: this.$route.query.page || 1,
          limit: this.$route.query.limit || 10,
        }
      }).then(response => {
        this.punishs = response.data
      })
      this.loading = false;
    },
  }
}
</script>
