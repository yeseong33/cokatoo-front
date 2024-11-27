<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

onMounted(async () => {
  try {
    await store.dispatch('sound/fetchSounds')
  } catch (error) {
    console.error('마운트 실패:', error)
    alert(error.response.data.message)
  }
})

const handleNext = (e, id) => {
  e.preventDefault()
  store.dispatch('sound/setSoundId', id)
  // setSoundData()
  router.push(`/record/${id}`)
}

// Vuex state에서 sounds를 가져와 computed로 사용
const sounds = computed(() => store.state.sound.sounds)
</script>
<template>
  <div class="mx-auto w-full mt-8">
    <h2 class="text-3xl font-bold tracking-tight text-[#DA0037] sm:text-4xl">음원을 선택하세요</h2>
  </div>
  <div class="bg-[#171717]">
    <div class="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8">
      <h2 class="sr-only">Products</h2>

      <div
        class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8"
      >
        <a
          v-for="sound in sounds"
          :key="sound.soundId"
          class="group"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7"
          >
            <iframe
              :src="'https://www.youtube.com/embed/' + sound.origin"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              class="h-full w-full object-cover object-center group-hover:opacity-75"
            ></iframe>
          </div>
          <button
            type="button"
            class="mt-4 rounded-md bg-[#DA0037] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#DA0037] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA0037]"
            @click="(e) => handleNext(e, sound.soundId)"
          >
            {{ sound.name }}
          </button>
        </a>
      </div>
    </div>
  </div>
</template>
