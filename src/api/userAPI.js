const userAPI = (Axios) => ({
  getUserByJwt: () =>
    Axios.get('/user')
      .then((res) => {
        return res
      })
      .catch((err) => {
        throw err
      })
})

export default userAPI
