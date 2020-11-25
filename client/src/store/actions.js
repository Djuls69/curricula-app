import axios from 'axios'

const API_URL = 'http://localhost:5000/api/curricula'

export default {
  getCurricula: async ({ commit }) => {
    const res = await axios.get(API_URL)
    commit('updateCurricula', res.data)
  },
  postCurriculum: async ({ commit }, formData) => {
    const { data } = await axios.post(API_URL, formData)
    console.log(data)
  }
}
