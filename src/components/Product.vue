<template>
  <div class="flex flex-col justify-between gap-4 p-4 sm:p-2 bg-slate-50 ">
    <div class="flex flex-col">
      <div class="text-2xl font-medium text-slate-700 font-sans2 mb-2">{{product.title}}</div>
      <div class="max-h-72 max-w-48 overflow-hidden">
        <img class="h-full w-full object-cover cursor-pointer" @click="showImg" :src="product.imageUrl" alt="">
      </div>
    </div>
    <div class="flex flex-col gap-2 md:gap-2">
      <div class="text-sm trac line-clamp tracking-wider line-clamp-2 sm:line-clamp-1 md:line-clamp-2"><span class="text-sm md:text-base">Описание: </span>{{product.description}}</div>
      <div class="flex justify-between items-end">
        <div class="px-2 py-0.5 md:px-3 md:py-1.5 bg-green-500/90 text-white/90 font-medium self-start justify-self-center font-sans2 tracking-wider rounded"><span class="font-normal">Цена: </span> {{product.price}} &#8381;
        </div>
      </div>
      <div class="flex justify-between gap-4">
        <div class="text-sm">Продавец: <span class="underline font-medium font-sans2 tracking-wide text-sm">{{product.userName}}</span> </div>
        <router-link :to="{name: 'ProductDescription', params: {id: product.id}}"  class="px-1 py-0.5 border border-slate-500 shadow-sm md:shadow-md text-xs hover:scale-105 active:scale-100 active:translate-y-0.5 duration-100 transition tracking-wider self-end ">Подробнее</router-link>
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