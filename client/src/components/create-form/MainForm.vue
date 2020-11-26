<template>
  <v-form ref="pet-info-form" class="create-form">
    <v-row>
      <v-col cols="3">
        <v-subheader>Nom *</v-subheader>
      </v-col>
      <v-col cols="9">
        <v-text-field v-model="petInfo.name" :rules="nameRules" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="3">
        <v-subheader>Objectif</v-subheader>
      </v-col>
      <v-col cols="9">
        <v-text-field v-model="petInfo.goal" />
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <v-label>Description</v-label>
        <v-textarea solo name="description" v-model="petInfo.description" />
      </v-col>
    </v-row>

    <v-row v-for="(section, sectionIndex) in sections" :key="sectionIndex">
      <v-col cols="12">
        <div class="curriculum-list">
          <v-card outlined>
            <v-card-title>Section #{{ sectionIndex + 1 }}</v-card-title>
            <v-card-text>
              <v-row>
                <v-col cols="3">
                  <v-subheader>Nom *</v-subheader>
                </v-col>
                <v-col cols="9">
                  <v-text-field v-model="section.name" :rules="nameRules" required />
                </v-col>
              </v-row>

              <v-row>
                <v-col cols="3">
                  <v-subheader>Objectif</v-subheader>
                </v-col>
                <v-col cols="9">
                  <v-text-field v-model="section.goal" />
                </v-col>
              </v-row>

              <v-card class="resources-card">
                <v-card-text>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-form lazy-validation ref="form">
                        <v-text-field
                          v-model="section.newResource.name"
                          :rules="nameRules"
                          label="Nom de la ressource"
                        />
                        <v-text-field
                          v-model="section.newResource.url"
                          :rules="linkRules"
                          label="Lien de la ressource"
                        />
                      </v-form>
                      <v-btn @click="addItem('resource', sectionIndex)">Valider la ressource</v-btn>
                    </v-col>
                  </v-row>

                  <v-row v-if="section.resources.length">
                    <v-col cols="12">
                      <v-card tile>
                        <template v-for="(resource, index) in section.resources">
                          <v-list-item :key="resource + index">
                            <v-list-item-content>
                              <v-list-item-title> {{ resource.name }} </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-btn icon>
                                <v-icon color="red lighten-2" @click="deleteItem('resources', sectionIndex, index)">
                                  mdi-close-circle
                                </v-icon>
                              </v-btn>
                            </v-list-item-action>
                          </v-list-item>
                          <v-divider v-if="index < section.resources.length - 1" :key="index" />
                        </template>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card class="projects-card">
                <v-card-text>
                  <v-row no-gutters>
                    <v-col cols="12">
                      <v-form>
                        <v-text-field v-model="section.newProject.name" :rules="nameRules" label="Nom du projet" />
                        <v-text-field v-model="section.newProject.url" :rules="linkRules" label="Lien du projet" />
                      </v-form>
                      <v-btn @click="addItem('project', sectionIndex)">Valider le projet</v-btn>
                    </v-col>
                  </v-row>

                  <v-row v-if="section.projects.length">
                    <v-col cols="12">
                      <v-card tile>
                        <template v-for="(project, index) in section.projects">
                          <v-list-item :key="project + index">
                            <v-list-item-content>
                              <v-list-item-title> {{ project.name }} </v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-btn icon>
                                <v-icon color="red lighten-2" @click="deleteItem('projects', sectionIndex, index)">
                                  mdi-close-circle
                                </v-icon>
                              </v-btn>
                            </v-list-item-action>
                          </v-list-item>
                          <v-divider v-if="index < section.projects.length - 1" :key="index" />
                        </template>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
    </v-row>

    <v-btn class="create-section-btn" @click="addSection">
      Ajouter une section
    </v-btn>
  </v-form>
</template>

<script>
export default {
  props: {
    nameRules: Array,
    linkRules: Array,
    petInfo: Object,
    sections: Array,
    addSection: Function,
    addItem: Function,
    deleteItem: Function
  }
}
</script>

<style></style>
