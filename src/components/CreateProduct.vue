<template>
<div>
    <sidebar/>
  <div class="container">
    <div class="bag">
      <h5><strong>Ürün Ekle</strong>
        <img src="../../static/img/checklist.png" width="45px" height="45px" >
      </h5>
    </div>


    <div class="form_box">
            <form @submit.prevent="getProduct" v-if="!showProductForm && !showProductSpecForm">
              <br>
              <div class="form-group">
                <br> <br>
                <label for="productBarcode" class="active">Ürün Barkodunu Girin</label>
                <input type="text" class="form-control" v-model="productBarcode" id="getProductBarcode" placeholder="Enter Product Barcode">
              </div>
                <button type="submit" class="btn btn-dark ds">Ileri</button>

            </form>
            <form @submit.prevent="addProduct" v-show="showProductForm">
              <br>
              <div class="form-group">
                <br> <br>
                <label for="productName">Ürün Kategorisini Secin</label>
                <select class="form-control" v-model="categoryId">
                  <option v-for="item in categories" :value="item.id">{{item.name}}</option>
                </select>

              </div>
              <div class="form-group">
                <label for="productName">Urun Ismi</label>
                <input type="text" class="form-control" v-model="productName" id="productName" placeholder="Enter Product Name">
              </div>
              <div class="form-group">
                <label for="productBarcode">Ürün Barkodu</label>
                <input type="text" class="form-control" v-model="productBarcode" id="productBarcode" placeholder="Enter Product Barcode">
              </div>
              <div class="form-group">
                <label for="productTax">Vergi Oranı</label>
                <input type="text" class="form-control" v-model="productTax" id="productTax" placeholder="Enter Product Tax">
              </div>
              <div class="tool">
                <label for="productTax">Ürün Resmi</label>
                <input class="fileSelect" type="file" @change="onFileChanged">
              </div>
              <div class="tol">
                <button type="submit" class="btn btn-dark ds">Ileri</button>
              </div>
            </form>

            <form @submit.prevent="addProductSpec" v-show="showProductSpecForm">
              <br>
              <div class="form-group">
                <br> <br>
                <label for="productTotalPrice">Ürün Toplam Fiyatı</label>
                <input type="text" class="form-control" v-model="productTotalPrice" id="productTotalPrice" placeholder="Enter Product Total Price">
              </div>
              <div class="form-group">
                <label for="productUnitPrice">Ürün Adet Fiyatı</label>
                <input type="text" class="form-control" v-model="productUnitPrice" id="productUnitPrice" placeholder="Enter Product Unit Price">
              </div>
              <div class="form-group">
                <label for="productQuantity">Elinizdeki Ürün Adedi</label>
                <input type="text" class="form-control" v-model="productQuantity" id="productQuantity" placeholder="Enter Product Quantity">
              </div>
              <div class="form-group">
                <label for="productQuantity">Ürün Iceriği(12)</label>
                <input type="text" class="form-control" v-model="contents" id="contents" placeholder="Enter Product Quantity">
              </div>
              <div class="form-group">
                <label for="productQuantity">Ürün Türü(KL,AD,KG)</label>
                <select class="form-control" v-model="unitType">
                  <option value="KL">KL</option>
                  <option value="AD">AD</option>
                  <option value="KG">KG</option>
                </select>
              </div>
              <div class="form-group">
                <label for="productRecommended">Tavsiye Ettiginiz Satis Fiyati</label>
                <input type="text" class="form-control" v-model="productRecommended" id="productRecommended" placeholder="Enter Product Recomended Retail Price">
              </div>

              <div class="form-group">
                <label for="productRecommended">Satis Yapacaginiz Ilceleri Secin</label>
                <multiselect
                  v-model="states"
                  :options="userStates"
                  placeholder="Secim Yapin..."
                  :multiple="true"
                />
              </div>

              <div class="tol">
                <button type="submit" class="btn btn-dark ds">ileri</button>
              </div>
            </form>
    </div>
  </div>
</div>
</template>

<script>
  import {APIService} from '../services/APIService';

  const apiService = new APIService();
  import {router} from '../router'
  import Sidebar from "./Sidebar";
export default {
  name: 'CreateProduct',
  components: {Sidebar},
  data () {
    return {
      productForm: false,
      productSpecForm: false,
      categories: null,
      categoryId: 0,
      productName: '',
      productBarcode: '',
      productTotalPrice: '',
      productUnitPrice: '',
      productQuantity: '',
      productTax: '',
      productRecommended: '',
      contents: 0,
      unitType: '',
      states: [],
      image: null
    };
  },
  mounted() {
    apiService.getCategories()
      .then(response => {
        this.categories = response.data;
      });
  },
  computed: {

    showProductForm: function () {
      return this.productForm
    },
    showProductSpecForm: function () {
      return this.productSpecForm
    },
    userStates: function () {
      console.log(this.$store.state.authentication.user.activeStates)
      return this.$store.state.authentication.user.activeStates;
    }
  },
  methods: {
    getProduct() {
      apiService.getProductByBarcode(this.productBarcode)
        .then(response => {
          if (response.data === "" || response.data === null){
            this.productForm = true;
          } else {
            this.productSpecForm = true;
          }
        })
    },
    addProduct() {
      let data = {
        categoryId: this.categoryId,
        name: this.productName,
        barcode: this.productBarcode,
        tax: this.productTax
      };
      apiService.addProduct(data,this.image)
        .then(response => {
        if (response.data !== "" || response.data !== null) {
          this.productForm = false;
          this.productSpecForm = true;
          this.$store.dispatch('alert/success', "Urun Admin Onayindan Sonra Aktif Olacaktir.");
        }
      })
    },
    addProductSpec() {
      let data = {
        barcode: this.productBarcode,
        totalPrice: this.productTotalPrice,
        unitPrice: this.productUnitPrice,
        quantity: this.productQuantity,
        contents: this.contents,
        unitType: this.unitType,
        recommendedRetailPrice: this.productRecommended,
        states: this.states
      };
      console.log(data);
      apiService.addProductSpec(data)
        .then(function (response) {
          router.push({ name: 'GetProducts', params: { id: response.data.category.id } })
      })
        .catch(function (error) {
          console.log("error "+error);
        });
    },
    onFileChanged (event) {
      this.image = event.target.files[0]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  @import '../assets/sepet.css';
  @import '../assets/form.css';

</style>
