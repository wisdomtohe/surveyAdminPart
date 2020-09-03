<template>
  <div>
    <v-app-bar
      app
      color="white"
      height="100"
      hide-on-scroll
    >
      <v-avatar
        class="mr-3"
        color="grey lighten-5"
        size="100"
      >
        <v-img
          contain
          max-height="70%"
          :src="require('../assets/img/courseSurvey.jpg')"
        ></v-img>
      </v-avatar>

      <v-toolbar-title class="font-weight-black headline">
        Course Survey
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-btn to="/surveys" class="my_btn">Sondages <v-icon right color="blue">mdi-calendar-multiple-check</v-icon></v-btn>
      <v-btn to="/admin/dashboard" class="my_btn" v-if="user === 'ROLE_ADMIN'">Administration <v-icon right color="blue">mdi-chart-areaspline</v-icon></v-btn>
      <v-btn @click.prevent="logout" v-if="$cookies.isKey('user')">Déconnexion <v-icon right color="blue">mdi-account-minus</v-icon></v-btn>
      <v-btn @click.prevent="logout" v-else >Connexion <v-icon right color="blue">mdi-account-key</v-icon></v-btn>
    </v-app-bar>
    
  </div>
</template>

<script>
export default {
  name: "Header",

  props: {

  },

  methods: {
    logout: function () {
      this.$store.commit('setUserInfo', null);
      this.$cookies.remove('user');
      this.$store.commit('setUserEntity', null);
      this.$cookies.remove('userEntity');
      this.$router.push({name: "login"});
      console.log("logout");
    }
  },

  data: function() {
    return {
      images: {
                logo: require('../assets/img/ipnet.png')
            },
      user:''
    };
  },
  mounted() {
    this.$emit("connected");
    this.user = this.$cookies.get('userEntity').roles[0]
  }
};
</script>

<style scoped>

</style>
