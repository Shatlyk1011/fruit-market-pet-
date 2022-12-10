<template>
  <div class="container flex flex-col md:flex-row px-6 py-6 bg-slate-300 rounded gap-10 max-w-[700px]">
    <div>
      <img v-if="product.imageUrl" class="max-w-[300px] mx-auto" :src="product.imageUrl" alt="">
    </div>
    <div class="flex flex-col justify-between gap-6 w-full">
      <div>
        <div class="text-2xl font-medium self-center mb-2 font-sans2">{{product.title}}</div>
        <div class="text-sm trac line-clamp tracking-wider line-clamp-2">{{product.description}}</div>
      </div>
      <div class="flex flex-col gap-2">
        <div class="px-3 py-1 bg-green-700 text-white/90 font-bold self-start justify-self-center font-sans2 tracking-wider rounded-xl ">{{product.price}} &#8381;</div>
        <div class="text-sm">Продавец: <span class="underline font-medium font-sans2 tracking-wide text-sm">{{product.userName}}</span> </div>
      </div>
    </div>    

  </div>
</template>

<script>
import getDocument from '@/composables/getDocument';
  export default {
    name: 'ProductDescription',
    props: ['id'],

    setup(props) {
      const {error, document: product } = getDocument('products', props.id)


      return { error, product }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>