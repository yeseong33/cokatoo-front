const path = '/auth'
const authAPI = (Axios) => ({
  login: (body) =>
    Axios.post(path + '/authenticate', body)
      .then((res) => {
        return res
      })
      .catch((err) => {
        throw err
      })
})

export default authAPI
