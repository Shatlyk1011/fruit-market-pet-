<template>
  <div class="px-2">
    <form @submit.prevent="handleCreate" class="p-2 sm:p-4 md:p-8 sm:max-w-[500px] mx-auto bg-zinc-100 flex flex-col gap-4 md:gap-6 tracking-wide ">
      <h2 class="inline-block text-lg md:text-xl px-4 py-2 ring-1 shadow-md ring-zinc-300 rounded bg-zinc-200 text-black/80 mx-auto mb-3">Описание вашего товара</h2>
      <div class="flex flex-col gap-1">
        <label for="name">Название</label>
        <input v-model="title" class="placeholder:font-thin placeholder:text-sm placeholder:tracking-wide px-2 py-1 focus:outline-none caret-zinc-300 text-sm tracking-tight focus:ring-2 ring-zinc-400" type="text" id="name" placeholder="Лимоны узбекские, дыня торпеда...">
      </div>
      <div class="flex flex-col gap-1">
        <label for="description">Описание товара</label>
        <textarea v-model="description" class="placeholder:font-thin placeholder:text-sm placeholder:tracking-wide px-2 py-1 focus:outline-none caret-zinc-300 text-sm h-16 focus:ring-2 ring-zinc-400" type="text" id="description" placeholder="Краткое описание товара"></textarea>
      </div>
      <div class="flex gap-4">
        <div class="flex flex-col w-1/2 gap-1">
          <label for="category" class="text-sm sm:text-base">Категория</label>
          <select v-model="category" class="px-2 py-1 focus:outline-none w-full text-sm serif tracking-wider focus:ring-2 ring-zinc-400">
            <option value="Сухофрукты">Сухофрукты</option>
            <option value="Фрукты">Фрукты</option>
            <option value="Овощи">Овощи</option>
          </select>
        </div>
        <div class="flex flex-col gap-1">
          <label for="price" class="text-sm sm:text-base">Цена в рублях (за кг)</label>
          <input v-model="price" class="w-full px-2 py-1 focus:outline-none text-sm serif tracking-wider caret-zinc-400 focus:ring-2 ring-zinc-400" type="number" id="price">
        </div>
      </div>
      <div class="flex flex-col gap-1">
        <label >Выберите фото</label>
        <div class="flex gap-3 items-center">
        <label for="image" class="text-xs px-3 py-[5px] bg-zinc-200 ring-2 ring-zinc-300 self-start rounded hover:bg-zinc-300 hover:text-black/70 hover:shadow transition-all  cursor-pointer active:tranzinc-y-1 active:scale-95 select-none"> фото
        </label>
        <div v-if="image" class="text-xs">{{image.name}}</div>
      </div>
          <input @change="changeImage" class="text-xs hidden" id="image" type="file">
        <div v-if="imageFormatError" class="text-sm text-red-400 serif tracking-wide">{{imageFormatError}}</div>
        <div v-if="unchoosenError" class="text-sm text-red-400 serif tracking-wide">{{unchoosenError}}</div>
      </div>
      <button v-if="!isPending" class="self-start px-4 py-2">Создать товар</button>
      <button v-if="isPending" class="self-start px-4 py-2" disabled>Создать товар</button>
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