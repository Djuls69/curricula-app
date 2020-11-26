<template>
  <v-row no-gutters class="create-curriculum-page">
    <v-col md="6" offset-md="3" sm="8" offset-sm="2">
      <div class="page-header">
        <h1>Créer un curriculum</h1>
        <v-btn :disabled="valid" @click="saveCurriculum">Sauvegarder</v-btn>
      </div>

      <MainForm
        :nameRules="nameRules"
        :linkRules="linkRules"
        :petInfo="petInfo"
        :sections="sections"
        :addSection="addSection"
        :addItem="addItem"
        :deleteItem="deleteItem"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import MainForm from '@/components/create-form/MainForm'

const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&\/\/=]*)/

export default {
  name: 'CreateCurriculum',
  components: {
    MainForm
  },
  data: () => {
    return {
      valid: false,
      nameRules: [v => v.length > 0 || 'Un nom est requis'],
      linkRules: [v => v.length < 1 || urlRegex.test(v) || 'Lien URL non valide'],
      petInfo: {
        name: '',
        goal: '',
        description: ''
      },
      sections: [
        {
          name: '',
          goal: '',
          newResource: {
            name: '',
            url: ''
          },
          resources: [],
          newProject: {
            name: '',
            url: ''
          },
          projects: []
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['updateSnackbar']),
    ...mapActions(['postCurriculum']),
    saveCurriculum() {
      if (this.$refs['pet-info-form'].validate()) {
        const { petInfo, sections } = this
        const newSections = sections.map(section => {
          let updatedSection = { ...section }
          delete updatedSection.newResource
          delete updatedSection.newProject
          return updatedSection
        })
        const formData = {
          name: petInfo.name,
          goal: petInfo.goal,
          description: petInfo.description,
          sections: newSections
        }
        this.postCurriculum(formData)
      }
    },
    addSection() {
      this.sections.push({
        name: '',
        goal: '',
        newResource: {
          name: '',
          url: ''
        },
        resources: [],
        newProject: {
          name: '',
          url: ''
        },
        projects: []
      })
    },
    addItem(type, index) {
      const key = `new${type[0].toUpperCase()}${type.slice(1)}`
      const item = this.sections[index][key]
      const testLink = urlRegex.test(item.url)

      if (item.name && item.url && testLink) {
        const obj = {
          name: item.name,
          url: item.url
        }
        this.sections[index][`${type}s`].push(obj)

        item.name = ''
        item.url = ''
        this.$refs.form.reset()
      } else {
        this.updateSnackbar({
          show: true,
          message: !item.name
            ? 'Merci de préciser le nom'
            : !item.url
            ? 'Merci de spécifier un lien'
            : 'Lien non valide',
          variant: 'error'
        })
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
