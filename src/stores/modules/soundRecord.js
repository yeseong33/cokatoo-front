const state = {
  isRecording: false,
  audioChunks: [],
  mediaRecorder: null,
  recordAudio: null,
  finalAudioUrl: null
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
  CLEAR_AUDIO_CHUNKS(state) {
    state.audioChunks = []
  }
}

const actions = {
  async toggleRecording({ state, commit }) {
    if (!state.isRecording) {
      try {
        // 음성 입력을 위한 사용자 미디어 접근 권한 요청
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const mediaRecorder = new MediaRecorder(stream)

        // 미디어 레코더 설정
        commit('SET_MEDIA_RECORDER', mediaRecorder)

        // 음성 데이터가 수집될 때마다 audioChunks 배열에 추가
        mediaRecorder.ondataavailable = (event) => {
          commit('ADD_AUDIO_CHUNK', event.data)
        }

        // 녹음 종료 시 호출되는 이벤트
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(state.audioChunks, { type: 'audio/webm' })
          const audioUrl = URL.createObjectURL(audioBlob)

          const audio = new Audio(audioUrl)

          commit('SET_RECORD_AUDIO', audio)
          commit('SET_FINAL_AUDIO', audioUrl)

          // 녹음이 끝나면 청크를 초기화
          commit('CLEAR_AUDIO_CHUNKS')
        }

        mediaRecorder.start()
        commit('SET_RECORDING_STATE', true)
      } catch (error) {
        console.error('음성 녹음 오류:', error)
      }
    } else {
      // 녹음 중이면 중지
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
      // Blob에서 URL 생성
      console.log('Blob size:', state.finalAudioUrl.size)
      const audioUrl = state.finalAudioUrl

      // 다운로드 링크 생성
      const a = document.createElement('a')
      a.href = audioUrl
      a.download = 'recording.webm'
      a.click()

      // URL 객체 해제
      URL.revokeObjectURL(audioUrl)
    } else {
      console.warn('다운로드할 녹음이 없습니다.')
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
