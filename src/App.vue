<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <LuffyHeader />
    <router-view/>
    <PageFooter/>
  </div>
</template>

<script>

import LuffyHeader from '@/components/LuffyHeader'
import PageFooter from '@/components/PageFooter'
export default {
  name: 'App',
  components:{
    LuffyHeader,
    PageFooter
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
