<template>
  <div>
  <div v-if="alert.message" :class="`alert ${alert.type}`">{{alert.message}}</div>
  <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    computed: {
      alert () {
        return this.$store.state.alert
      }
    },
    watch:{
      $route (to, from){
        this.$store.dispatch('alert/clear');
      }
    }
  }
</script>

<style>
  @import './assets/style.css';
</style>
