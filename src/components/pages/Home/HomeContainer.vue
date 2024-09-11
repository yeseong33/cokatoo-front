<script setup>
import { onMounted } from 'vue'
import { AuthAPI } from '@/api'

import Layout from '@/layout.vue'
import HomePresenter from './HomePresenter.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const handleClick = () => {
  router.push('/record')
}
</script>

<template>
  <Layout>
    <HomePresenter :handleClick="handleClick" />
    <!-- <HomePresenter :people="people" :files="files" :handleClick="handleClick" /> -->
  </Layout>
</template>
