<script setup>
import { ref } from 'vue'

// import MainCharacter from '@/components/atoms/MainCharacter.vue'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

const route = useRoute()

const props = defineProps({
  handleClick: Function
})

const handleClick = () => {
  props.handleClick()
}
</script>

<template>
  <div class="bg-[#171717]">
    <div class="px-6 py-44 sm:px-6 sm:py-52 lg:px-8">
      <div class="mx-auto max-w-2xl text-center">
        <h2 class="text-2xl font-bold tracking-tight text-[#DA0037] sm:text-4xl">
          음원을 따라해 보세요! <br />AI 분석으로 얼마나 유사한지 측정합니다.
        </h2>
        <p class="mx-auto mt-6 max-w-xl text-sm sm:text-lg leading-8 text-white">
          원하는 음원을 고른뒤 음원에 가장 가깝게 녹음하고 결과를 받아보세요! <br />
          정확도 통계와 결과를 친구와 공유할 수 있습니다.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <button
            type="button"
            class="rounded-md bg-[#171717] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#444444] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            @click="handleClick"
          >
            음원 선택하기
          </button>
          <router-link
            to="/"
            class="rounded-md bg-[#171717] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#444444] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >기록 보기 <span aria-hidden="true">→</span></router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>
