<template>
  <div>
  <sidebar/>
  <div class="container">
    <div class="bag">
      <h5><strong>Sepet</strong>
        <img src="../../static/img/shopping-basket.png" width="45px" height="45px" >
      </h5>
    </div>



    <!---content_bag-->
    <div class="left_section">
      <h5>Risk Durumu</h5>
      <table class="table table-dark">
        <thead>
        <tr>
          <th scope="col">Kredi Limiti</th>
          <th scope="col">Fatura Edilmemiş Tutar</th>
          <th scope="col">Şipariş Edilebilir Tutar</th>
          <th scope="col">C/H Tutar</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <th scope="row">65.9850</th>
          <td>35.000</td>
          <td>8.4300</td>
          <td>-38.000</td>
        </tr>

        </tbody>
      </table>
    </div>
    <!--day_section-->

<!--    <div class="right_section">-->
<!--      <h5>Şipariş Günleri</h5>-->
<!--      <table class="table table-dark" class="day_table" >-->
<!--        <thead>-->
<!--        <tr>-->
<!--          <th scope="col">-->
<!--            <div class="day_box">Pazartesi<input type="checkbox" class="day" name="" value="day "></div>-->
<!--            <div class="day_box">Salı <input type="checkbox" class="day" name="" value="day "> </div>-->
<!--            <div class="day_box">Çarşamba <input type="checkbox" class="day" name="" value="day "> </div>-->
<!--            <div class="day_box">Perşembe  <input type="checkbox" class="day" name="" value="day "> </div>-->
<!--            <div class="day_box">Cuma  <input type="checkbox" class="day" name="" value="day "> </div>-->
<!--            <div class="day_box">Cumatesi <input type="checkbox" class="day" name="" value="day "></div>-->
<!--            <div class="day_box">Pazar <input type="checkbox" class="day" name="" value="day "></div>-->
<!--          </th>-->
<!--        </tr>-->
<!--        </thead>-->
<!--      </table>-->
<!--    </div>-->
    <!--store-->
    <div class="store">
      <h5>Fatura</h5>

      <table class="table table-dark" >
        <thead>
        <tr class="header_table">
          <th>Toptanci</th>
          <th>	Birim	 </th>
          <th>	Koli.Fiy. </th>
          <th>Adt.	Fiy. </th>
          <th>Tv Satis Fiy.</th>
          <th>İçer.</th>
          <th>Adet.</th>
          <th>Toplam Tutar.</th>
        </tr>
        </thead>
        <tbody>
        <tr class="dene" v-for="cartItem in cartItems">
          <td> {{ cartItem.product.user.name }}</td>
          <td> {{ cartItem.product.unitType }}</td>
          <td> {{ cartItem.product.totalPrice }}</td>
          <td> {{ cartItem.product.unitPrice }}</td>
          <td> {{ cartItem.product.recommendedRetailPrice }}</td>
          <td> {{ cartItem.product.contents }}</td>
          <td> {{ cartItem.quantity }}</td>
          <td> {{ cartItem.totalPrice }} ₺</td>
        </tr>
        </tbody>
        <tfoot>
        <tr>
          <td>Sepet Adeti.</td>
          <td>{{ cart.quantity }}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>Toplam Tutar.</td>
          <td>{{ cart.totalPrice }} ₺</td>
        </tr>
        </tfoot>
      </table>
      <button @click.prevent="checkout" class="btn btn-blue-grey float-right mb-4">Sepeti Onayla</button>
    </div>
  </div>
  </div>
</template>

<script>
    import sidebar from "./Sidebar";
    export default {
      name: "Cart",
      components: {sidebar},

      computed: {
        cart: function() {
          return this.$store.state.cart.cart;
        },
        cartItems: function() {
          return this.$store.state.cart.cartItems;
        }
      },
      methods: {
        checkout() {
          this.$router.push({name:'Bills'});
        }
      }
    }
</script>

<style scoped>
  @import '../assets/sepet.css';
</style>
