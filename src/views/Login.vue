<template>
   <v-app id="inspire">
      <v-content>
         <v-container fluid fill-height>
            <v-layout align-center justify-center>
               <v-flex xs12 sm8 md4>
                  <v-card class="elevation-12">
                    <v-alert type="error" v-show="loginIsFailed">
                        Email ou mot de passe invalide
                    </v-alert>
                        <v-row
                            align="center"
                            justify="center"
                            >
                          <v-badge
                            bordered
                            color="error"
                            icon="mdi-lock"
                            overlap
                        >
                            <v-btn
                            class="white--text"
                            color="info"
                            depressed
                            >
                            Connexion réquise pour continuer
                            </v-btn>
                        </v-badge>
                        </v-row>
                     <v-card-text>
                         <v-form id="signinForm">
<!--                           login form-->
                          <v-text-field
                              prepend-icon="mdi-account"
                              name="username"
                              v-model="loginForm.username"
                              label="Username"
                              type="text" required="true"
                          />
                          <v-text-field
                              id="password"
                              prepend-icon="mdi-lock"
                              name="password"
                              v-model="loginForm.password"
                              label="Password"
                              type="password" required="true"
                          />
                        </v-form>
                     </v-card-text>
                     <v-card-actions>
                         <div class="mr-auto ml-auto"><v-btn color="primary"  @click.prevent="login('','')">Se Connecter</v-btn></div>
                        
                     </v-card-actions>
                  </v-card>
               </v-flex>
            </v-layout>
         </v-container>
      </v-content>
   </v-app>
</template>

<script>
import {mapMutations} from "vuex";

export default {
   name: 'Login',
   props: {
      source: String,
   },

   data: function() {
      return {
         showLoginForm: true,
         showLoginBtn: true,
         showRegisterForm: false,
         showRegisterBtn: false,
         loginForm: {
             username: "",
             password: ""
         },
          loginIsFailed: false
      };
   },

   methods: {

       ...mapMutations([
           'setUserInfo'
       ]),

      toggleForms(form) {
         if ((form === "login" && !this.showLoginForm) || (form === "register" && !this.showRegisterForm)) {
            this.showLoginForm = !this.showLoginForm;
            this.showLoginBtn = !this.showLoginBtn;
            this.showRegisterForm = !this.showRegisterForm;
            this.showRegisterBtn = !this.showRegisterBtn; 
         }
      },
      handleUser(email) {

        this.$http.get(`http://localhost:8080/users/getByEmail/${email}`,{
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
            // 'Authorization': `Bearer ${usertoken}`,
            }
        })
        .then(response => {
            let appuser = response.body
            this.$store.state.userEntity = appuser;
            this.$store.commit('setUserEntity', appuser);
            console.log('success handling user');
        })
        .catch(error => console.log('error handling User'))
        },
      

       login(username, password) {
           var data;
           if(username ==="" || password === "") {
               data = {
                    "email":this.loginForm.username,
                    "password":this.loginForm.password,
                    "type" : "user"
                };
           }
           else {
               data = {
                    "email":username,
                    "password":password,
                    "type" : "user"
                };
           }
            if (document.getElementById("signinForm").reportValidity() === true) {
                // this.$http.post('http://ec2-18-224-141-43.us-east-2.compute.amazonaws.com/services/api/auth/signin', data)
                this.$http.post('http://localhost:8080/users/login', data)
                .then(response => {
                    let token = response.body
                this.$store.commit('setUserInfo', token);
                console.log("token set");
                this.handleUser(data.email);

                if(this.$store.state.userEntity.roles[0]){
                    
                    switch (this.$store.state.userEntity.roles[0].name) {
                        case 'ROLE_USER':
                            this.$router.push({name: "listSurveys"});
                            break;
                        case 'ROLE_TEACHER':
                            this.$router.push({name: "listSurveys"});
                            break;
                        default:
                            this.$router.push({name: "dashboard"});
                            break;
                    }
                }
                else{this.$router.push({name: "Home"});}

              }, response => {
                console.log(response);
                this.loginIsFailed = true;
              });
            }
       }
   }
};
</script>

<style scoped>
   .auth_btn{
      width: 74%;
   }
</style>

