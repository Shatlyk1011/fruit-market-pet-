<template>
  <div class="container">
    <form @submit.prevent="handleCreate" class="p-8 bg-slate-100 rounded flex flex-col gap-6 tracking-wide md:w-1/2 mx-auto min-w-[400px] md:min-w-[500px]">
      <h2 class=" inline-block  text-xl px-4 py-2 ring-2 ring-slate-300 rounded bg-slate-200 text-black/80 mx-auto mb-3">Описание вашего товара</h2>
      <div class="flex flex-col gap-1">
        <label for="name">Название</label>
        <input v-model="title" class="placeholder:font-thin placeholder:text-sm placeholder:tracking-wide px-2 py-1 focus:outline-none caret-slate-300 text-sm tracking-tight focus:ring-2 ring-slate-400" type="text" id="name" placeholder="Samsung galaxy S10...">
      </div>
      <div class="flex flex-col gap-1">
        <label for="description">Описание товара</label>
        <textarea v-model="description" class="placeholder:font-thin placeholder:text-sm placeholder:tracking-wide px-2 py-1 focus:outline-none caret-slate-300 text-sm h-16 focus:ring-2 ring-slate-400" type="text" id="description" placeholder="Краткое описание товара"></textarea>
      </div>
      <div class="flex gap-4">
        <div class="flex flex-col w-1/2 gap-1">
          <label for="category">Категория товара</label>
          <select v-model="category" class="px-2 py-1 focus:outline-none w-full text-sm font-sans2 tracking-wider focus:ring-2 ring-slate-400">
            <!-- <option value="none" class="" >Категория товара</option> -->
            <option value="phone">телефон</option>
            <option value="auto">автомобиль</option>
            <option value="another">другое</option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label for="price">Цена в рублях</label>
          <input v-model="price" class="px-2 py-1 focus:outline-none text-sm font-sans2 tracking-wider caret-slate-400 focus:ring-2 ring-slate-400" type="number" id="price">
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <label >Выберите фото</label>
        <div class="flex gap-3 items-center">
        <label for="image" class="text-xs px-3 py-[5px] bg-slate-200 ring-2 ring-slate-300 self-start rounded hover:bg-slate-300 hover:text-black/70 hover:shadow transition-all duration-75 cursor-pointer active:translate-y-1 active:scale-95"> фото
        </label>
        <div v-if="image" class="text-xs">{{image.name}}</div>
      </div>
          <input @change="changeImage" class="text-xs hidden" id="image" type="file">
        <div v-if="imageFormatError" class="text-sm text-red-400 font-sans2 tracking-wide">{{imageFormatError}}</div>
        <div v-if="unchoosenError" class="text-sm text-red-400 font-sans2 tracking-wide">{{unchoosenError}}</div>
      </div>
      <button v-if="!isPending" class="self-start">Создать товар</button>
      <button v-if="isPending" class="self-start" disabled>Создать товар</button>
    </form>
  </div>
</template>

<script>
import { timestamp } from '@/firebase/config';
import getUser from '@/composables/getUser'
import useCollection from '@/composables/useCollection'
import useStorage from '@/composables/useStorage'
import { ref } from 'vue';
import router from '@/router';

  export default {
    name: 'AddProduct',

    setup() {
      const { error, addDoc } = useCollection('products')
      const { url, filePath, uploadImage } = useStorage()
      const { user } = getUser()

      const title = ref('')
      const description = ref('')
      const category = ref('')
      const price = ref('')
      const image = ref(null)
      const imageFormatError = ref(null)
      const unchoosenError = ref(null)
      const isPending = ref(false)
      
      const imageTypes = ['image/png', 'image/jpeg']
      const changeImage = (e) => {
        let selected = e.target.files[0]
        if(selected && imageTypes.includes(selected.type)) {
          image.value = selected
          imageError.value = null
          console.log(e.target.files[0])
        } else {
          image.value = null
          imageFormatError.value = 'Пожалуйста, выберите изображения формата png/jpeg' 
          setTimeout(() => {
            imageFormatError.value = null
          }, 4000)
        }
      }

      const handleCreate = async () => {
        if(image.value) {
          isPending.value = true
          await uploadImage(image.value)
          const newProduct = await addDoc({
            title: title.value,
            description: description.value,
            category: category.value,
            price: price.value,
            imageUrl: url.value,
            filePath: filePath.value,
            userName: user.value.displayName,
            userUid: user.value.uid,
            createdAt: timestamp()
          })
          isPending.value = false
          if(!error.value) {
            router.push({name: 'Home'})
          }
        } else {
          console.log('choose error')
          unchoosenError.value = 'Пожалуйста, выберите фото' 
          setTimeout(() => {
            unchoosenError.value = null
          }, 3000)
        }
      }

      return {title, description, category, price, handleCreate, changeImage, imageFormatError, image, isPending, unchoosenError}
    }
    
  }
</script>

<style lang="scss" scoped>

</style>