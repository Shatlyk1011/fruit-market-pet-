<template>
  <div class="text-center w-full">
    <form @submit.prevent="handleSubmit" class="inline-flex flex-col gap-4 w-full sm:w-2/3 md:w-[400px] p-6 bg-white rounded text-sm">
      <input v-model="userName" type="text" placeholder="Имя" class="px-2 py-2 placeholder:text-xs md:placeholder:text-sm tracking-wide font-medium focus:outline-none required border-b-2 border-transparent focus:valid:border-zinc-500 focus:invalid:border-red-400 caret-zinc-500" minlength="3">
      <input v-model="email" type="email" placeholder="Email" class="px-2 py-2 placeholder:text-xs md:placeholder:text-sm tracking-wide font-medium focus:outline-none required border-b-2 border-transparent focus:valid:border-zinc-500 focus:invalid:border-red-400 caret-zinc-500">
      <input v-model="password" type="password" placeholder="Пароль" class="px-2 py-2 placeholder:text-xs md:placeholder:text-sm tracking-wide font-medium focus:outline-none required border-b-2 border-transparent focus:valid:border-zinc-500 focus:invalid:border-red-400 caret-zinc-500" minlength="4"  autocomplete="on">
      <div class="error">{{error}}</div>
      <button v-if="!isPending" class="self-start">Регистрация</button>
      <button v-if="isPending"  class="self-start" disabled>Регистрация</button>
    </form>
  </div>
</template>

<script>
import useSignup from '@/composables/useSignup'
import {ref} from 'vue'
import {useRouter} from 'vue-router'
  export default {
    name: 'Signup',

    setup() {
      const userName = ref('')
      const email = ref('')
      const password = ref('')

      const router = useRouter()

      const { error, signup, isPending } = useSignup()
      const handleSubmit = async () => {
        await signup(email.value, password.value, userName.value)
        if(!error.value) {
          router.push({name: 'Home'})
        }
      }

      return {userName, email, password, handleSubmit, error, isPending}
    }
    
  }
</script>

<style lang="scss" scoped>

</style>