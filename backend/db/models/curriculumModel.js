const mongoose = require('mongoose')

const curriculumSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  goal: {
    type: String
  },
  description: {
    type: String
  },
  sections: [{
    name: {
      type: String,
      required: true
    },
    goal: {
      type: String
    },
    resources: [String],
    projects: [String]
  }]
}, {
  timestamps: true
})

const Curriculum = mongoose.model('curriculum', curriculumSchema)

module.exports = Curriculum
