<template>
  <div class="bg-zinc-300 mb-6" >
    <nav ref="nav" class="max-w-[1200px] mx-auto p-2 sm:px-2 md:px-10 lg:p-4 lg:px-6 flex flex-col sm:flex-row items-center justify-between gap-2">
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M176,80h42.6a7.9,7.9,0,0,1,7.4,5l14,35" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path><line x1="16" y1="144" x2="176" y2="144" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><circle cx="180" cy="192" r="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><circle cx="76" cy="192" r="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><line x1="156" y1="192" x2="100" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><path d="M52,192H24a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H176V168.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path><path d="M176,120h64v64a8,8,0,0,1-8,8H204" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path>
        </svg>
        <router-link class="font-serif font-bold" :to="{name: 'Home'}">СНГ рынок</router-link>
      </div>
      <div>
        <div v-if="user" :key="user" class="flex gap-2 sm:gap-4 items-center justify-between sm:justify-end w-full text-xs sm:text-sm md:text-base">
          <router-link class="  active:scale-95 active:tranzinc-y-[2px] transition-transform hover:shadow-inner" :to="{name: 'AddProduct'}">Создать товар</router-link>
          <router-link class=" sm:text active:scale-95 active:tranzinc-y-[2px] transition-transform hover:shadow-inner" :to="{name: 'MyProducts'}">Мои фрукты</router-link>
          <button class="md:text-base" @click="unAuth">Выйти</button>
        </div>
        <div v-else class="flex gap-4 ">
          <router-link class="btn" :to="{name: 'Signup'}">Регистрация</router-link>
          <router-link class="btn" :to="{name: 'Login'}">Войти</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import useLogout from '@/composables/useLogout';
import {useRouter} from 'vue-router'
import getUser  from '@/composables/getUser'


  export default {
    name: 'Navbar',
    
    setup() {
      const router = useRouter()
      const { error, logout} = useLogout()
      const { user } = getUser()

      const unAuth = async () => {
        await logout()
        router.push({name: 'Login'})
        }


      return {error, user, unAuth}
    }
  }
</script>

<style lang="scss" scoped>

</style>