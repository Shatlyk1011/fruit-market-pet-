<template>
  <div class="px-2 md:px-4">
    <div v-if="product" class= "w-full p-4  md:p-6 bg-white ">
      <div  class="mx-auto flex flex-col md:flex-row gap-4 md:gap-8">
        <div class="md:w-1/2">
          <img :src="product.imageUrl" class="w-full " alt="">
        </div>
        <div class="flex flex-col justify-between gap-2 md:w-1/2">
          <div>
            <div class="text-xl md:text-2xl font-medium self-center serif mb-2 md:mb-4">{{product.title}}</div>
            <div class="text-sm trac line-clamp tracking-wider ">{{product.description}}</div>
          </div>
          <div class="flex justify-between gap-2">
            <div class="flex flex-col gap-2">
              <div class="px-2 py-0.5 md:px-3 md:py-1.5 text-xs sm:text-sm bg-main text-white/90 font-medium self-start justify-self-center serif tracking-wider rounded"><span class="font-normal">Цена за кг: </span> {{product.price}} &#8381;</div>
              <div class="text-sm">Продавец: <span class="underline font-medium serif tracking-wide text-sm">{{product.userName}}</span> </div>
            </div>
            <div v-if="userProduct" class="mt-auto flex flex-col gap-1 items-center">
              <h5 class="text-xs text-zinc-400 font-bold">Это ваш товар</h5>
              <div @click="handleDelete" v-if="!isPending" class="text-xs px-2 py-1 border border-red-400  text-red-400 hover:bg-transparent hover:text-red-600 hover:border-red-600 rounded-full cursor-pointer transition duration-200 active:scale-95 select-none self-end">Удалить товар</div>
              <div v-if="isPending" class="text-xs px-2 py-1 border border-transparent  text-zinc-400 cursor-not-allowed bg-zinc-100 rounded-full transition duration-200 active:scale-95 select-none self-end" disabled>Удалить товар</div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-zinc-50 mt-2 px-2 py-3 ">
        <CommentsForm :id="id"/> 
      </div>
    </div>
    <div v-else>
      <Spinner/>
    </div>
  </div>
  <div class="error px-6 py-6" v-if="error">{{error}}</div>
</template>

<script>
import CommentsForm from '@/components/CommentsForm.vue'
import getDocument from '@/composables/getDocument';
import getUser from '@/composables/getUser';
import useDocument from '@/composables/useDocument';
import useStorage from '@/composables/useStorage'
import getCollection from '@/composables/getCollection';
import Spinner from '@/components/Spinner.vue'
import {ref, computed} from 'vue'
import {useRouter} from 'vue-router'

  export default {
    name: 'ProductDescription',
    props: ['id'],

    components: {CommentsForm, Spinner},

    setup(props) {
      const {error, document: product} =  getDocument('products', props.id)
      const { deleteDoc } = useDocument('products', props.id)
      const {products: comments} = getCollection('comments', ['docId', '==', props.id])
      const {deleteImage} = useStorage()
      const {user} = getUser()
      const isPending = ref(null)
      
      
      
      const router = useRouter()

      const userProduct = computed(() => {
        return product.value && user.value && user.value.uid == product.value.userUid
      })

      const handleDelete = async () => {
        isPending.value = true
        await deleteImage(product.value.filePath)
        await deleteDoc()
        for(let i = 0; i < comments.value.length; i++) {
          let commId = comments.value[i].commentId
          const { deleteDoc: deleteComments } = useDocument('comments', commId)
          deleteComments()
        }
        isPending.value = false
        router.push({name: 'Home'})
      }

      return { error, product, userProduct, handleDelete, isPending }
    }
    
  }
</script>

<style lang="scss" scoped>

</style>
