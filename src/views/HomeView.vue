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
import {ref, computed} from 'vue'

export default {
  name: 'HomeView',
  components: {
    Products, Spinner
  },

  setup() {
    const {error, products, getColl } = getCollection('products')
    // console.log(getColl)
    const filteredAuto = getColl.then((res) => {
      res.filter(product => {
        if(product.category == 'phone') {
          console.log(product)
          return
        } else 
        // console.log(product)
        return
        
      })
      // console.log(filteredAuto)
    })

    return {error, products, filteredAuto}
  }
}
</script>
