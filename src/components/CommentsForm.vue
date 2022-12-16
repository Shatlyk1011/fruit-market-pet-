<template>
  <div class="mb-4">
    <h2 class="mb-2 text-lg font-medium text-zinc-700">Комментарии</h2>
    <input v-if="!isPending && currentUser" @keyup.enter="handleComment" v-model="title" type="text" placeholder="Нажмите Enter для отправки" class="px-1 py-2 placeholder:text-xs tracking-wide font-medium focus:outline-none required border-b-2 border-transparent focus:border-b-zinc-500 caret-zinc-700 w-1/2">
    <input v-if="isPending || !currentUser" @keyup.enter="handleComment" v-model="title" type="text" placeholder="Войдите что бы оставлять коментарии" class="px-1 py-2 placeholder:text-xs tracking-wide font-medium focus:outline-none required border-b-2 border-transparent focus:border-b-zinc-500 caret-zinc-700 w-1/2" disabled>
  </div>
  <div class="max-h-60 overflow-auto">
    <CommentsView :id="id"/>
  </div>
</template>

<script>
import { ref } from 'vue';
import { timestamp } from '@/firebase/config';
import getUser from '@/composables/getUser';
import useCollection from '@/composables/useCollection';
import { projectFirestore } from "../firebase/config";
import CommentsView from './CommentsView.vue';

  export default {
    name: 'CommentsForm',
    components: {CommentsView},

    props: ['id'],

    setup(props) {
      const title = ref('')
      const commentId = ref(null)
      const { user } = getUser()
      const { addDoc, error, isPending } = useCollection('comments')
      const currentUser = user.value

      const handleComment = async () => {
        if(user.value) {
          const newComment = {
            author: user.value.displayName,
          title: title.value,
          createdAt: timestamp(),
          docId: props.id,
          commentId: ''
          }
          await addDoc(newComment).then(doc => {
            commentId.value = doc.id
            projectFirestore.collection('comments').doc(commentId.value).update({commentId: commentId.value})
          });
          
          console.log(commentId.value)
          if(!error.value) {
            title.value = ''
          }
        } else {
          console.log('user no exist')
        }
      }

      return { title, handleComment, isPending, currentUser }
    }
  }
</script>

<style lang="scss" scoped>

</style>