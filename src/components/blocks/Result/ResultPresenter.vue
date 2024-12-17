<script setup>
import { initChart } from '@/api/chart'
import { initTable } from '@/api/rankTable'
import { ref, onMounted } from 'vue'
import blackCockatoo from '@/assets/grade/블랙코카투.png'
import brid from '@/assets/grade/금조류.png'
import columbidae from '@/assets/grade/비둘기.png'
import { useStore } from 'vuex'
import { LogAPI } from '@/api'

const store = useStore()

const gradeDetails = {
  1: {
    description: `코카투는 사람의 말을 흉내내는 능력이 매우 뛰어납니다. 특히 인간과의 상호작용에서 말을 배워서 흉내내는 습성을 보여줍니다.\n코카투만큼 소리를 잘 따라하시네요!\n코카투는 저희 서비스의 상징이기도 합니다!`,
    imageSrc: blackCockatoo,
    videoTilte: "세상에서 가장 똑똑한 앵무새", 
    videoCode: "yOAHCn3VDvI"
  },
  2: {
    description: `금조류는 사물, 사람의 소리를 잘 흉내내는 습성이 있습니다.\n금조류만큼 소리를 잘 흉내 내시네요!`,
    imageSrc: brid,
    videoTilte: "금조류 킬링벌스", 
    videoCode: "RqgKVGDz0YA"
  },
  3: {
    description: `비둘기는 소리를 잘 흉내내진 않습니다. 구구거릴 뿐이죠 하지만 귀여우니 너무 낙심하지 마세요!`,
    imageSrc: columbidae,
    videoTilte: "구구구구구", 
    videoCode: "ROQuQYljHGI"
  }
}
const result = ref({
  name: '나의 유사도 결과는:',
  value: ref(null),
  description: '',
  imageSrc: '',
  videoCode: '',
  videoTilte: ''
})

// const result = {
//   name: '나의 유사도 결과는:',
//   value: '76.6',
//   description: 금조류는 사물, 사람의 소리를 잘 흉내내는 습성이 있습니다. 금조류만큼 소리를 잘 흉내 내시네요!,
//   imageSrc: brid,
//   videoCode: 'RqgKVGDz0YA'
// }

// const result = {
//   name: '나의 유사도 결과는:',
//   value: '24.5',
//   description: 비둘기는 소리를 잘 흉내내진 않습니다. 구구거릴 뿐이죠 하지만 귀여우니 너무 낙심하지 마세요!,
//   imageSrc: columbidae,
//   videoCode: 'ROQuQYljHGI'
// }

// Chart와 Table DOM 요소 참조
const chartDom = ref(null)
const tableRef = ref(null)

const getResult = async () => {
  const similarityScore = store.state.result.similarityScore * 100
  result.value.value = similarityScore.toFixed(1) // ref로 감싼 value에 접근

  const grade = store.state.result.grade

  // grade에 맞는 값으로 동적으로 설정
  const gradeInfo = gradeDetails[grade] || gradeDetails.A // 기본값은 'A'로 설정
  result.value.description = gradeInfo.description
  result.value.imageSrc = gradeInfo.imageSrc
  result.value.videoCode = gradeInfo.videoCode
  result.value.videoTilte = gradeInfo.videoTilte
}

// onMounted 훅에서 초기화
onMounted(() => {
  if (chartDom.value) initChart(chartDom.value)
  if (tableRef.value) initTable(tableRef.value)
  getResult()
})

// 공유 기능
function share(platform) {
  const url = window.location.href
  let shareUrl = ''
  switch (platform) {
    case 'facebook':
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
      break
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`
      break
    case 'linkedin':
      shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}`
      break
    default:
      return
  }
  window.open(shareUrl, '_blank', 'noopener,noreferrer')
}

// URL 복사 기능
function copyToClipboard() {
  const url = window.location.href
  navigator.clipboard
    .writeText(url)
    .then(() => {
      alert('현재 페이지 URL이 클립보드에 복사되었습니다.')
    })
    .catch((err) => {
      alert('URL 복사에 실패했습니다.')
      console.error('URL 복사 오류:', err)
    })
}
</script>

<template>
  <div class="bg-[#171717] border-2 border-[#444444] p-8 rounded-lg space-y-8 mb-20">
    <div class="flex flex-col lg:flex-row lg:gap-8 items-center">
      <!-- result Details -->
      <div class="lg:w-1/2 lg:max-w-lg lg:self-end text-center lg:text-left">
        <h1 class="text-3xl font-bold tracking-tight text-gray-300 sm:text-4xl">
          {{ result.name }}
        </h1>
        <div class="mt-4">
          <span class="text-8xl font-semibold tracking-tight text-[#DA0037]">
            {{ result.value }}
          </span>
        </div>
        <section aria-labelledby="information-heading" class="mt-4">
          <p class="text-base text-gray-500 mt-4">{{ result.description }}</p>
        </section>
      </div>

      <!-- result Image -->
      <div class="mt-10 lg:mt-0 lg:self-center lg:w-1/2">
        <div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
          <img :src="result.imageSrc" class="h-full w-full object-cover object-center" />
        </div>
      </div>
    </div>
  </div>

  <!-- Video Section -->
  <div class="mb-24 flex justify-center">
    <div class="grid grid-cols-1 gap-8 mt-10 lg:mt-0 w-full justify-center">
      <h3 class="text-xl font-bold tracking-tight text-gray-300 sm:text-4xl mb-4 text-center">
        {{ result.videoTilte }}
      </h3>
      <div class="w-[60%] h-0 pb-[30%] relative mx-auto">
        <iframe
          :src="'https://www.youtube.com/embed/' + result.videoCode"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="absolute top-0 left-0 w-full h-full"
        ></iframe>
      </div>
    </div>
  </div>

  <!-- Chart and Table Section -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 lg:mt-0 w-full">
    <h3 class="text-xl font-bold tracking-tight text-gray-300 sm:text-4xl mb-4 text-center">
      유사도 점수 그래프(전체)
    </h3>
    <h3 class="text-xl font-bold tracking-tight text-gray-300 sm:text-4xl mb-4 text-center">
      RANK
    </h3>

    <div id="chart" ref="chartDom" class="w-full h-[400px] flex justify-center items-center"></div>
    <div id="table" ref="tableRef" class="w-full p-4 rounded-lg bg-gray-900 overflow-auto"></div>
  </div>

  <!-- Share Buttons -->
  <div class="flex justify-center mt-10 w-full">
    <button
      @click="copyToClipboard"
      class="bg-[#DA0037] text-white px-4 py-2 rounded-md mx-2 hover:bg-[#da0037ae]"
    >
      현재 페이지 URL 복사
    </button>
  </div>
</template>

<style scoped></style>
