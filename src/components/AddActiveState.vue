<template>
  <div>
    <sidebar/>
    <div class="container">
      <div class="bag">
        <h5><strong>Satis Yapilacak Ilceleri Ekle</strong>
          <img src="../../static/img/checklist.png" width="45px" height="45px" >
        </h5>
      </div>


      <div class="form_box">
        <form @submit.prevent="formSubmit">
          <br>
          <div class="form-group">
            <br><br>
            <label>Satis Yapacaginiz Illeri Secin</label>
            <select class="form-control form-control" @change="onChangeCity($event)"  v-model="city">
              <option selected disabled>Sehir Secin</option>
              <option v-for="city in cities" :value="city.city">{{city.city}}</option>
            </select>
          </div>
          <div class="form-group">
            <label>Satis Yapacaginiz Ilceleri Secin</label>
            <multiselect
              v-model="selectedStates"
              :options="states"
              placeholder="Secim Yapin..."
              :multiple="true"
            />
          </div>
          <button type="submit" class="btn btn-dark ds">Onayla</button>

        </form>
  </div>
    </div>
  </div>
</template>

<script>
    import {APIService} from '../services/APIService';
    import Sidebar from "./Sidebar";
    import cities from '../helpers/cities';
    const apiService = new APIService();
    export default {
        name: "AddActiveState",
        components: {Sidebar},
        data() {
            return {
                city: '',
                selectedStates: [],
                cities: [],
                states: []
            }

        },
        computed: {
            user: function() {
                return this.$store.state.authentication.user;
            }
        },
        created() {
            this.cities = cities;
        },
        methods: {
            formSubmit(){
                let states = this.selectedStates;
                apiService.addActiveState(states)
                    .then(
                        response => {
                            this.city='';
                            this.selectedStates=[];


                            apiService.getActiveStates()
                                .then(
                                    response => {
                                        this.user.activeStates = response.data;
                                        localStorage.setItem("user", JSON.stringify(this.user));
                                        this.$store.dispatch('alert/success', "Ilceler Eklendi.");
                                    },
                                    error => {
                                        this.$store.dispatch('alert/error', "Hata olustu.");
                                    }
                                )
                        },
                        error => {
                            this.$store.dispatch('alert/error', "Hata olustu.");
                        }
                    )
            },
            onChangeCity(event) {
                for (let i = 0; i < this.cities.length; i++) {

                    if (this.cities[i].city === event.target.value) {
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
