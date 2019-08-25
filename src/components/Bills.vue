<template>
  <div>
    <sidebar/>
    <div class="container">
      <div class="bag">
        <h5><strong>Faturalar</strong>
          <img src="../../static/img/shopping-basket.png" width="45px" height="45px" >
        </h5>
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
            <th>Siparis Tarihi</th>
            <th>Teslim Tarihi</th>
            <th>Durum</th>
            <th>Toplam Tutar.</th>
          </tr>
          </thead>
          <tbody>
          <tr class="dene" v-for="order in orders">
            <td> {{ order.sellerName }}</td>
            <td> {{ order.orderDate }}</td>
            <td> {{ order.waybillDate }}</td>
            <td> {{ order.status }}</td>
            <td> {{ order.totalPrice }}</td>
          </tr>
          </tbody>

        </table>
      </div>
    </div>
  </div>
</template>

<script>
  import sidebar from "./Sidebar";
  export default {
    name: "Bills",
    components: {sidebar},

    computed: {
      orders: function() {
        return this.$store.state.order.order;
      }
    },
    mounted() {
      this.$store.dispatch('order/getBills');
    },
    methods: {

    }
  }
</script>

<style scoped>
  @import '../assets/sepet.css';
</style>
