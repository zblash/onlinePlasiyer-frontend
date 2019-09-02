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
            <button class="btn btn-primary" @click.prevent="changeStatus(true, user.id)" v-if="!user.status">Onayla</button>
            <button class="btn btn-danger" @click.prevent="changeStatus(false, user.id)" v-else>Engelle</button>
          </td>
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
      created() {
       this.fetchData();

      },
        methods: {
            fetchData(){
                console.log(this.$route.params.type)
                if(this.$route.params.type === "customers"){
                    apiService.getAllCustomers()
                        .then(response => {
                            this.users = response.data;
                        })
                }else if (this.$route.params.type === "merchants"){
                    apiService.getAllMerchants()
                        .then(response => {
                            this.users = response.data;
                        })
                }else {
                    apiService.getAllPassiveUsers()
                        .then(response => {
                            this.users = response.data;
                        })
                }
            },
            changeStatus(status,userId){
                if (!status){
                    apiService.setPassiveUser(userId)
                        .then(
                            response => {
                              this.fetchData()
                            },
                            error => {}
                        )
                }else {
                    apiService.setActiveUser(userId)
                        .then(
                            response => {
                                this.fetchData()
                            },
                            error => {}
                        )
                }
            }
        },
        watch: {
            $route(from, to) {
                if (to.name === 'Users' && from.params.type !== to.params.type) {
                    console.log(to.params.type)
                    this.fetchData();
                }
            },
        },
    }
</script>

<style scoped>

</style>
