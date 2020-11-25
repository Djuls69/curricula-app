const mongoose = require('mongoose')
const config = require('config')

module.exports = () => {
  mongoose.connect(config.get('mongoURI'), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }, () => {
    console.log('Database connected')
  })
}