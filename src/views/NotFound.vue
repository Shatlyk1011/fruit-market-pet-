<template>
  <div class="font-serif flex flex-col gap-6 items-center px-4">
    <div>
      Кажется, такоей страницы не существует...
    </div>
    <div>
      <router-link :to="{name: 'Home'}" class="text-sm md:text-base font-serif font-bold text-orange-400 border-b border-orange-400 self-start hover:border-b-transparent duration-300">Перейти на главную</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="scss" scoped>

</style>