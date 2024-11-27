<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

const name = computed({
  get: () => store.getters['signupForm/name'],
  set: (value) => store.dispatch('signupForm/updateName', value)
})

const email = computed({
  get: () => store.getters['signupForm/email'],
  set: (value) => store.dispatch('signupForm/updateEmail', value)
})
const password = computed({
  get: () => store.getters['signupForm/password'],
  set: (value) => store.dispatch('signupForm/updatePassword', value)
})
const passwordConfirm = computed({
  get: () => store.getters['signupForm/passwordConfirm'],
  set: (value) => store.dispatch('signupForm/updatePasswordConfirm', value)
})

const error = computed({
  get: () => store.getters['signupForm/error']
})

const isPasswordConfirm = () => {
  if (password.value !== passwordConfirm.value) {
    alert('비밀번호를 확인해주세요.')
    return false
  }
  return true
}

const handleJoinClick = async () => {
  if (!isPasswordConfirm()) return
  try {
    const res = await store.dispatch('signupForm/handleJoinClick')

    if (res.status == 201) {
      alert('회원가입 성공!')
      router.push('/')
    }
  } catch (error) {
    console.error('회원가입 실패:', error)
    alert(error)
  }
}

const handleCancelClick = () => {
  router.push('/')
}
</script>

<template>
  <form>
    <div class="space-y-12">
      <div class="border-b border-white/10 pb-12">
        <h2 class="text-base font-semibold leading-7 text-white">Personal Information</h2>
        <p class="mt-1 text-sm leading-6 text-gray-400">
          Use a permanent address where you can receive mail.
        </p>

        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div class="sm:col-span-3">
            <label for="Name" class="block text-sm font-medium leading-6 text-white">Name</label>
            <div class="mt-2">
              <input
                type="text"
                name="fName"
                id="Name"
                v-model="name"
                autocomplete="Name"
                class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#DA0037] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-4">
            <label for="email" class="block text-sm font-medium leading-6 text-white"
              >Email address</label
            >
            <div class="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                v-model="email"
                autocomplete="email"
                class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#DA0037] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2"></div>

          <div class="sm:col-span-2">
            <label for="password" class="block text-sm font-medium leading-6 text-white"
              >Password</label
            >
            <div class="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                v-model="password"
                autocomplete="password"
                class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#DA0037] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div class="sm:col-span-2">
            <label for="passwordConfirm" class="block text-sm font-medium leading-6 text-white"
              >Password Confirm</label
            >
            <div class="mt-2">
              <input
                type="password"
                name="passwordConfirm"
                id="passwordConfirm"
                v-model="passwordConfirm"
                autocomplete="address-level1"
                class="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-[#DA0037] sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex items-center justify-end gap-x-6">
      <button
        type="button"
        class="text-sm font-semibold leading-6 text-white"
        @click="handleCancelClick"
      >
        Cancel
      </button>
      <button
        type="button"
        class="rounded-md bg-[#DA0037] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#DA0037] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#DA0037]"
        @click="handleJoinClick"
      >
        Join
      </button>
    </div>
  </form>
</template>
