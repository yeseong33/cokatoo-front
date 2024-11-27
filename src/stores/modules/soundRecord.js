import { CompareSoundAPI } from '@/api'

const state = {
  isRecording: false,
  audioChunks: [],
  mediaRecorder: null,
  recordAudio: null,
  finalAudioUrl: null,
  audioFile: null,
  compareResult: null,
  path: null // 경로 변수 추가
}

const mutations = {
  SET_RECORDING_STATE(state, isRecording) {
    state.isRecording = isRecording
  },
  ADD_AUDIO_CHUNK(state, chunk) {
    state.audioChunks.push(chunk)
  },
  SET_MEDIA_RECORDER(state, mediaRecorder) {
    state.mediaRecorder = mediaRecorder
  },
  SET_RECORD_AUDIO(state, audio) {
    state.recordAudio = audio
  },
  SET_FINAL_AUDIO(state, audioUrl) {
    state.finalAudioUrl = audioUrl
  },
  SET_AUDIO_FILE(state, audioFile) {
    state.audioFile = audioFile
  },
  CLEAR_AUDIO_CHUNKS(state) {
    state.audioChunks = []
  },
  SET_COMPARE_RESULT(state, result) {
    state.compareResult = result
  },
  SET_PATH(state, path) {
    state.path = path // 경로 설정하는 mutation 추가
  }
}

const actions = {
  async toggleRecording({ state, commit }) {
    if (!state.isRecording) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mediaRecorder = new MediaRecorder(stream)

        commit('SET_MEDIA_RECORDER', mediaRecorder)

        mediaRecorder.ondataavailable = (event) => {
          commit('ADD_AUDIO_CHUNK', event.data)
        }

        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(state.audioChunks, { type: 'audio/webm' })
          const audioUrl = URL.createObjectURL(audioBlob)
          const audio = new Audio(audioUrl)

          commit('SET_AUDIO_FILE', audioBlob)
          commit('SET_RECORD_AUDIO', audio)
          commit('SET_FINAL_AUDIO', audioUrl)
          commit('CLEAR_AUDIO_CHUNKS')
        }

        mediaRecorder.start()
        commit('SET_RECORDING_STATE', true)
      } catch (error) {
        console.error('음성 녹음 오류:', error)
      }
    } else {
      state.mediaRecorder.stop()
      commit('SET_RECORDING_STATE', false)
    }
  },
  playRecording({ state }) {
    if (state.recordAudio) {
      state.recordAudio.play()
    } else {
      console.warn('재생할 녹음이 없습니다.')
    }
  },
  downloadRecording({ state }) {
    if (state.finalAudioUrl) {
      const audioUrl = state.finalAudioUrl
      const a = document.createElement('a')
      a.href = audioUrl
      a.download = 'recording.webm'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(audioUrl)
    } else {
      console.warn('다운로드할 녹음이 없습니다.')
    }
  },
  setPath({ commit }, path) {
    commit('SET_PATH', path)
  },
  async compareSound({ state }) {
    try {
      if (!state.path) {
        console.warn('파일 경로가 설정되지 않았습니다.')
        return
      }

      console.log('파일 경로 이름 : ', state.path)
      const formData = new FormData()
      const file1Path = '/assets/sound/' + state.path
      const file1 = await fetch(file1Path)
      const file1Blob = await file1.blob()
      console.log('파일1 : ', file1Blob)
      console.log('파일2 : ', state.audioFile)

      formData.append('file1', file1Blob, state.path)
      formData.append('file2', state.audioFile, 'recording.webm') // 명확한 파일 이름과 확장자 추가

      const response = await CompareSoundAPI.compare(formData)

      console.log(response)
      console.log('음원 비교 완료:', response)
      return response
    } catch (error) {
      console.log('음원 비교 실패:', error)
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
