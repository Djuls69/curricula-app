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

    <FormSections
      :sections="sections"
      :addItem="addItem"
      :deleteItem="deleteItem"
      :nameRules="nameRules"
      :linkRules="linkRules"
    />

    <v-btn class="create-section-btn" @click="addSection">
      Ajouter une section
    </v-btn>
  </v-form>
</template>

<script>
import FormSections from './FormSections'

export default {
  components: {
    FormSections
  },
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
