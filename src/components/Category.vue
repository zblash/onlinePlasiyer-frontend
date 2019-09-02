<template>
  <tr class="dene">
    <td> {{ category.id }}</td>
    <td> <img v-bind:src="photoUrl" width="40px" height="40px" class="img-thumbnail"></td>
    <td> {{ category.name }}</td>
    <td>
      <span v-if="category.subCategory">Evet</span>
      <span v-else>Hayir</span>
    </td>
    <td> <router-link class="btn btn-blue" :to="{name: 'UpdateCategory', params: { id: category.id } }">Duzenle</router-link></td>
    <td> <button class="btn btn-danger" @click.prevent="deleteCategory(category.id)">Sil</button></td>
  </tr>
</template>

<script>
  import {APIService} from '../services/APIService';

  const apiService = new APIService();
    export default {
        name: "Category",
      props:{
        category: Object
      },
      data() {
        return {
          photoUrl: null
        }
      },
      mounted() {
        this.photoUrl = `${apiService.getURL()}/photos/${this.category.photoUrl}`;
      },
      methods:{
        deleteCategory(id){
          this.$store.dispatch('category/deleteCategory',id);
        }
      }
    }
</script>

<style scoped>

</style>
