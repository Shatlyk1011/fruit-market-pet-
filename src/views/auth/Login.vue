<template>
  <div class="container text-center">
    <form @submit.prevent="handleSubmit" class="inline-flex flex-col gap-4 w-2/3 md:w-[400px] p-6 bg-white rounded text-sm">
      <input v-model="email" type="email" placeholder="Email" class="px-2 py-2 placeholder:text-xs tracking-wide font-medium focus:outline-none required border-b-2 border-transparent focus:valid:border-green-200 focus:invalid:border-red-200 caret-slate-400">
      <input v-model="password" type="password" placeholder="Пароль" class="px-2 py-2 placeholder:text-xs tracking-wide font-medium focus:outline-none required border-b-2 border-transparent focus:valid:border-green-200 focus:invalid:border-red-200 caret-slate-400 " minlength="4"  autocomplete="on">
      <div class="error">{{error}}</div>
      <button v-if="!isPending" class="self-start" >Войти</button>
      <button v-if="isPending"  class="self-start" disabled>Войти</button>
    </form>
  </div>
</template>

<script>
import useLogin from '@/composables/useLogin';
import {useRouter} from 'vue-router'
import { ref } from 'vue';
  export default {
    name: 'Login',

    setup() {
      const {error, login, isPending} = useLogin();
      const email = ref('')
      const password = ref('')
      const router = useRouter()

      const handleSubmit = async () => {
        await login(email.value, password.value)
        if(!error.value) {
          router.push({name: 'Home'})
        }

      }

      return {email, password, error, login, isPending, handleSubmit}
    }
  }
</script>

<style lang="scss" scoped>

</style>