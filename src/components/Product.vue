<template>
  <div class="flex flex-col justify-between gap-2 px-6 py-4 bg-slate-50 rounded min-h-[300px]">
    <div class="flex flex-col">
      <div class="text-2xl font-medium self-center font-sans2 mb-2">{{product.title}}</div>
      <div class="max-h-72 max-w-48 overflow-hidden">
        <img class="h-full w-full object-cover cursor-pointer" @click="showImg" :src="product.imageUrl" alt="">
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <div class="text-sm trac line-clamp tracking-wider line-clamp-2"><span class="font-medium">Описание: </span>{{product.description}}</div>
      <div class="flex justify-between items-end">
        <div class="px-3 py-1 bg-green-500/90 text-white/90 font-bold self-start justify-self-center font-sans2 tracking-wider rounded-xl"><span class="font-normal">Цена: </span> {{product.price}} &#8381;
        </div>
      </div>
      <div class="flex justify-between gap-4">
        <div class="text-sm">Продавец: <span class="underline font-medium font-sans2 tracking-wide text-sm">{{product.userName}}</span> </div>
        <router-link :to="{name: 'ProductDescription', params: {id: product.id}}"  class="self-start text-xs border-b border-black hover:border-transparent duration-200 transition tracking-wider">Подробнее...</router-link>
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

<style lang="scss" scoped>

</style>