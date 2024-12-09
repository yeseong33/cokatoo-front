const gradeAPI = (Axios) => ({
  evaluateGrade: (score) =>
    Axios.get('/grade/evaluate', { params: { score } })
      .then((res) => {
        return res
      })
      .catch((err) => {
        throw err
      })
})

export default gradeAPI
