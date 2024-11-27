const path = 'http://localhost:5001/analyze-similarity'

const compareSoundAPI = (Axios) => ({
  compare: (request) =>
    Axios.post(path, request, {
      withCredentials: true,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then((res) => {
        console.log('통과')
        return res
      })
      .catch((err) => {
        console.error('API 호출 오류:', err)
        throw err
      })
})

export default compareSoundAPI
