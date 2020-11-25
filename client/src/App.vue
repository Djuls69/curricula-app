<template>
<v-app id="app">
  <Header />
  <v-main>
    <v-container>
      <router-view />
    </v-container>
  </v-main>
</v-app>
</template>

<script>
import Header from './components/Header.vue'

export default {
  components: {
    Header
  }
}
</script>
