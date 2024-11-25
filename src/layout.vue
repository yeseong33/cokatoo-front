<script setup>
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems
} from '@headlessui/vue'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const router = useRouter()
const store = useStore()

const isNotNav = ['회원가입', '로그인']

// Vuex의 navigation 데이터 가져오기
const origin = computed(() => store.getters['header/navigation'])

// 회원가입 항목을 제외한 navigation 데이터 필터링
const navigation = computed(() => {
  const navs = origin.value
  const filteredNavs = navs.filter((nav) => !isNotNav.includes(nav.name))
  return filteredNavs
})

const userInfo = computed(() => store.getters['user/userInfo']) // userInfo 가져오기

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: './assets/coka.png'
}

const userNavigation = [
  { name: 'Your Profile', href: '###' },
  { name: 'Settings', href: '##' },
  { name: 'Sign out', href: '#####' }
]

const changeNavigation = (name) => {
  store.dispatch('header/setNavigation', name)
}

const currentNavigationName = computed(() => {
  const navs = origin.value
  const currentNav = navs.find((nav) => nav.current)
  return currentNav ? currentNav.name : ''
})

const auth = computed(() => store.getters['auth/isAuthenticated'])
const token = computed(() => store.getters['auth/getToken'])

console.log("유저 정보 " , auth.value)

const handleSignupClick = () => {
  changeNavigation('회원가입')
  router.push('/signup')
}

const handleLoginClick = () => {
  changeNavigation('로그인')
  router.push('/login')
}
</script>

<template>
  <div class="min-h-full">
    <Disclosure as="nav" class="bg-[#171717] border-b border-[#444444]" v-slot="{ open }">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div class="flex h-16 items-center justify-between">
          <div class="flex items-center">
            <div class="flex-shrink-0 bg-[#444444] rounded-full">
              <img class="h-12 w-12" src="./assets/coka.png" alt="Your Company" />
            </div>
            <div class="hidden md:block">
              <div class="ml-10 flex items-baseline space-x-4">
                <router-link
                  v-for="item in navigation"
                  :key="item.name"
                  :to="item.href"
                  :class="[
                    item.current
                      ? 'bg-gray-700 text-white'
                      : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'rounded-md px-3 py-2 text-sm font-medium'
                  ]"
                  :aria-current="item.current ? 'page' : undefined"
                  @click="changeNavigation(item.name)"
                >
                  {{ item.name }}
                </router-link>
              </div>
            </div>
          </div>
          <div class="hidden md:block">
            <div class="ml-4 flex items-center md:ml-6">
              <button
                v-if="auth"
                type="button"
                class="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="absolute -inset-1.5"></span>
                <span class="sr-only">View notifications</span>
                <BellIcon class="h-6 w-6" aria-hidden="true" />
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3">
                <div v-if="auth">
                  <MenuButton
                    class="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    @click="handleSignupClick()"
                  >
                    <span class="absolute -inset-1.5"></span>
                    <span class="sr-only">Open user menu</span>
                    <img class="h-8 w-8 rounded-full" :src="user.imageUrl" alt="" />
                  </MenuButton>
                </div>
                <div v-if="!auth" className="flex py-6 gap-4">
                  <a
                    @click="handleSignupClick()"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:cursor-pointer"
                  >
                    Sign up
                  </a>
                  
                  <a
                    @click="handleLoginClick()"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:cursor-pointer"
                  >
                    Log in
                  </a>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <router-link
                        :to="item.href"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block px-4 py-2 text-sm text-gray-700'
                        ]"
                      >
                        {{ item.name }}
                      </router-link>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>
          <div class="-mr-2 flex md:hidden">
            <!-- Mobile menu button -->
            <DisclosureButton
              class="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="absolute -inset-0.5" />
              <span class="sr-only">Open main menu</span>
              <Bars3Icon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
              <XMarkIcon v-else class="block h-6 w-6" aria-hidden="true" />
            </DisclosureButton>
          </div>
        </div>
      </div>

      <DisclosurePanel class="md:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <router-link
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[
              item.current
                ? 'bg-gray-900 text-white'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white',
              'block rounded-md px-3 py-2 text-base font-medium'
            ]"
            :aria-current="item.current ? 'page' : undefined"
            @click="handleNavigationClick(item)"
            >{{ item.name }}</router-link
          >
        </div>
        <div class="border-t border-gray-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img class="h-10 w-10 rounded-full" :src="user.imageUrl" alt="" />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-white">{{ user.name }}</div>
              <div class="text-sm font-medium text-gray-400">{{ user.email }}</div>
            </div>
            <button
              v-if="auth"
              type="button"
              class="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="absolute -inset-1.5"></span>
              <span class="sr-only">View notifications</span>

              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <router-link
              v-for="item in userNavigation"
              :key="item.name"
              :to="item.href"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
              >{{ item.name }}</router-link
            >
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <header class="bg-[#171717] shadow-sm border-b border-[#444444]">
      <div class="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <h1 class="text-lg font-semibold leading-6 text-white">{{ currentNavigationName }}</h1>
      </div>
    </header>
    <main class="bg-[#171717] border-b border-[#444444]">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <slot></slot>
      </div>
    </main>
    <footer class="bg-[#171717]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" class="sr-only">Footer</h2>
      <div class="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8 lg:py-32">
        <div class="xl:grid xl:grid-cols-3 xl:gap-8">
          <img
            class="h-7 rounded-full bg-[#444444] rounde"
            src="./assets/coka.png"
            alt="Company name"
          />
          <!-- <div class="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold leading-6 text-white">Solutions</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in navigation.solutions" :key="item.name">
                    <a :href="item.href" class="text-sm leading-6 text-gray-300 hover:text-white">{{
                      item.name
                    }}</a>
                  </li>
                </ul>
              </div>
              <div class="mt-10 md:mt-0">
                <h3 class="text-sm font-semibold leading-6 text-white">Support</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in navigation.support" :key="item.name">
                    <a :href="item.href" class="text-sm leading-6 text-gray-300 hover:text-white">{{
                      item.name
                    }}</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 class="text-sm font-semibold leading-6 text-white">Company</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in navigation.company" :key="item.name">
                    <a :href="item.href" class="text-sm leading-6 text-gray-300 hover:text-white">{{
                      item.name
                    }}</a>
                  </li>
                </ul>
              </div>
              <div class="mt-10 md:mt-0">
                <h3 class="text-sm font-semibold leading-6 text-white">Legal</h3>
                <ul role="list" class="mt-6 space-y-4">
                  <li v-for="item in navigation.legal" :key="item.name">
                    <a :href="item.href" class="text-sm leading-6 text-gray-300 hover:text-white">{{
                      item.name
                    }}</a>
                  </li>
                </ul>
              </div>
            </div>
          </div> -->
        </div>
      </div>
    </footer>
  </div>
</template>
