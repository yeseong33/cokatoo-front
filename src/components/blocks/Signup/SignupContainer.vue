<script setup>
import { onMounted, ref } from 'vue'

import SignupPresenter from './SignupPresenter.vue'
import Layout from '@/layout.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const people = [
  {
    // name: 'Jane Cooper',
    // title: 'Paradigm Representative',
    // role: 'Admin',
    // email: 'janecooper@example.com',
    // telephone: '+1-202-555-0170',
    // imageUrl: '/images/frozen-rizard.png'
    // 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60'
  }
  // More people...
]

onMounted(() => {
  // console.log('홈페이지 마운트 발생');
  // try {
  //   console.log('testAPI 호출시작');
  //   const testAPI = AuthAPI.hello();
  // } catch (error) {
  //   console.log(error);
  // }
})
</script>

<template>
  <Layout>
    <SignupPresenter />
  </Layout>
</template>
