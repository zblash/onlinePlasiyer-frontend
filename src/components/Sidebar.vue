<template>
  <div>
    <nav class="navbar navbar-expand-lg   navbar-dark bg-blue">


      <a class="navbar-brand" href="deneme.html">Onlineplasiyer</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="generalOpsDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              Genel Islemler
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <router-link :to="{name: 'Bills'}" class="dropdown-item">Faturalar</router-link>
            </div>
          </li>


          <li class="nav-item">
            <a class="nav-link" href="#">İşlemler</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              Bildirimler
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" href="#">okundu</a>
              <a class="dropdown-item" href="#">Okunmadı</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" href="#">Hepsi</a>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav float-right">


          <li class="nav-item">

            <a class="nav-link" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
               aria-haspopup="true" aria-expanded="false">
              <img src="/static/img/man.png" width="20px" height="20px" alt="..." class="rounded-circle">
              {{ user.name }}
            </a>

          </li>

          <li class="nav-item">
            <router-link :to="{name: 'Cart'}" class="nav-link">Sepet( {{ basketQuantity }} )</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{path: '/'}" class="nav-link">Anasayfa</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{name: 'Cart'}" class="nav-link">Cikis Yap</router-link>
          </li>
        </ul>
      </div>
    </nav>

    <div class="container-fluid"
         style="display: flex; flex-direction: row; flex-wrap:wrap; padding-top: 30px; padding-left: 40px; ">

      <router-link v-for="(category, index) in categories" :to="{name: 'GetProducts', params: { id: category.id } }" :key="`cat-${index}`">
        <div class="card" style="width:5rem; height:130px; margin: 5px;">
          <img class="card-img-top" width="50px" height="80px" src="/static/img/napkin.png" alt="Card image cap">
          <div class="card-body">
            <p class="card-text">{{ category.name }}</p>
          </div>
        </div>
      </router-link>

    </div><!---ürünlerin container-->
  </div>
</template>

<script>
  import {APIService} from '../services/APIService';

  const apiService = new APIService();
  export default {
    name: "Sidebar",
    data() {
      return {
        categories: null
      }
    },
    computed: {
      user: function() {
        return this.$store.state.authentication.user;
      },
      basketQuantity: function() {
        return this.$store.state.cart.quantity;
      }
    },
    mounted() {
      apiService.getCategories()
        .then(response => {
          this.categories = response.data;
        });

      this.$store.dispatch('cart/getCart');
    },
  }
</script>

<style scoped>

</style>
