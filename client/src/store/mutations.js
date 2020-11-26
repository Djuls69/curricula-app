export default {
  updateCurricula: (state, curricula) => {
    state.curricula = curricula
  },
  appendCurriculum: (state, curriculum) => {
    state.curricula = [...state.curricula, curriculum]
  },
  updateSnackbar: (state, payload) => {
    state.snackbar = {
      ...state.snackbar,
      ...payload
    }
  }
}
