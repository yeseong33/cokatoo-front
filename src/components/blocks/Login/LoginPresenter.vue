<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const email = computed({
  get: () => store.getters['login/email'],
  set: (value) => store.dispatch('login/updateEmail', value)
})

const password = computed({
  get: () => store.getters['login/password'],
  set: (value) => store.dispatch('login/updatePassword', value)
})

const handleAuthClick = async () => {
  try {
    const res = await store.dispatch('login/handleAuthClick')
    console.log(res)
    if (res.status == 200) {
      alert('로그인 성공!')
      router.push('/')
    }
  } catch (error) {
    console.error('로그인 실패:', error)
    alert(error.response.data.message)
  }
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-20 w-auto bg-[#444444] rounded-full"
        src="../../../assets/coka.png"
        alt="Your Company"
      />
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" action="#" method="POST">
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-white"
            >Email address</label
          >
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required=""
              v-model="email"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#DA0037] sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white"
              >Password</label
            >
            <div class="text-sm">
              <a href="#" class="font-semibold text-[#DA0037] hover:text-[#da0037ae]"
                >Forgot password?</a
              >
            </div>
          </div>
          <div class="mt-2">
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="password"
              required=""
              v-model="password"
              class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#DA0037] sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <button
            type="button"
            class="flex w-full justify-center rounded-md bg-[#DA0037] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#da0037ae] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA0037]"
            @click="handleAuthClick"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-gray-400">
        Not a member?
        <a href="#" class="font-semibold leading-6 text-[#DA0037] hover:text-[#da0037ae]"
          >Start a 14 day free trial</a
        >
      </p>
    </div>
  </div>
</template>
