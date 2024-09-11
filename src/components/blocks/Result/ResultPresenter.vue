<script setup>
import { initChart } from '@/api/chart'
import { initTable } from '@/api/rankTable'
import { ref, onMounted } from 'vue'
import blackCockatoo from '@/assets/grade/블랙코카투.png'
import columbidae from '@/assets/grade/비둘기.png'
import brid from '@/assets/grade/금조류.png'

const product = {
  name: '나의 유사도 결과는:',
  value: '95.6',
  description: `코카투는 사람의 말을 흉내내는 능력이 매우 뛰어납니다. 특히 인간과의 상호작용에서 말을 배워서 흉내내는 습성을 보여줍니다. 코카투만큼 소리를 잘 따라하시네요! 코카투는 저희 서비스의 상징이기도 합니다!`,
  imageSrc: blackCockatoo,
  videoCode: 'yOAHCn3VDvI'
}

// const product = {
//   name: '나의 유사도 결과는:',
//   value: '76.6',
//   description: `금조류는 사물, 사람의 소리를 잘 흉내내는 습성이 있습니다. 금조류만큼 소리를 잘 흉내 내시네요!`,
//   imageSrc: brid,
//   videoCode: 'RqgKVGDz0YA'
// }

// const product = {
//   name: '나의 유사도 결과는:',
//   value: '24.5',
//   description: `비둘기는 소리를 잘 흉내내진 않습니다. 구구거릴 뿐이죠 하지만 귀여우니 너무 낙심하지 마세요!`,
//   imageSrc: columbidae,
//   videoCode: 'ROQuQYljHGI'
// }

const chartDom = ref(null)
const tableRef = ref(null) // 테이블 DOM 요소를 참조하기 위한 ref

onMounted(() => {
  // ECharts 초기화
  if (chartDom.value) {
    initChart(chartDom.value)
  }
  // Tabulator 초기화
  if (tableRef.value) {
    initTable(tableRef.value)
  }
})

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
      <!-- Product details -->
      <div class="lg:w-1/2 lg:max-w-lg lg:self-end text-center lg:text-left">
        <h1 class="text-3xl font-bold tracking-tight text-gray-300 sm:text-4xl">
          {{ product.name }}
        </h1>
        <div class="mt-4">
          <span class="text-8xl font-semibold tracking-tight text-[#DA0037]">
            {{ product.value }}
          </span>
        </div>
        <section aria-labelledby="information-heading" class="mt-4">
          <p class="text-base text-gray-500 mt-4">{{ product.description }}</p>
        </section>
      </div>

      <!-- Product image -->
      <div class="mt-10 lg:mt-0 lg:self-center lg:w-1/2">
        <div class="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg">
          <img :src="product.imageSrc" class="h-full w-full object-cover object-center" />
        </div>
      </div>
    </div>
  </div>

  <div class="mb-24 flex justify-center">
    <div class="grid grid-cols-1 gap-8 mt-10 lg:mt-0 w-full justify-center">
      <!-- Title for the video -->
      <h3 class="text-xl font-bold tracking-tight text-gray-300 sm:text-4xl mb-4 text-center">
        세상에서 가장 똑똑한 앵무새
      </h3>

      <!-- Video Container -->
      <div
        class="w-[60%] sm:w-[60%] md:w-[60%] lg:w-[60%] xl:w-[60%] h-0 pb-[30%] relative mx-auto"
      >
        <iframe
          :src="'https://www.youtube.com/embed/' + product.videoCode"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="absolute top-0 left-0 w-full h-full object-cover object-center group-hover:opacity-75"
        ></iframe>
      </div>
    </div>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 lg:mt-0 w-full">
    <!-- Graph Title (1st on mobile, 1st on desktop) -->
    <h3
      class="text-xl font-bold tracking-tight text-gray-300 sm:text-4xl mb-4 text-center order-1 lg:order-1"
    >
      유사도 점수 그래프(전체)
    </h3>

    <!-- Table Title (3rd on mobile, 2nd on desktop) -->
    <h3
      class="text-xl font-bold tracking-tight text-gray-300 sm:text-4xl mb-4 text-center order-3 lg:order-2"
    >
      RANK
    </h3>

    <!-- Chart container (2nd on mobile, 3rd on desktop) -->
    <div
      id="chart"
      ref="chartDom"
      class="w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[400px] flex justify-center items-center order-2 lg:order-3"
    ></div>

    <!-- Table container (4th on mobile, 4th on desktop) -->
    <div
      id="table"
      ref="tableRef"
      class="w-full overflow-auto p-4 rounded-lg bg-gray-900 order-4 lg:order-4"
    ></div>
  </div>

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
