<script setup>
import { ref, onMounted, computed, onBeforeUnmount } from 'vue'
import { onBeforeRouteLeave, useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const audioDuration = ref(null)
const audioRef = ref(null)
let recordingTimeout = null
const isLoading = ref(false)

// Progress state
const recordingProgress = ref(0)

// Function to get audio duration
const getAudioDuration = () => {
  if (audioRef.value) {
    audioRef.value.addEventListener('loadedmetadata', () => {
      audioDuration.value = audioRef.value.duration
      console.log('Audio duration:', audioDuration.value)
    })
  }
}

const setSoundData = async () => {
  try {
    const soundId = store.state.sound.id
    if (soundId !== -1) {
      getAudioDuration()
      await store.dispatch('sound/getSound', soundId)
    }
  } catch (error) {
    console.error('Error setting sound data:', error)
  }
}
onMounted(async () => {
  await setSoundData()
})

// watch(getAudioDuration())

// watch(() => store.state.sound.id, await setSoundData())

const toggleRecording = async () => {
  // Progress를 0으로 리셋할 때 transition을 잠시 비활성화
  recordingProgress.value = 0

  // 녹음 시작
  await store.dispatch('soundRecord/toggleRecording')

  if (store.state.soundRecord.isRecording) {
    // Progress 업데이트는 녹음 시작 후 잠시 뒤에 진행
    setTimeout(() => {
      // 이때 transition이 다시 활성화되고 progress가 음원 길이에 맞게 100까지 증가
      recordingProgress.value = 100
    }, 10) // 10ms 지연 후에 transition과 progress 업데이트 시작

    // 음원 길이만큼 녹음한 후 자동 중지
    recordingTimeout = setTimeout(async () => {
      await store.dispatch('soundRecord/toggleRecording')
      console.log('녹음 자동 종료')
      recordingProgress.value = 100 // 녹음이 끝나면 progress를 100으로
    }, audioDuration.value * 1000) // 음원의 길이(ms)만큼 대기
  } else {
    if (recordingTimeout) clearTimeout(recordingTimeout) // 녹음 중지 시 타이머 정리
    recordingProgress.value = 0 // 녹음이 중지되면 progress를 0으로
  }
}

const playRecording = () => {
  store.dispatch('soundRecord/playRecording')
  store.dispatch('soundRecord/downloadRecording')
}

const handlePlayAudio = () => {
  console.log(store.state.sound.sound)
  if (audioRef.value) {
    audioRef.value.play()
  }
}

// 음원 재생 중지 함수
const stopAudio = () => {
  if (audioRef.value && !audioRef.value.paused) {
    audioRef.value.pause()
    audioRef.value.currentTime = 0
  }
}
onBeforeUnmount(() => {
  stopAudio()
})

onBeforeRouteLeave((to, from, next) => {
  stopAudio()
  next()
})

const handleNext = () => {
  // 로딩 상태를 활성화
  isLoading.value = true

  // 3초 후에 결과 창으로 이동
  setTimeout(() => {
    router.push(`/result`)
  }, 2000) // 3초 대기
}
// Vuex state에서 sounds를 가져와 computed로 사용
const sound = computed(() => store.state.sound.sound)
</script>

<template>
  <div class="bg-[#171717]">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
      <div v-if="store.state.sound.sound" class="sm:flex sm:items-baseline sm:justify-between">
        <h2 class="text-2xl font-bold tracking-tight text-white px-1">
          {{ store.state.sound.sound.name }}
        </h2>
      </div>

      <div
        class="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:grid-rows-2 sm:gap-x-6 lg:gap-8 h-96"
      >
        <!-- sound 데이터가 로드된 후에 렌더링 -->
        <div
          v-if="store.state.sound.sound"
          class="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2 relative content-center hover:opacity-75 hover:cursor-pointer"
          @click="handlePlayAudio"
        >
          <img
            :src="`/assets/thumbnail/${store.state.sound.sound.thumbnail}`"
            alt="Sound thumbnail"
            class="object-cover w-full h-full"
          />
          <div
            aria-hidden="true"
            class="bg-gradient-to-b from-transparent to-black opacity-50 absolute inset-0"
          />
          <div class="flex items-end p-6 absolute inset-0">
            <div class="justify-center">
              <!-- 오디오 재생기 -->
              <audio ref="audioRef" class="mt-2">
                <source :src="`/assets/sound/${store.state.sound.sound.path}`" type="audio/mp3" />
              </audio>
            </div>
          </div>
        </div>

        <!-- 로딩 중 표시 (스켈레톤) -->
        <div
          v-else
          class="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-h-1 sm:aspect-w-1 sm:row-span-2 relative content-center hover:opacity-75 hover:cursor-pointer bg-gray-700 animate-pulse"
        >
          <div class="bg-gradient-to-b from-transparent to-black opacity-50 absolute inset-0"></div>
          <div class="flex items-end p-6 absolute inset-0">
            <div class="bg-gray-600 h-8 w-24 rounded"></div>
            <!-- 스켈레톤 UI -->
          </div>
        </div>

        <!-- 녹음 시작 버튼 -->
        <div
          class="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full"
        >
          <button
            type="button"
            @click="toggleRecording"
            class="relative block w-full h-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="size-6 mx-auto mb-2 text-[#DA0037]"
            >
              <path d="M8.25 4.5a3.75 3.75 0 1 1 7.5 0v8.25a3.75 3.75 0 1 1-7.5 0V4.5Z" />
              <path
                d="M6 10.5a.75.75 0 0 1 .75.75v1.5a5.25 5.25 0 1 0 10.5 0v-1.5a.75.75 0 0 1 1.5 0v1.5a6.751 6.751 0 0 1-6 6.709v2.291h3a.75.75 0 0 1 0 1.5h-7.5a.75.75 0 0 1 0-1.5h3v-2.291a6.751 6.751 0 0 1-6-6.709v-1.5A.75.75 0 0 1 6 10.5Z"
              />
            </svg>
            <span class="mt-2 block text-sm font-semibold text-[#DA0037]">
              {{ store.state.soundRecord.isRecording ? '녹음 중...' : '새 녹음 시작' }}
            </span>

            <!-- Progress Bar -->
            <div class="mt-4 w-full h-2 bg-gray-200 rounded-full">
              <div
                class="h-full bg-[#DA0037] rounded-full"
                :style="{
                  width: `${recordingProgress}%`,
                  transition: recordingProgress === 0 ? 'none' : `width ${audioDuration}s linear`
                }"
              ></div>
            </div>
          </button>
        </div>

        <div
          class="group aspect-h-1 aspect-w-2 overflow-hidden rounded-lg sm:aspect-none sm:relative sm:h-full"
        >
          <div class="flex justify-between h-full">
            <button
              type="button"
              @click="playRecording"
              class="w-full rounded-md bg-[#DA0037] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#da0037ae] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
            >
              녹음 재생
            </button>

            <button
              type="button"
              class="w-full ml-4 rounded-md bg-[#DA0037] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#da0037ae] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA0037]"
              @click="handleNext"
            >
              비교하기
            </button>
          </div>
        </div>
      </div>

      <!-- 로딩 중 표시 -->
      <div v-if="isLoading" class="loader-container flex flex-col items-center justify-center">
        <div class="flex flex-col text-center justify-center items-center">
          <h3 class="text-white text-2xl sm:text-4xl mb-4">비교 분석중</h3>
          <!-- 글씨 크기 조정 -->
          <div class="loader"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
/* 전체 화면을 덮는 로딩 스피너 */
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 다른 요소 위에 위치시키기 위해 높은 z-index */
}

.loader {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #da0037; /* Red */
  border-radius: 70%;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
