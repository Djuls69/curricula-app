<template>
  <v-app id="app">
    <Header />
    <v-main>
      <v-container>
        <router-view />
      </v-container>
    </v-main>
    <Snackbar />
  </v-app>
</template>

<script>
import Header from './components/Header'
import Snackbar from './components/Snackbar'

export default {
  components: {
    Header,
    Snackbar
  }
}
</script>
