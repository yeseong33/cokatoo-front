import axios from 'axios'
import authAPI from './authAPI.js'
import signupAPI from './signupAPI.js'
import soundAPI from './soundAPI.js'
import store from '@/stores/index.js'
import compareSoundAPI from './compareSoundAPI.js'

// Axios 인스턴스 생성
export const Axios = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // 쿠키를 포함하여 요청
})

// Axios 인터셉터 설정
Axios.interceptors.request.use(
  (config) => {
    const token = store.getters['auth/getToken']
    if (token) {
      config.headers.Authorization = `Bearer ${token}` // JWT가 있을 경우 추가
    } else {
      // JWT가 없으므로 아무것도 하지 않음
      // config.headers.Authorization은 undefined로 남음
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// AuthAPI에 API 인스턴스 전달
export const AuthAPI = authAPI(Axios)
export const SignupAPI = signupAPI(Axios)
export const SoundAPI = soundAPI(Axios)
export const CompareSoundAPI = compareSoundAPI(Axios)
