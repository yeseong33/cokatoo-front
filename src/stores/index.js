import { createStore } from 'vuex'
import user from './modules/user'
import product from './modules/product'
import signupForm from './modules/signupForm'
import login from './modules/login'
import soundRecord from './modules/soundRecord'
import sound from './modules/sound'
import header from './modules/header'
import auth from './modules/auth'
import result from './modules/result'
// 다른 모듈들도 임포트

const store = createStore({
  modules: {
    user,
    product,
    signupForm,
    login,
    soundRecord,
    sound,
    header,
    auth,
    result
  }
})

export default store
