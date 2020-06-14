<template>
  <div class="container">
    <Navbar/>
    <router-view/>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: {Navbar},
}
</script>

<style>
  .card + .card {
    margin-top: 20px;
  }
</style>
