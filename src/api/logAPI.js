const logAPI = (Axios) => ({
  create: (body) =>
    Axios.post('/log', body)
      .then((res) => {
        return res
      })
      .catch((err) => {
        throw err
      }),
    scores: () =>
      Axios.get('/log/scores', {
        headers: {
          Accept: 'application/x-ndjson', // NDJSON 형식 데이터 요청
        },
        responseType: 'text', // 텍스트로 데이터를 처리
      })
        .then((res) => res)
        .catch((err) => {
          throw err;
        }),
})

export default logAPI
