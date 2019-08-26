<template>
  <div>

    <Alert :message="alert.message" :messageType="alert.type" />
  <router-view/>
  </div>
</template>

<script>
  import Alert from "./components/Alert";
  export default {
    name: 'App',
    components: {Alert},
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
