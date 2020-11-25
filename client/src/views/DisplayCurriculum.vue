<template>
  <v-row no-gutters class="display-curriculum-page">
    <v-col md="6" offset-md="3" sm="8" offset-sm="2">
      <v-row>
        <v-col>
          <h1 class="hover-display-icon">
            {{ selectedCurriculum.name }}
            <v-icon class="editable-icon">mdi-pencil-box-outline</v-icon>
          </h1>
          <p class="hover-display-icon">
            {{ selectedCurriculum.description }}
            <v-icon class="editable-icon">mdi-pencil-box-outline</v-icon>
          </p>
        </v-col>
      </v-row>

      <v-row>
        <v-col>
          <v-expansion-panels multiple>
            <v-expansion-panel v-for="(section, i) in selectedCurriculum.sections" :key="i">
              <v-expansion-panel-header> Section {{ i + 1 }} - {{ section.name }} </v-expansion-panel-header>

              <v-expansion-panel-content>
                <v-list subheader two-line flat>
                  <v-subheader>Liste des ressources</v-subheader>

                  <v-list-item-group multiple>
                    <v-list-item
                      :inactive="true"
                      :ripple="false"
                      v-for="(resource, idx) in section.resources"
                      :key="idx"
                    >
                      <template v-slot:default="{ active }">
                        <v-list-item-action>
                          <v-checkbox color="primary"></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                          <v-list-item-title>
                            <router-link to="`/${resource.link}`">{{ resource.name }}</router-link>
                          </v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>

                <v-list subheader two-line flat>
                  <v-subheader>Liste des projets</v-subheader>

                  <v-list-item-group multiple>
                    <v-list-item :inactive="true" :ripple="false" v-for="(project, idx) in section.projects" :key="idx">
                      <template v-slot:default="{ active }">
                        <v-list-item-action>
                          <v-checkbox color="primary"></v-checkbox>
                        </v-list-item-action>

                        <v-list-item-content>
                          <v-list-item-title>
                            <router-link to="`/project.link`">{{ project.name }}</router-link>
                          </v-list-item-title>
                        </v-list-item-content>
                      </template>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      selectedCurriculum: {}
    }
  },
  computed: {
    ...mapState(['curricula'])
  },
  mounted() {
    this.selectedCurriculum = this.curricula.find(curr => curr._id === this.$route.params.id)
  }
}
</script>
