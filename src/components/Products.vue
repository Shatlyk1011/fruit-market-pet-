<template>
  <div class="px-4">
    <div class="mb-10 flex flex-col gap-4 items-start ">
      <h2 class="self-start text-4xl font-medium ">Рынок <span class="font-sans2">NouName</span></h2>
      <h3>Лучший онлайн рынок СНГ</h3>
    </div>
    <input @input="computedProduct" type="text" v-model="search" class="border border-gray-500 mb-6">
<!--     <div class="flex gap-3">
      <div>
        <label for="phone">phone</label>
        <input id="phone" type="checkbox" v-model="phone">
      </div>
      <div>
        <label for="auto">auto</label>
        <input id="auto" type="checkbox" v-model="auto">
      </div>
      <div>
        <label for="another">another</label>
        <input id="another" type="checkbox" v-model="another">
      </div>
    </div> -->
    <div class="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" >
      <Product v-for="product in computedProduct" :key="product.id" :product="product" />
    </div>
  </div>
</template>

<script>
import Product from '@/components/Product.vue'
import { ref, computed } from 'vue';

  export default {
    name: 'Products',
    components: {Product},
    props: ['products'],

    setup(props) {
      const search = ref('')
/*       const phone = ref(false)
      const auto = ref(false)
      const another = ref(false) */
      
      const computedProduct = computed(() => {
        if(search.value !== '') {
          try {
            return props.products.filter(product => product.title.includes(search.value))
          } catch(err) {
            console.log(err.message)
          }
        } else {
          return props.products
        }
      })

      return {search, computedProduct }
    }
}
</script>

<style lang="scss" scoped>

</style>

<!-- const computedCheckboxex = computed(() => {
  if(phone.value) {
    try{
      return props.products.filter(product => product.category == 'phone')

    } catch (err) {
      console.log(err.message)
    }
  } else {
    return props.products
  }
}) -->