<template>

      <tr>
        <td> {{ productSpec.user.name }}</td>
        <td> {{ productSpec.unitType }}</td>
        <td> {{ productSpec.totalPrice }}</td>
        <td> {{ productSpec.unitPrice }}</td>
        <td> {{ productSpec.contents }}</td>
        <td> {{ productSpec.quantity }}</td>
        <td>
          <input type="number" v-model="productQuantity" min="1" max="1000" class="product-quantity" />
          <button type="button" @click.prevent="addToCart(productSpec.id)" class="add_repository" width="100px">Sepete Ekle</button>
        </td>
      </tr>

</template>

<script>
  import {APIService} from '../services/APIService';

  const apiService = new APIService();
    export default {
        name: "ProductSpec",
      props:{
        productSpec: Object
      },
    data () {
      return {
        productQuantity:1
      };
    },
    methods: {
      addToCart (id) {
        let quantity = this.productQuantity;
        this.$store.dispatch('cart/addToCart', { id, quantity });
      }
    }
    }
</script>

<style scoped>

</style>
