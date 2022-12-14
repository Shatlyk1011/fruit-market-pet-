<template>
  <div class="px-4">
    <h2 class=" text-2xl sm:text-3xl md:text-4xl font-medium font-sans2 mb-4 md:mb-6">Мои товары</h2>
    <div v-if="products" class="grid grid-cols-1 gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4" >
      <Product v-for="product in products" :key="product.id" :product="product" />
    </div>
    <div v-else class="flex flex-col">
      <div class="mb-2 ">
        Вы еще ничего не продаете...
      </div>
      <div class="flex gap-4">
        <div><router-link :to="{name: 'Home'}" class="btn text-xs py-1">Посмотреть все товары</router-link></div>
        <div><router-link :to="{name: 'AddProduct'}" class="btn text-xs py-1">Добавить товар</router-link></div>
      </div>
    </div>
  </div>  
</template>

<script>
import Product from '@/components/Product.vue';
import getCollection from '@/composables/getCollection';
import getUser from '@/composables/getUser';
  export default {
    name: 'MyProducts',
    components: {Product},

    setup() {
      const { user } = getUser()
      const { error, products } = getCollection('products', ['userUid', '==', user.value.uid])
      console.log(products)


      return { error, products, user }
    }
  }
</script>

<style lang="scss" scoped>

</style>