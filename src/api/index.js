import axios from 'axios'
import authAPI from './authAPI.js'
import signupAPI from './signupAPI.js'
import soundAPI from './soundAPI.js'

// Axios 인스턴스 생성
export const Axios = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true // 쿠키를 포함하여 요청
})

// AuthAPI에 API 인스턴스 전달
export const AuthAPI = authAPI(Axios)
export const SignupAPI = signupAPI(Axios)
export const SoundAPI = soundAPI(Axios)
