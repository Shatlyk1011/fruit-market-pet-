<template>
  <div class="bg-white py-4 mb-16">
    <nav class="container flex items-center justify-between gap-6">
      <div class="flex items-center gap-3">
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"></rect><path d="M176,80h42.6a7.9,7.9,0,0,1,7.4,5l14,35" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path><line x1="16" y1="144" x2="176" y2="144" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><circle cx="180" cy="192" r="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><circle cx="76" cy="192" r="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></circle><line x1="156" y1="192" x2="100" y2="192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><path d="M52,192H24a8,8,0,0,1-8-8V72a8,8,0,0,1,8-8H176V168.3" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path><path d="M176,120h64v64a8,8,0,0,1-8,8H204" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path>
        </svg>
        <router-link class="font-medium font-sans2" :to="{name: 'Home'}">NouName</router-link>
      </div>
    <div v-if="user" class="flex gap-4 items-center">
      <router-link class="px-2 py-1 rounded active:scale-95 active:translate-y-[2px] transition-transform hover:shadow-inner" :to="{name: 'AddProduct'}">Создать товар</router-link>
      <router-link class="px-2 py-1 rounded active:scale-95 active:translate-y-[2px] transition-transform hover:shadow-inner" to="MyProducts">Мои товары</router-link>
      <button @click="unAuth">Выйти</button>
    </div>
    <div v-else class="flex gap-4 ">
      <router-link class="btn" :to="{name: 'Signup'}">Регистрация</router-link>
      <router-link class="btn" :to="{name: 'Login'}">Войти</router-link>
    </div>
  </nav>
</div>
</template>

<script>
import getUser from '@/composables/getUser';
import useLogout from '@/composables/useLogout';
import {useRouter} from 'vue-router'

  export default {
    name: 'Navbar',
    
    setup() {
      const {error, logout, isPending} = useLogout()
      const {user} = getUser()

      const router = useRouter()
      const unAuth = async () => {
        await logout()
        if(!error.value) {
          router.push({name: 'Login'})
        }
      }


      return {error, user, unAuth}
    }
  }
</script>

<style lang="scss" scoped>

</style>