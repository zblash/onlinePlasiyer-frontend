<template>
  <div class="row" style="margin-top: 50px;margin-bottom: 20px; padding-bottom:15px; border:1px solid #2f3542;">
    <div class="product_box">
      <img v-bind:src="photoUrl" width="100px" height="100px" class="img-thumbnail">

      <div class="information_box">
        <h4><strong>Ürün Ad:</strong> {{ product.name }}</h4>
        <h4><strong>Barkod:</strong> {{ product.barcode }}</h4>
        <h4><strong>KDV:</strong> % {{ product.tax }}</h4>
      </div>
    </div>

    <div class="right">
      <div class="value_table">
        <table  class="tablo" border=2 bordercolor=#e17055  border-radius=5px>
          <tr>
            <td>Fiy.Tipi</td>
            <td>	Brm	 </td>
            <td>	Koli.Fiy. </td>
            <td>Adt.	Fiy. </td>
            <td>Ks Brm Fiy.</td>
            <td>İçer.</td>
            <td>Siparis.</td>
          </tr>

          <ProductSpec v-for="(productSpec,index) in product.productSpecifies" :key="`prodSpec-${index}`" :productSpec="productSpec" />

        </table>
      </div>

    </div>
  </div>

</template>

<script>
  import {APIService} from '../services/APIService';

  const apiService = new APIService();
    import ProductSpec from "./ProductSpec";
    export default {
        name: "Product",
      components: {ProductSpec},
      props:{
          product: Object
      },
      data() {
        return {
          photoUrl: null
        }
      },
      mounted() {
        this.photoUrl = `${apiService.getURL()}/photos/product/${this.product.id}`;
      }
    }
</script>

<style scoped>
 .product-quantity{
   border-radius: 4px;
   height: 33px;
   width: 125px;
   border: 1px solid #2d3436;
 }
</style>
