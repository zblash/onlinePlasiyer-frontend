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
                  <div class="alert alert-danger" role="alert" v-show="submitted && (!username || !password)">
                    Username and password are required
                  </div>
                  <form class="user" @submit.prevent="formSubmit">
                    <div class="form-group">
                      <input type="text" v-model="username" class="form-control form-control-user" id="exampleInputEmail" placeholder="Kullanici Adinizi Girin...">
                    </div>
                    <div class="form-group">
                      <input type="password" v-model="password" class="form-control" id="exampleInputPassword" placeholder="Sifrenizi Girin...">
                    </div>
                    <div class="form-group">
                      <div class="custom-control custom-checkbox small">
                        <input type="checkbox" class="custom-control-input" id="customCheck">
                        <label class="custom-control-label" for="customCheck">Beni Hatirla</label>
                      </div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-user btn-block">
                      Giris Yap
                    </button>
                    <router-link :to="{name: 'RegisterPage', params: { type: 'merchant' } }">Toptanci Olarak Kayit Ol</router-link>
                    <br>
                    <router-link :to="{name: 'RegisterPage', params: { type: 'customer' } }">Marketci Olarak Kayit Ol</router-link>
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
    export default {
        name: "LoginPage",
        data(){
          return {
            username: '',
            password: '',
            submitted: false
          }
        },
      methods: {
        formSubmit(e) {
          this.submitted = true;
          const { username, password } = this;
          if (username && password) {
            this.$store.dispatch('authentication/login', { username, password });
          }
        }
      }
    }
</script>

<style scoped>

</style>
