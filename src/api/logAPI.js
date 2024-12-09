const logAPI = (Axios) => ({
  create: (body) =>
    Axios.post('/log', body)
      .then((res) => {
        return res
      })
      .catch((err) => {
        throw err
      })
})

export default logAPI
