<template>
  <div>
    <Products :products="products"/>
    <!-- <Spinner /> -->
  </div>
</template>

<script>
import Products from '@/components/Products.vue';
import getCollection from '@/composables/getCollection';
import Spinner from '@/components/Spinner.vue'

export default {
  name: 'HomeView',
  components: {
    Products, Spinner
  },

  setup() {
    const {error, products} = getCollection('products')

    return {error, products}
  }
}
</script>
