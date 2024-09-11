const path = '/sound'
const soundAPI = (Axios) => ({
  getAll: () =>
    Axios.get(path)
      .then((res) => {
        return res
      })
      .catch((err) => {
        throw err
      }),
  getSound: (soundId) => {
    return Axios.get(`${path}/${soundId}`)
      .then((res) => {
        return res
      })
      .catch((err) => {
        throw err
      })
  }
})

export default soundAPI
