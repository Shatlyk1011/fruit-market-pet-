<template>
  <div class="flex flex-col justify-between gap-2 px-6 py-4 bg-slate-50 rounded min-h-[300px]">
    <div class="flex flex-col">
      <div class="text-2xl font-medium self-center font-sans2 mb-2">{{product.title}}</div>
      <img class=" self-center cursor-pointer rounded-sm max-w-[200px]" @click="showImg" :src="product.imageUrl" alt="">
    </div>
    <div class="flex flex-col gap-4">
      <div class="text-sm trac line-clamp tracking-wider line-clamp-2"><span class="font-medium">Описание: </span>{{product.description}}</div>
      <div class="px-3 py-1 bg-green-500 text-white/90 font-bold self-start justify-self-center font-sans2 tracking-wider rounded-xl"><span class="font-normal">Цена: </span> {{product.price}} &#8381;</div>
      <router-link :to="{name: 'ProductDescription', params: {id: product.id}}"  class="self-start text-xs border-b border-black hover:border-transparent duration-200 transition tracking-wider">Подробнее...</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Product',
    props: ['product'],

    setup(props) {
      const showImg = () => {
        window.open(props.product.imageUrl)
      } 

      return {showImg}
    }
    
  }
</script>

<style lang="scss" scoped>

</style>