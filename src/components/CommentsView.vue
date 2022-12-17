<template>
  <div class="w-1/2 relative" v-for="comment in formatDate" :key="comment">
    <div>
      <div class="text-base font-extrabold font-serif">{{comment.author}}</div>
      <div class="text-sm">{{comment.title}}</div>
      <div class="text-xs` text-zinc-500 text-xs">{{comment.createdAt}} назад</div>
    </div>
    <div class="flex flex-col gap-1 items-start absolute bottom-0 right-6">
      <div class="relative">
        <svg  class="z-5" version="1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 48 48" enable-background="new 0 0 48 48">
          <path fill="#F44336" d="M34,9c-4.2,0-7.9,2.1-10,5.4C21.9,11.1,18.2,9,14,9C7.4,9,2,14.4,2,21c0,11.9,22,24,22,24s22-12,22-24 C46,14.4,40.6,9,34,9z"/>
        </svg>
        <div class="text-[9px] serif text-zinc-200 font-light absolute top-[55%] left-1/2 -tranzinc-x-1/2 -tranzinc-y-1/2 z-500 pointer-events-none select-none">{{comment.likes}}</div>
      </div>
      <div @click="handleDelete(comment.commentId)" class="text-[10px] text-red-400 hover:text-red-500 transition-all hover:border-b-red-500 cursor-pointer active:scale-95 select-none">удалить</div>
    </div>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import { computed } from "vue";
import { projectFirestore } from "../firebase/config";
import getUser from '@/composables/getUser';

import { formatDistance } from "date-fns";
import {ru} from 'date-fns/locale'
  export default {
    name: 'CommentsView',

    props: ['id',],

    setup(props) {
      const {products: comments} = getCollection('comments', ['docId', '==', props.id])
      const { user } = getUser()

      const date = new Date()
      const formatDate = computed(() => {
        if(comments.value) {
          return comments.value.map(comment => {
            let newFormat = Number(comment.createdAt.toDate())
            let newTime = formatDistance(newFormat, date, {locale: ru})

            return { ...comment, createdAt: newTime}
          })
        }
      })

      const handleDelete = async (id) => {
        await projectFirestore.collection('comments').doc(id).delete()
      }

      return {comments, handleDelete, formatDate, user}
    }
  }
</script>
