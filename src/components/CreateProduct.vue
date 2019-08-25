<template>
<div>
    <sidebar/>
  <div class="container">
    <h1 class="h3 mb-4 text-white-50">Create Product</h1>

    <div class="row">

      <div class="col-12">

        <!-- Circle Buttons -->
        <div class="card shadow mb-4 p-3">
          <div class="card-header py-3">
            <h6 class="m-0 font-weight-bold text-primary">Product</h6>
          </div>
          <div class="card-body">
            <form @submit.prevent="getProduct" v-if="!showProductForm && !showProductSpecForm">
              <div class="form-group">
                <label for="productBarcode">Product Barcode</label>
                <input type="text" class="form-control" v-model="productBarcode" id="getProductBarcode" placeholder="Enter Product Barcode">
                <button type="submit" class="btn btn-primary">Submit</button>
              </div>
            </form>
            <form @submit.prevent="addProduct" v-show="showProductForm">
              <div class="form-group">
                <label for="productName">Category</label>
                <select class="form-control" v-model="categoryId">
                  <option v-for="item in categories" :value="item.id">{{item.name}}</option>
                </select>

              </div>
              <div class="form-group">
                <label for="productName">Product Name</label>
                <input type="text" class="form-control" v-model="productName" id="productName" placeholder="Enter Product Name">
              </div>
              <div class="form-group">
                <label for="productBarcode">Product Barcode</label>
                <input type="text" class="form-control" v-model="productBarcode" id="productBarcode" placeholder="Enter Product Barcode">
              </div>
              <div class="form-group">
                <label for="productTax">Product Tax</label>
                <input type="text" class="form-control" v-model="productTax" id="productTax" placeholder="Enter Product Tax">
              </div>
              <div class="form-group">
                <label for="productTax">Product Img</label>
                <input type="file" @change="onFileChanged">
              </div>

              <button type="submit" class="btn btn-primary">Next</button>
            </form>

            <form @submit.prevent="addProductSpec" v-show="showProductSpecForm">

              <div class="form-group">
                <label for="productTotalPrice">Product Total Price</label>
                <input type="text" class="form-control" v-model="productTotalPrice" id="productTotalPrice" placeholder="Enter Product Total Price">
              </div>
              <div class="form-group">
                <label for="productUnitPrice">Product Unit Price</label>
                <input type="text" class="form-control" v-model="productUnitPrice" id="productUnitPrice" placeholder="Enter Product Unit Price">
              </div>
              <div class="form-group">
                <label for="productQuantity">Product Quantity</label>
                <input type="text" class="form-control" v-model="productQuantity" id="productQuantity" placeholder="Enter Product Quantity">
              </div>
              <div class="form-group">
                <label for="productQuantity">Product Contents</label>
                <input type="text" class="form-control" v-model="contents" id="contents" placeholder="Enter Product Quantity">
              </div>
              <div class="form-group">
                <label for="productQuantity">Product Type</label>
                <input type="text" class="form-control" v-model="unitType" id="unitType" placeholder="Enter Product Quantity">
              </div>
              <div class="form-group">
                <label for="productRecommended">Product Recomended Retail Price</label>
                <input type="text" class="form-control" v-model="productRecommended" id="productRecommended" placeholder="Enter Product Recomended Retail Price">
              </div>

              <div class="form-group">
                <label for="productRecommended">State</label>
                <multiselect
                  v-model="states"
                  :options="userStates"
                  placeholder="Secim Yapin..."
                  :multiple="true"
                />
              </div>

              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
        </div>
        </div>
      </div>
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
</style>
