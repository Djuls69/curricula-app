import axios from 'axios'
import router from '../router'

const API_URL = 'http://localhost:5000/api/curricula'

export default {
  getCurricula: async ({ commit }) => {
    const res = await axios.get(API_URL)
    commit('updateCurricula', res.data)
  },
  postCurriculum: async ({ commit }, formData) => {
    const { data } = await axios.post(API_URL, formData)
    commit('appendCurriculum', data)
    router.push(`/curricula/${data._id}`)
  }
}
