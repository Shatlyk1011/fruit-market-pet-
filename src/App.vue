<template>
  <Navbar />
  <div class="max-w-[1200px] mx-auto">
    <router-view v-slot="{Component, route}">
      <transition name="route" mode="out-in">
        <div :key="route.name">
          <component :is="Component"/>
        </div>
      </transition>
    </router-view>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {Navbar},
}
</script>

<style>

</style>
