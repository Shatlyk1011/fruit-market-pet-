<template>
  <div >
    <transition name="comments" mode="in-out">
      <transition-group tag="ul" name="list" appear>
        <li class="w-1/2 relative"  v-for="comment in formatDate" :key="comment.id" v-if="formatDate">
          <div class="text-base font-extrabold font-serif">{{comment.author}}</div>
          <div class="text-sm">{{comment.title}}</div>
          <div class="text-xs` text-zinc-500 text-xs">{{comment.createdAt}} назад</div>
          <div @click="handleDelete(comment.commentId)" class="text-xs text-red-400 hover:text-red-500 transition-all hover:border-b-red-500 cursor-pointer active:scale-95 select-none">удалить</div>
        </li>
        <div v-else>hehe</div>
      </transition-group>
    </transition>
  </div>
</template>

<script>
import getCollection from "@/composables/getCollection";
import { computed } from "vue";
import { projectFirestore } from "../firebase/config";
import getUser from '@/composables/getUser';
import { isProxy, toRaw } from 'vue';

import { formatDistance } from "date-fns";
import {ru} from 'date-fns/locale'
  export default {
    name: 'CommentsView',

    props: ['id'],

    setup(props) {
      const {products: comments} = getCollection('comments', ['docId', '==', props.id])
      const { user } = getUser()
      
      const date = new Date()
      const formatDate = computed(() => {
        if(comments.value) {
          console.log('comments', comments.value)
          return comments.value.map(comment => {
            let newFormat = Number(comment.createdAt.toDate())
            let newTime = formatDistance(newFormat, date, {locale: ru})
            return { ...comment, createdAt: newTime}
          })
        }
      })
      console.log(isProxy(formatDate) ? 'yes' : 'no')
      console.log('toraw', toRaw(formatDate.value))
      
      const handleDelete = async (id) => {
        console.log('id', id)
        await projectFirestore.collection('comments').doc(id).delete()
      }

      return {comments, handleDelete, formatDate, user}
    }
  }
</script>

<style>

  .list-enter-from {
    opacity: 0;
    transform: translateX(40px);
  }
  .list-enter-active {
    transition: all 0.3s ease-out;
  }
  .list-leave-to {
    opacity: 0;
    transform: translateX(40px);
  }
  .list-leave-active {
    transition: all 0.4s ease-out;
  }
  .list-move {
    transition: all 0.3s ease-out;
  }


  .comments-enter-from, .comments-leave-to {
    opacity: 0;
    transform: translateY(200px);
  } 
  .comments-enter-active,
  .comments-leave-active {
    transition: all 0.5s ease-out
  }
</style>