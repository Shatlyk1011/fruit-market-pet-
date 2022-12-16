<template>
  <div class="px-4">
    <div class="mb-5 flex flex-col gap-2 items-start ">
      <h2 class="self-start text-4xl font-medium ">Рынок <span class="font-serif font-medium text-zinc-700">NouName</span></h2>
      <h3>Лучший онлайн рынок фруктов в СНГ</h3>
      <h4 class="text-sm text-orange-400 font-serif font-bold">Пожалуйста, <router-link :to="{name: 'Login'}" class="font-bold border-b border-orange-500">войдите</router-link> что бы добавить свои фрукты!</h4>
    </div>
    <div class="flex flex-col md:flex-row gap-4 items-start">
      <label for="search" class="text-sm font-semibold ">Поиск фруктов:</label>
      <input id="search" @input="computedProduct" type="text" v-model="search" class=" focus:outline-none border-b border-zinc-600 focus:border-zinc-900 mb-5 bg-tra">
    </div>
    <div class="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" >
      <Product v-for="product in computedProduct" :key="product.id" :product="product" />
      <div v-if="noSearchResults">
        <div class="leading-8">По вашему запросу ничего не найдено... <br> <span @click="handleClick" class="text-medium  border border-zinc-600 px-2 py-1 mt-1 cursor-pointer">Попрубуйте еще раз</span> </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product.vue'
import { ref, computed } from 'vue';

  export default {
    name: 'Products',
    components: {Product},
    props: ['products'],

    setup(props) {
      const search = ref('')
      const searchResult = ref(null)
      const noSearchResults = computed(() => {
        if(search.value.length === 0 || searchResult.value === true) {
          return false
        }else 
        return true
      })
      
      const computedProduct = computed(() => {
        if(search.value !== '') {
          const searchValues =  props.products.filter(product => product.title.includes(search.value))
          console.log('searchValues', searchValues)
          return searchValues.length === 0 ? searchResult.value = false : searchValues
        } else {
          return props.products
        }
      })

      const handleClick = () => {
        search.value = ''
        noSearchResults.value = false
      }

      return {search, computedProduct, noSearchResults, handleClick }
    }
}
</script>
