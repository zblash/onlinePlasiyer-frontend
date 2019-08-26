<template>
  <div>
    <sidebar/>
    <div class="container">
      <table class="table table-dark" >
        <thead>
        <tr class="header_table">
          <th>#</th>
          <th>Kullanici Adi</th>
          <th>Isim</th>
          <th>E-mail</th>
          <th>Vergi No.</th>
          <th>Onayli mi?.</th>
          <th>Rol</th>
          <th>Islemler</th>
        </tr>
        </thead>
        <tbody>
        <tr class="dene" v-for="(user,index) in users" :key="`userList-${index}`">
          <td>{{ user.id }}</td>
          <td>{{ user.userName }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.taxNumber }}</td>
          <td>
            <span v-if="user.status">Evet</span>
            <span v-else>Hayir</span>
          </td>
          <td>{{ user.role.name }}</td>
          <td>{{ user.id }}</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
  import {APIService} from '../services/APIService';
  import sidebar from "./Sidebar";

  const apiService = new APIService();
    export default {
        name: "Users",
      components: {sidebar},
      data() {
        return {
          users: null
        }
      },
      mounted() {
        apiService.getAllUsers()
          .then(response => {
            this.users = response.data;
          })
      }
    }
</script>

<style scoped>

</style>
