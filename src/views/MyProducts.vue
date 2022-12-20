<template>
  <div class="px-4 relative">
    <div class="mb-4 md:mb-6 flex flex-col gap-2">
      <h2 class=" text-2xl sm:text-3xl md:text-4xl font-medium serif">Мои товары</h2>
      <router-link :to="{name: 'Home'}" class="text-sm md:text-base font-serif font-bold text-orange-400 border-b border-orange-400 self-start hover:border-b-transparent duration-300">Перейти на рынок</router-link>
    </div>
    <transition-group v-if="products" tag="div" @before-enter="beforeEnter" @enter="enter" class="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" >
      <Product v-for="(product, index) in products" :key="product.id" :product="product" :data-index="index"/>
    </transition-group>
<!--     <div v-else-if="!products" class="flex flex-col w-full h-full">
      <div class="mb-2 text-sm font-semibold">
        Вы еще ничего не продаете...
      </div>
      <div class="flex gap-4">
        <div><router-link :to="{name: 'Home'}" class="btn text-xs py-1">Посмотреть все товары</router-link></div>
        <div><router-link :to="{name: 'AddProduct'}" class="btn text-xs py-1">Добавить фрукт</router-link></div>
      </div>
    </div> -->
    <Spinner v-else/>

    <div v-if="error" class="error">{{ error }}</div>
  </div>  
</template>

<script>
import Product from '@/components/Product.vue';
import getCollection from '@/composables/getCollection';
import getUser from '@/composables/getUser';
import Spinner from '@/components/Spinner.vue'
import gsap from 'gsap'


  export default {
    name: 'MyProducts',
    components: {Product, Spinner},

    setup() {
      const { user } = getUser()
      const { error, products } = getCollection('products', ['userUid', '==', user.value.uid])
      
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


      return { error, products, user, beforeEnter, enter }
    }
  }
</script>