const express = require('express')
const router = express.Router()
const Curriculum = require('../../db/models/curriculumModel')

router.get('/', async (req, res, next) => {
  const curricula = await Curriculum.find({})
  res.json(curricula)
})

router.post('/', async (req, res, next) => {
  const {
    name,
    goal,
    description,
    sections
  } = req.body

  const curriculum = new Curriculum({
    name,
    goal,
    description,
    sections
  })

  await curriculum.save()
  res.json(curriculum)
})

router.get('/:id', async (req, res, next) => {
  try {
    const curriculum = await Curriculum.findById(req.params.id)
    if (!curriculum) {
      return res.status(404).json({
        message: 'Curriculum introuvable'
      })
    }
    res.json(curriculum)
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      message: 'Erreur serveur'
    })
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const curriculum = await Curriculum.findOneAndUpdate({
      _id: req.params.id
    }, {
      ...req.body
    }, {
      new: true
    })
    if (!curriculum) {
      return res.status(404).json({
        message: 'Curriculum introuvable'
      })
    }
    res.json(curriculum)
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      message: 'Erreur serveur'
    })
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const curriculum = await Curriculum.findById(req.params.id)
    if (!curriculum) {
      return res.status(404).json({
        message: 'Curriculum introuvable'
      })
    }
    await curriculum.deleteOne()
    res.json({
      message: 'Curriculum supprimé'
    })
  } catch (err) {
    console.log(err.message)
    return res.status(500).json({
      message: 'Erreur serveur'
    })
  }
})

module.exports = router