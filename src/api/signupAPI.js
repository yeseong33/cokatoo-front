const signupAPI = (Axios) => ({
  sign: (body) =>
    Axios.post('/user', body)
      .then((res) => {
        console.log('user 생성 api 호출성공', res)
        return res
      })
      .catch((err) => {
        throw err
      })
})

export default signupAPI
