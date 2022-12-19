<template>
  <div class="px-4 relative">
    <div class="mb-4 md:mb-6 flex flex-col gap-2">
      <h2 class=" text-2xl sm:text-3xl md:text-4xl font-medium serif">Мои товары</h2>
      <router-link :to="{name: 'Home'}" class="text-sm md:text-base font-serif font-bold text-orange-400 border-b border-orange-400 self-start hover:border-b-transparent duration-300">Перейти на рынок</router-link>
    </div>
    <div v-if="products" class="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" >
      <Product v-for="product in products" :key="product.id" :product="product" />
    </div>
    <Spinner v-else/>
  </div>  
</template>

<script>
import Product from '@/components/Product.vue';
import getCollection from '@/composables/getCollection';
import getUser from '@/composables/getUser';
import Spinner from '@/components/Spinner.vue'
  export default {
    name: 'MyProducts',
    components: {Product, Spinner},

    setup() {
      const { user } = getUser()
      const { error, products } = getCollection('products', ['userUid', '==', user.value.uid])


      return { error, products, user }
    }
  }
</script>

<style lang="scss" scoped>

</style>

<!--     <div class="flex flex-col w-full h-full">
      <div class="mb-2 text-sm font-semibold">
        Вы еще ничего не продаете...
      </div>
      <div class="flex gap-4">
        <div><router-link :to="{name: 'Home'}" class="btn text-xs py-1">Посмотреть все товары</router-link></div>
        <div><router-link :to="{name: 'AddProduct'}" class="btn text-xs py-1">Добавить фрукт</router-link></div>
      </div>
    </div> -->