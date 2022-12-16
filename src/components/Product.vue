<template>
  <div class="flex flex-col justify-between gap-4 p-4 sm:p-2 md:p-4 bg-white ">
    <div class="flex flex-col">
      <div class="text-2xl font-medium text-zinc-700 serif mb-2">{{product.title}}</div>
      <div class="max-h-72 max-w-48 overflow-hidden">
        <img class="w-full cursor-pointer" @click="showImg" :src="product.imageUrl" alt="">
      </div>
    </div>
    <div class="flex flex-col gap-2 md:gap-2">
      <div class="text-sm trac line-clamp tracking-wider line-clamp-2 sm:line-clamp-1 md:line-clamp-2"><span class="text-sm md:text-base">Описание: </span>{{product.description}}</div>
      <div class="flex justify-between items-end">
        <div class="px-2 py-0.5 md:px-3 md:py-1.5 bg-main text-white/90 self-start justify-self-center font-serif font-bold  rounded"><span class="text-sm font-normal tracking-wide">Цена за кг: </span> {{product.price}} &#8381;
        </div>
      </div>
      <div class="flex justify-between gap-4">
        <div class="text-sm ">Продавец: <span class="underline font-medium serif tracking-wide text-sm">{{product.userName}}</span> </div>
        <router-link :to="{name: 'ProductDescription', params: {id: product.id}}"  class="px-1 py-0.5 border border-zinc-500 shadow-sm md:shadow-md text-xs hover:scale-105 active:scale-100 active:tranzinc-y-0.5 duration-100 transition tracking-wider self-end ">Подробнее</router-link>
      </div>
    </div>
  </div>
  
</template>

<script>
import useDocument from '@/composables/useDocument'
  export default {
    name: 'Product',
    props: ['product'],

    setup(props) {
      const showImg = () => {
        window.open(props.product.imageUrl)
      } 
      const {error, isPending} = useDocument('products', props.product.id)

      return {showImg, error, isPending}
    }
  }
</script>