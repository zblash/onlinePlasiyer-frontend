<template>

  <div class="container">

    <!-- Outer Row -->
    <div class="row justify-content-center">

      <div class="col-xl-10 col-lg-12 col-md-9">

        <div class="card o-hidden border-0 shadow-lg my-5">
          <div class="card-body p-0">
            <!-- Nested Row within Card Body -->
            <div class="row">
              <div class="col-lg-6 d-none d-lg-block bg-login-image"></div>
              <div class="col-lg-6">
                <div class="p-5">
                  <div class="text-center">
                    <h1 class="h4 text-gray-900 mb-4">Hosgeldiniz!</h1>
                  </div>
                  <form class="user" @submit.prevent="formSubmit">
                    <div class="form-group">
                      <input type="text" v-model="username" class="form-control form-control-user" id="exampleInputEmail" placeholder="Kullanici adi...">
                    </div>
                    <div class="form-group">
                      <input type="text" v-model="name" class="form-control form-control-user" id="exampleInputEmail" placeholder="Isim soyisim...">
                    </div>
                    <div class="form-group">
                      <input type="text" v-model="email" class="form-control form-control-user" id="exampleInputEmail" placeholder="Email adresi...">
                    </div>
                    <div class="form-group">
                      <input type="text" v-model="taxNumber" class="form-control form-control-user" id="exampleInputEmail" placeholder="Vergi No...">
                    </div>
                    <div class="form-group">
                     <select class="form-control form-control" @change="onChangeCity($event)"  v-model="city">
                       <option selected disabled>Sehir Secin</option>
                       <option v-for="city in cities" :value="city.city">{{city.city}}</option>
                     </select>
                    </div>
                    <div class="form-group">
                      <select class="form-control form-control" v-model="state">
                        <option selected disabled>Ilce Secin</option>
                        <option v-for="state in states" :value="state">{{state}}</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <input type="text" v-model="details" class="form-control form-control-user" id="exampleInputEmail" placeholder="Adres Detayi...">
                    </div>
                    <div class="form-group">
                      <input type="password" v-model="password" class="form-control" id="exampleInputPassword" placeholder="Password">
                    </div>

                    <button type="submit" class="btn btn-primary btn-user btn-block">
                      Login
                    </button>
                  </form>

                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
    import { Role } from '../helpers/Role'
    import {APIService} from '../services/APIService';
    import cities from '../helpers/cities';

    const apiService = new APIService();
    export default {
        name: "RegisterPage",
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
                states:[]
            }
        },
        created() {
            this.roleType = this.$route.params.type === "merchant" ? Role.Merchant : Role.Customer;
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

</style>
