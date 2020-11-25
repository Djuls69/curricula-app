<template>
  <v-row no-gutters class="create-curriculum-page">
    <v-col md="6" offset-md="3" sm="8" offset-sm="2">
      <div class="page-header">
        <h1>Créer un curriculum</h1>
        <v-btn @click="saveCurriculum">Sauvegarder</v-btn>
      </div>

      <v-form class="create-form">
        <v-row>
          <v-col cols="3">
            <v-subheader>Nom *</v-subheader>
          </v-col>
          <v-col cols="9">
            <ValidationProvider rules="required" v-slot="{ errors }">
              <v-text-field v-model="name" />
              <small class="error-text">{{ errors[0] }}</small>
            </ValidationProvider>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="3">
            <v-subheader>Objectif</v-subheader>
          </v-col>
          <v-col cols="9">
            <v-text-field v-model="goal" />
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12">
            <v-label>Description</v-label>
            <v-textarea solo name="description" v-model="description" />
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
                      <ValidationProvider rules="required" v-slot="{ errors }">
                        <v-text-field v-model="section.name" />
                        <small class="error-text">{{ errors[0] }}</small>
                      </ValidationProvider>
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
                          <v-form>
                            <v-text-field v-model="section.newResource.name" placeholder="Nom de la ressource" />
                            <ValidationProvider
                              :rules="{
                                link: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/
                              }"
                              v-slot="{ errors }"
                            >
                              <v-text-field v-model="section.newResource.link" placeholder="Lien de la ressource" />
                              <small class="error-text">{{ errors[0] }}</small>
                            </ValidationProvider>
                          </v-form>
                          <v-btn @click="addItem('resource', sectionIndex)">Valider</v-btn>
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
                            <v-text-field v-model="section.newProject.name" placeholder="Nom du projet" />
                            <v-text-field v-model="section.newProject.link" placeholder="Lien du projet" />
                            <v-btn @click="addItem('project', sectionIndex)">Valider</v-btn>
                          </v-form>
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
    </v-col>
    <v-snackbar v-model="snackbar" :right="true" :top="true" :timeout="4000">
      {{ snackbarText }}

      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-row>
</template>

<script>
import { mapActions } from 'vuex'
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'CreateCurriculum',
  components: {
    ValidationProvider
  },
  data: () => {
    return {
      name: '',
      goal: '',
      description: '',
      sections: [
        {
          name: '',
          goal: '',
          newResource: {
            name: '',
            link: ''
          },
          resources: [],
          newProject: {
            name: '',
            link: ''
          },
          projects: []
        }
      ],
      snackbar: false,
      snackbarText: ''
    }
  },
  methods: {
    ...mapActions(['postCurriculum']),
    saveCurriculum() {
      const { name, goal, description, sections } = this
      const newSections = sections.map(section => {
        let updatedSection = { ...section }
        delete updatedSection.newResource
        delete updatedSection.newProject
        return updatedSection
      })
      const formData = { name, goal, description, sections: newSections }
      this.postCurriculum(formData)
    },
    addSection() {
      this.sections.push({
        name: '',
        goal: '',
        newResource: {
          name: '',
          link: ''
        },
        resources: [],
        newProject: {
          name: '',
          link: ''
        },
        projects: []
      })
    },
    addItem(type, index) {
      const key = `new${type[0].toUpperCase()}${type.slice(1)}`
      const item = this.sections[index][key]

      if (item.name) {
        const obj = {
          name: item.name,
          link: item.link
        }
        this.sections[index][`${type}s`].push(obj)
        item.name = ''
        item.link = ''
      } else {
        this.snackbar = true
        this.snackbarText = `Merci de préciser le nom ${type === 'resource' ? 'de la ressource' : 'du projet'}`
      }
    },
    deleteItem(type, sectionIndex, index) {
      if (type === 'resources') {
        this.sections[sectionIndex].resources.splice(index, 1)
      } else if (type === 'projects') {
        this.sections[sectionIndex].projects.splice(index, 1)
      }
    }
  }
}
</script>
