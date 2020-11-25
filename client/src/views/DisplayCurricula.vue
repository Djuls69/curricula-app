<template>
<v-row no-gutters class="display-curricula-page">
  <v-col md="6" offset-md="3" sm="8" offset-sm="2">

    <div class="page-header">
      <h1>Tous les curriculums</h1>
      <!-- <v-btn href="#/curriculum/create">Créer un nouveau</v-btn> -->
      <v-btn @click="$router.push('/curriculum/create')">Créer un nouveau</v-btn>
    </div>

    <div class="curriculum-list">
      <v-card class="curriculum-card" outlined v-for="curriculum in curricula" :key="curriculum._id">
        <v-card-title>
          <router-link :to="`/curricula/${curriculum._id}`">{{curriculum.name}}</router-link>
        </v-card-title>
        <v-card-text>{{curriculum.description}}</v-card-text>
      </v-card>
    </div>

  </v-col>
</v-row>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  name: 'DisplayCurricula',
  data: () => {
    return {}
  },
  computed: {
    ...mapState(['curricula'])
  },
  methods: {
    ...mapActions(['getCurricula'])
  },
  mounted() {
    this.getCurricula()
  }
}
</script>
