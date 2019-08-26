<template>
  <div>
    <sidebar/>
    <div class="container">
      <div class="bag">
        <h5><strong>Kategori Ekle</strong>
          <img src="../../static/img/checklist.png" width="45px" height="45px" >
        </h5>
      </div>
      <div class="form_box">
              <form @submit.prevent="addCategory">
                <br>
                <div class="form-group">
                  <br> <br>
                  <label for="catName">Kategori Ismi</label>
                  <input type="text" class="form-control" v-model="categoryName" id="catName" placeholder="Kategori ismi">
                </div>
                <div class="form-group">
                  <label for="isSub">Alt Kategori mi?</label>
                  <input
                    type="checkbox"
                    v-model="isSub"
                    id="isSub"
                  >

                </div>
                <div class="form-group" v-show="isSubCat">
                  <label for="mainCat">Ust Kategorisini Secin</label>
                    <select id="mainCat" class="form-control" v-model="categoryId">
                      <option v-for="item in mainCategories" :value="item.id">{{item.name}}</option>
                    </select>
                </div>
                <div class="tool">
                  <label for="catImg">Kategori Resmi</label>
                  <input class="fileSelect" id="catImg" type="file" @change="onFileChanged">
                </div>
                <div class="tol">
                  <button type="submit" class="btn btn-dark ds">Ekle</button>
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
    name: 'CreateCategory',
    components: {Sidebar},
    data () {
      return {
        isSub: false,
        mainCategories: null,
        categoryName: null,
        categoryId: 0,
        image: null
      };
    },
    mounted() {
      apiService.getCategories()
        .then(response => {
          this.mainCategories = response.data;
        });
    },
    computed: {
      isSubCat: function () {
       return this.isSub;
      }
    },
    methods: {
      addCategory() {
        let sub = this.isSub ? 1 : 0;
        let data = {
          parentId: this.categoryId,
          name: this.categoryName,
          subCategory: sub
        };
        apiService.addCategory(data,this.image)
          .then(response => {
            this.$router.push({ name: 'GetCategories'});
          })
      },
      onFileChanged (event) {
        this.image = event.target.files[0]
      }
    }
  }
</script>

<style scoped>
  @import '../assets/sepet.css';
  @import '../assets/form.css';

</style>
