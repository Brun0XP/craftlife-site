<template>
  <div>
    <Header />
    <Nuxt />
    <Footer />
  </div>
</template>

<script>
export default {
  mounted() {
    this.$OneSignal.push(() => {
      this.$OneSignal.isPushNotificationsEnabled((isEnabled) => {
      if (isEnabled) {
        console.log('Push notifications are enabled!')
      } else {
        console.log('Push notifications are not enabled yet.')
      }
    })
})
  }
}
</script>

<style>
  body {
    background-color: #111827;
  }
</style>
