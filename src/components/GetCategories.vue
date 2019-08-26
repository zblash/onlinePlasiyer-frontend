<template>
  <div>
  <sidebar/>
    <div class="container">
  <table class="table table-dark" >
    <thead>
    <tr class="header_table">
      <th>#</th>
      <th>Kategori Resmi</th>
      <th>Kategori Ismi</th>
      <th>Alt Kategori mi?</th>
      <th>Islemler</th>
    </tr>
    </thead>
    <tbody>
    <Category v-for="(category,index) in categories" :key="`categoryList-${index}`" :category="category" />
    </tbody>
  </table>
  </div>
  </div>
</template>

<script>
    import Category from "./Category";
    import sidebar from "./Sidebar";
    import {APIService} from '../services/APIService';

    const apiService = new APIService();
    export default {
        name: "GetCategories",
      components: {sidebar, Category},
      computed: {
        categories: function () {
          return this.$store.state.category.categories;
        }
      },
      mounted() {
        this.$store.dispatch('category/getAllCategories');

      },
      methods: {

      }

    }
</script>

<style scoped>

</style>
