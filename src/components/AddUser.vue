<template>
  <div>
    <sidebar/>
    <div class="container">
      <div class="bag">
        <h5><strong>Kullanici Ekle</strong>
          <img src="../../static/img/checklist.png" width="45px" height="45px" >
        </h5>
      </div>
      <div class="form_box">
  <form class="user" @submit.prevent="formSubmit">
    <div class="form-group">
      <br><br>
      <label for="catName">Kullanici Adi</label>
      <input type="text" v-model="username" class="form-control form-control-user" id="exampleInputEmail" placeholder="Kullanici adi...">
    </div>
    <div class="form-group">
      <label for="catName">Kullanici Ismi</label>
      <input type="text" v-model="name" class="form-control form-control-user" id="exampleInputEmail" placeholder="Isim soyisim...">
    </div>
    <div class="form-group">
      <label for="catName">Kullanici Email Adresi</label>
      <input type="text" v-model="email" class="form-control form-control-user" id="exampleInputEmail" placeholder="Email adresi...">
    </div>
    <div class="form-group">
      <label for="catName">Kullanici Vergi No</label>
      <input type="text" v-model="taxNumber" class="form-control form-control-user" id="exampleInputEmail" placeholder="Vergi No...">
    </div>
    <div class="form-group">
      <label for="catName">Sehir Secin</label>
      <select class="form-control form-control" @change="onChangeCity($event)"  v-model="city">
        <option selected disabled>Sehir Secin</option>
        <option v-for="city in cities" :value="city.city">{{city.city}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="catName">Ilce Secin</label>
      <select class="form-control form-control" v-model="state">
        <option selected disabled>Ilce Secin</option>
        <option v-for="state in states" :value="state">{{state}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="catName">Adres Detayi</label>
      <input type="text" v-model="details" class="form-control form-control-user" id="exampleInputEmail" placeholder="Adres Detayi...">
    </div>
    <div class="form-group">
      <label for="catName">Kullanici Sifresi</label>
      <input type="password" v-model="password" class="form-control" id="exampleInputPassword" placeholder="Password">
    </div>
    <div class="form-group">
      <label for="catName">Kullanici Rol</label>
      <select v-model="roleType" class="form-control">
        <option v-for="role in roleTypes" :value="role">{{ role }}</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary btn-user btn-block">
      Ekle
    </button>
  </form>

  </div>
  </div>
  </div>
</template>

<script>
    import { Role } from '../helpers/Role'
    import {APIService} from '../services/APIService';
    import cities from '../helpers/cities';
    import Sidebar from "./Sidebar";

    const apiService = new APIService();
    export default {
        name: "AddUser",
        components: {Sidebar},
        data(){
            return {
                username: '',
                name: '',
                email: '',
                taxNumber: '',
                city: '',
                state: '',
                details: '',
                roleType: '',
                password: '',
                cities:[],
                states:[],
                roleTypes: [Role.Customer,Role.Merchant,Role.Admin]
            }
        },
        created() {
            this.cities = cities;
        },
        methods: {
            formSubmit(e) {
                let data = {
                    userName: this.username,
                    name: this.name,
                    email: this.email,
                    taxNumber: this.taxNumber,
                    city: this.city,
                    state: this.state,
                    details: this.details,
                    roleType: this.roleType,
                    password: this.password
                };
                apiService.register(data)
                    .then(
                        response => {
                            this.$store.dispatch('alert/success', "Kayit Basarili Onay Bekleniyor");
                        },
                        error => {

                        }
                    )
            },
            onChangeCity(event) {
                for (let i = 0; i < this.cities.length; i++){

                    if (this.cities[i].city === event.target.value){
                        this.states = this.cities[i].state;
                    }
                }
            }
        }

    }
</script>

<style scoped>
  @import '../assets/sepet.css';
  @import '../assets/form.css';

</style>
