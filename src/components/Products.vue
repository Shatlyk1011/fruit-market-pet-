<template>
  <div class="container">
    <h2 class=" mx-auto text-4xl font-medium mb-10">Рынок <span class="font-sans2">NouName</span></h2>
    
    <div class="grid gap-4 md:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" >
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