<template>
  <div class="error container" v-if="error">{{error}}</div>
  <div v-if="product" class="container flex flex-col md:flex-row px-6 py-6 bg-slate-300 rounded gap-10 w-2/3">
    <div>
      <img :src="product.imageUrl" class="max-w-[300px] mx-auto" alt="">
    </div>
    <div class="flex flex-col justify-between gap-6 w-full">
      <div>
        <div class="text-2xl font-medium self-center mb-2 font-sans2">{{product.title}}</div>
        <div class="text-sm trac line-clamp tracking-wider ">{{product.description}}</div>
      </div>
      <div class="flex justify-between gap-2">
        <div class="flex flex-col">
          <div class="px-3 py-1 bg-green-700 text-white/90 font-bold self-start justify-self-center font-sans2 tracking-wider rounded-xl ">{{product.price}} &#8381;</div>
          <div class="text-sm">Продавец: <span class="underline font-medium font-sans2 tracking-wide text-sm">{{product.userName}}</span> </div>
        </div>
        <div v-if="userProduct" class="mt-auto">
          <div @click="handleDelete(product.filePath)" class="text-sm px-3 py-2 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white rounded-xl cursor-pointer transition duration-200 active:scale-95 select-none self-end">Удалить</div>
        </div>
      </div>

    </div>    
  </div>
</template>

<script>
import getDocument from '@/composables/getDocument';
import getUser from '@/composables/getUser';
import useDocument from '@/composables/useDocument';
import useStorage from '@/composables/useStorage'
import {computed} from 'vue'
import {useRouter} from 'vue-router'

  export default {
    name: 'ProductDescription',
    props: ['id'],

    setup(props) {
      const {error, document: product} =  getDocument('products', props.id)
      const { deleteDoc } = useDocument('products', props.id)

      const {user} = getUser()
      const userProduct = computed(() => {
        return product.value && user.value && user.value.uid == product.value.userUid
      })

      const {deleteImage} = useStorage()

      const router = useRouter()

      const handleDelete = async (path) => {
        await deleteImage(product.value.filePath)
        await deleteDoc(path)
        router.push({name: 'Home'})
      }

      return { error, product, userProduct, handleDelete }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>