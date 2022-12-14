<template>
  <div class="px-4">
    <div class="mb-10 flex flex-col gap-4 items-start ">
      <h2 class="self-start text-4xl font-medium ">Рынок <span class="font-sans2">NouName</span></h2>
    </div>
    <div class="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" >
      <Product v-for="product in products" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product.vue'

  export default {
    name: 'Products',
    components: {Product},
    props: ['products'],
}
</script>

<style lang="scss" scoped>

</style>