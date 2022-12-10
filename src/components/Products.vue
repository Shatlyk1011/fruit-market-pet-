<template>
  <div class="container grid gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" >
    <Product v-for="product in products" :key="product.id" :product="product" />
  </div>
</template>

<script>
import Product from '@/components/Product.vue'

  export default {
    name: 'Products',
    components: {Product},
    props: ['products']
  }
</script>

<style lang="scss" scoped>

</style>