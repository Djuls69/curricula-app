<template>
  <v-snackbar
    v-model="snackbar.show"
    :color="snackbar.variant"
    :multi-line="true"
    :right="true"
    :top="true"
    :timeout="5000"
  >
    {{ snackbar.message }}

    <template v-slot:action="{ attrs }">
      <v-btn text @click="updateSnackbar({ show: false })">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  computed: {
    ...mapState(['snackbar'])
  },
  methods: {
    ...mapMutations(['updateSnackbar'])
  }
}
</script>

<style></style>
