<template>
  <div>
  <sidebar/>
    <div class="container">
      <div class="category">
        <h5><strong>Kategori Adı:</strong>Kağıt Ürünleri</h5>


        <div class="dropdown_cat">
          <button class="btn btn-dark dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Kategori
          </button>
          <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
            <button class="dropdown-item" type="button">bebekbezi</button>
            <button class="dropdown-item" type="button">pecete</button>
            <button class="dropdown-item" type="button">su</button>
          </div>
        </div>

      </div>

      <Product v-for="(product,index) in products" :key="`prod-${index}`" :product="product"/>

<!--      <nav aria-label="Page navigation example"  class="page_bar">-->
<!--        <ul class="pagination justify-content-center">-->
<!--          <li class="page-item disabled">-->
<!--            <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>-->
<!--          </li>-->
<!--          <li class="page-item"><a class="page-link" href="#">1</a></li>-->
<!--          <li class="page-item"><a class="page-link" href="#">2</a></li>-->
<!--          <li class="page-item"><a class="page-link" href="#">3</a></li>-->
<!--          <li class="page-item"><a class="page-link" href="#">4</a></li>-->
<!--          <li class="page-item"><a class="page-link" href="#">5</a></li>-->
<!--          <li class="page-item"><a class="page-link" href="#">6</a></li>-->
<!--          <li class="page-item">-->
<!--            <a class="page-link" href="#">Next</a>-->
<!--          </li>-->
<!--        </ul>-->
<!--      </nav>-->
    </div>
  </div>
</template>

<script>
  import {APIService} from '../services/APIService';
  import sidebar from "./Sidebar";
  import Product from "./Product";

  const apiService = new APIService();
    export default {
      name: "GetProducts",
      components: {Product, sidebar},

      data(){
        return {
          products: null
        }
      },
      methods: {
        fetchData() {
          console.log(this.$route.params.id)
          apiService.getProductsByCategory(this.$route.params.id)
            .then(response => {
              this.products = response.data;
            });
        }
      },
      created() {
        this.fetchData();
      },
      watch: {
        $route(from, to) {
          if (to.name === 'GetProducts' && from.params.id !== to.params.id) {
            this.fetchData();
          }
        },
      },
    }
</script>

<style scoped>

</style>
