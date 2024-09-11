<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isLoading = ref(true) // 로딩 상태를 관리하는 변수

onMounted(
  setTimeout(() => {
    isLoading.value = false // 3초 후 로딩 종료
    router.push(`/result`) // 페이지 이동
  }, 3000)
)

const handleNext = () => {}
</script>

<template>
  <div>
    <!-- 로딩 중일 때 로딩 컴포넌트 표시 -->
    <div v-if="isLoading" class="flex justify-center items-center">
      <div class="loader">로딩 중...</div>
    </div>

    <!-- 로딩이 끝나면 버튼 표시 -->
    <div v-else>
      <button
        @click="handleNext"
        class="rounded-md bg-[#DA0037] px-3.5 py-2.5 text-sm font-semibold text-white"
      >
        결과 페이지로 이동
      </button>
    </div>
  </div>
</template>

<style>
.loader {
  border: 4px solid #f3f3f3; /* Light grey */
  border-top: 4px solid #da0037; /* Red */
  border-radius: 50%;
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
