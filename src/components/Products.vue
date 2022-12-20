<template>
  <div class="px-4">
    <div class="mb-5 flex flex-col gap-2 items-start ">
      <div v-if="user">
        <p class="text-gray-500 text-base md:text-xl">Привет, <span class="font-serif">{{ user.displayName }}</span></p>
      </div>
      <h2 class="self-start text-2xl md:text-4xl font-medium "> Добро пожаловать на рынок <span class="font-serif font-medium text-zinc-700">NouName</span></h2>
      <h3>Лучший онлайн рынок фруктов в СНГ</h3>
      <h4 v-if="!user" class="text-sm text-orange-400 font-serif font-bold">Пожалуйста, <router-link :to="{name: 'Login'}" class="font-bold border-b border-orange-500">войдите</router-link> что бы добавить свои фрукты!</h4>
    </div>
    <div class="flex flex-col md:flex-row gap-4 items-start">
      <label for="search" class="text-sm font-semibold ">Поиск фруктов:</label>
      <input id="search" @input="computedProduct" type="text" v-model="search" class=" focus:outline-none border-b border-zinc-600 focus:border-zinc-900 mb-5 bg-transparent ">
    </div>
    <transition-group tag="div" @before-enter="beforeEnter" @enter="enter" class="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" >
      <Product  v-for="(product, index) in computedProduct" :key="product.id" :product="product" :data-index="index"/>
    </transition-group>
    <div class="flex flex-col gap-2" v-if="noSearchResult">
      <div class="">По вашему запросу ничего не найдено... </div>
      <div @click="handleClick" class="text-medium self-start border border-zinc-600 hover:border-zinc-900 hover:text-zinc-900 px-2 py-0.5 cursor-pointer">Попрубуйте еще раз</div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product.vue'
import { ref, computed } from 'vue';
import getUser from '@/composables/getUser'
import gsap from 'gsap'

  export default {
    name: 'Products',
    components: {Product},
    props: ['products'],

    setup(props) {
      const {user} = getUser()
      const search = ref('')
      const noSearchResult = ref(null)

      
      const computedProduct = computed(() => {
        if(search.value !== '') {
          const searchValues =  props.products.filter(product => product.title.includes(search.value))
          return searchValues.length === 0 ? noSearchResult.value = true : searchValues
        } else {
          return props.products
        }
      })

      const handleClick = () => {
        search.value = ''
        noSearchResult.value = false
      }

      const beforeEnter = (el) => {
      el.style.opacity = 0
      el.style.transform = 'translateX(-100px)'
    }

    const enter = (el, done) => {
      gsap.to(el, {
        opacity: 1,
        x: 0,
        duration: 0.6,
        onComplete: done,
        delay: el.dataset.index * .2
      })
    }

      return {search, computedProduct, noSearchResult, handleClick, user, beforeEnter, enter }
    }
}
</script>
