<template>
<v-app>
  <div class="text-center">

                <v-snackbar color="red darken-2" v-model="error_snackbar" :multi-line="true">
                    Erruer survenue lors de la soummision. Veillez recommencer svp.
                    <v-btn color="white" text @click="snackbar = false">Close</v-btn>
                </v-snackbar>

                <v-snackbar color="green darken-2" timeout="1000"  v-model="success_snackbar" :multi-line="true">
                    Votre réponse a bien été enrégistrée Merci de votre participation!
                </v-snackbar>
            </div>
  <v-card
    max-width="400"
    class="mx-auto"
  >
    <v-toolbar
      color="info"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>JPOPE IIT 2020</v-toolbar-title>

      <v-spacer></v-spacer>

    </v-toolbar>

    <v-list three-line>
      <template v-for="(item, index) in items">
        <v-subheader
          v-if="item.header"
          :key="item.header"
          v-text="item.header"
        ></v-subheader>

        <v-divider
          v-else-if="item.divider"
          :key="index"
          :inset="item.inset"
        ></v-divider>

        <v-list-item
          v-else
          :key="item.title"
        >
          <v-list-item-avatar>
            <v-img :src="item.avatar"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-html="item.title"></v-list-item-title>
            <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-icon>
          <v-btn @click="dialog = true, selected = item.id" text><v-icon :color="item.active ? 'deep-purple accent-4' : 'grey'">mdi-checkbox-multiple-marked-outline</v-icon></v-btn>
          
        </v-list-item-icon>
        
        </v-list-item>
        
      </template>
      
    </v-list>

  </v-card>
  <div class="text-xs-center">
            <v-dialog v-model="dialog" max-width="300">

                <v-card
                class="elevation-16 mx-auto"
                width="300"
            >
                <v-card-title class="headline">
                    <div class="text-center">Notez pour ce projet</div>
                </v-card-title>
                <v-card-text class="text-center">
                Veuillez nous communiquer votre niveau d'appréciation pour ce projet. Toutes vos réponses sont bien-sûr anonymes!

                <div class="text-center mt-12">
                    <v-rating
                    v-show="selected === 1"
                    v-model="answer.course_survey"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    hover
                    ></v-rating>
                    <v-rating
                    v-show ="selected === 2"
                    v-model="answer.mayaki"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    hover
                    ></v-rating>
                    <v-rating
                    v-show ="selected === 3"
                    v-model="answer.ahoe_gnoe"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    hover
                    ></v-rating>
                    <v-rating
                    v-show ="selected === 4"
                    v-model="answer.piigo"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    hover
                    ></v-rating>
                    <v-rating
                    v-show ="selected === 5"
                    v-model="answer.doctor_help"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    hover
                    ></v-rating>
                    <v-rating
                    v-show ="selected === 6"
                    v-model="answer.cisco_ise"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    hover
                    ></v-rating>
                    <v-rating
                    v-show ="selected === 7"
                    v-model="answer.detection_intrusion"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    hover
                    ></v-rating>
                    <v-rating
                    v-show ="selected === 8"
                    v-model="answer.toip"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    hover
                    ></v-rating>
                    <v-rating
                    v-show ="selected === 9"
                    v-model="answer.siem"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    hover
                    ></v-rating>
                    <v-rating
                    v-show ="selected === 10"
                    v-model="answer.nessus"
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    hover
                    ></v-rating>
                </div>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions class="justify-space-between">
                <v-btn @click="dialog = false" text>Annuler</v-btn>
                <v-btn
                    v-show="selected === 1"
                    color="primary"
                    text
                    @click.prevent="submitSurveyAnswer"
                >
                    Soumettre
                </v-btn>
                <v-btn
                    v-show ="selected === 2"
                    color="primary"
                    text
                    @click.prevent="submitSurveyAnswer2"
                >
                    Soumettre
                </v-btn>
                <v-btn
                    v-show ="selected === 3"
                    color="primary"
                    text
                    @click.prevent="submitSurveyAnswer3"
                >
                    Soumettre
                </v-btn>
                <v-btn
                    v-show ="selected === 4"
                    color="primary"
                    text
                    @click.prevent="submitSurveyAnswer4"
                >
                    Soumettre
                </v-btn>
                <v-btn
                    v-show ="selected === 5"
                    color="primary"
                    text
                    @click.prevent="submitSurveyAnswer5"
                >
                    Soumettre
                </v-btn>
                <v-btn
                    v-show ="selected === 6"
                    color="primary"
                    text
                    @click.prevent="submitSurveyAnswer6"
                >
                    Soumettre
                </v-btn>
                <v-btn
                    v-show ="selected === 7"
                    color="primary"
                    text
                    @click.prevent="submitSurveyAnswer7"
                >
                    Soumettre
                </v-btn>
                <v-btn
                    v-show ="selected === 8"
                    color="primary"
                    text
                    @click.prevent="submitSurveyAnswer8"
                >
                    Soumettre
                </v-btn>
                <v-btn
                    v-show ="selected === 9"
                    color="primary"
                    text
                    @click.prevent="submitSurveyAnswer9"
                >
                    Soumettre
                </v-btn>
                <v-btn
                    v-show ="selected === 10"
                    color="primary"
                    text
                    @click.prevent="submitSurveyAnswer10"
                >
                    Soumettre
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
            </div>
    </v-app>
  
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: "QuestionsJpope",
        data: function() {
            return {
                rating: 4,
                dialog:false,
                selected:0,
                response:{},
                answer:{
                    course_survey:0,
                    doctor_help:0,
                    mayaki:0,
                    ahoe_gnoe:0,
                    piigo:0,
                    cisco_ise:0,
                    detection_intrusion:0,
                    toip:0,
                    siem:0,
                    nessus:0
                },
                error_snackbar:false,
                success_snackbar :false,
                items: [
        { header: 'Aujourd\'hui' },
        {
            id:1,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Course Survey',
          subtitle: "Application web de sondages en ligne permettant d'évaluer la qualite de l'enseignement.",
        },
        { divider: true, inset: true },
        {
            id:2,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Mayaki',
          subtitle: "Site web E-commerce de vente et achats d'articles en ligne, style Amazon/Ebay.",
        },
        { divider: true, inset: true },
        {
            id:3,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Ahoe Gnoe',
          subtitle: "Application de publication et de location de biens immobiliers.",
        },
        { divider: true, inset: true },
        {
            id:4,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Piigo',
          subtitle: "Application de localisation et de réservation de taxis/motos.",
        },
        { divider: true, inset: true },
        {
            id:5,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Doctor Help',
          subtitle: "Application web sécurisée de prise de rendez-vous, de gestion de dossier médical et de consultation pour les médecins.",
        },
        { divider: true, inset: true },
        {
            id:6,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Détection/Prévention d\'intrusions',
          subtitle: "Système de détection et de prévention des intrusions sur le réseau au moyen de SNORT (open source IDPS).",
        },
        { divider: true, inset: true },
        {
            id:7,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'CISCO ISE',
          subtitle: "Contrôle d'accès au réseau au moyen de CISCO ISE (Identity Services Engine).",
        },
        { divider: true, inset: true },
        {
            id:8,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'TOIP',
          subtitle: "Téléphonie sur IP avec intégration de la vidéo la vidéosurveillance, et du portier téléphonique.",
        },
        { divider: true, inset: true },
        {
            id:9,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'SIEM',
          subtitle: "Security Information and Event Management."
        },
        { divider: true, inset: true },
        {
            id:10,
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Tenable/Nessus',
          subtitle: "Gestion de vulnérabilités informatiques avec Tenable/Nessus.",
        },
        ],
            };
        },
        mounted() {
            
        },
        beforeCreate() {

        },
        methods: {

            submitSurveyAnswer: function () {
                let data = {
                        courseSurvey:this.answer.course_survey,
                        reponduA: new Date()
                    };


                    // data.studen
                    console.log(data);
                    this.$http.post(`http://localhost:8080/jpope/save`, data, {
                        params:{},
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        console.log(response);
                        this.dialog=false;
                        
                    }, response => {
                        console.log("error", response);
                        this.error_snackbar = true;
                    });

                this.success_snackbar = true;
        },
            submitSurveyAnswer2: function () {
                let data = {
                        mayaki:this.answer.mayaki,
                        reponduA: new Date()
                    };


                    // data.studen
                    console.log(data);
                    this.$http.post(`http://localhost:8080/jpope/save`, data, {
                        params:{},
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        console.log(response);
                        this.dialog=false;
                        
                    }, response => {
                        console.log("error", response);
                        this.error_snackbar = true;
                    });

                this.success_snackbar = true;
        },
            submitSurveyAnswer3: function () {
                let data = {
                        ahoeGnoe:this.answer.ahoe_gnoe,
                        reponduA: new Date()
                    };


                    // data.studen
                    console.log(data);
                    this.$http.post(`http://localhost:8080/jpope/save`, data, {
                        params:{},
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        console.log(response);
                        this.dialog=false;
                        
                    }, response => {
                        console.log("error", response);
                        this.error_snackbar = true;
                    });

                this.success_snackbar = true;
        },
            submitSurveyAnswer4: function () {
                let data = {
                        piigo:this.answer.piigo,
                        reponduA: new Date()
                    };


                    // data.studen
                    console.log(data);
                    this.$http.post(`http://localhost:8080/jpope/save`, data, {
                        params:{},
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        console.log(response);
                        this.dialog=false;
                        this.dialog=false;
                        
                    }, response => {
                        console.log("error", response);
                        this.error_snackbar = true;
                    });

                this.success_snackbar = true;
        },
            submitSurveyAnswer5: function () {
                let data = {
                        doctorHelp:this.answer.doctor_help,
                        reponduA: new Date()
                    };


                    // data.studen
                    console.log(data);
                    this.$http.post(`http://localhost:8080/jpope/save`, data, {
                        params:{},
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        console.log(response);
                        this.dialog=false;
                        
                    }, response => {
                        console.log("error", response);
                        this.error_snackbar = true;
                    });

                this.success_snackbar = true;
        },
            submitSurveyAnswer6: function () {
                let data = {
                        ciscoIse:this.answer.cisco_ise,
                        reponduA: new Date()
                    };


                    // data.studen
                    console.log(data);
                    this.$http.post(`http://localhost:8080/jpope/save`, data, {
                        params:{},
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        console.log(response);
                        this.dialog=false;
                        
                    }, response => {
                        console.log("error", response);
                        this.error_snackbar = true;
                    });

                this.success_snackbar = true;
        },
            submitSurveyAnswer7: function () {
                let data = {
                        detectionIntrusion:this.answer.detection_intrusion,
                        reponduA: new Date()
                    };


                    // data.studen
                    console.log(data);
                    this.$http.post(`http://localhost:8080/jpope/save`, data, {
                        params:{},
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        console.log(response);
                        this.dialog=false;
                        
                    }, response => {
                        console.log("error", response);
                        this.error_snackbar = true;
                    });

                this.success_snackbar = true;
        },
            submitSurveyAnswer8: function () {
                let data = {
                        toIp:this.answer.toip,
                        reponduA: new Date()
                    };


                    // data.studen
                    console.log(data);
                    this.$http.post(`http://localhost:8080/jpope/save`, data, {
                        params:{},
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        console.log(response);
                        this.dialog=false;
                        
                    }, response => {
                        console.log("error", response);
                        this.error_snackbar = true;
                    });

                this.success_snackbar = true;
        },
            submitSurveyAnswer9: function () {
                let data = {
                        siem:this.answer.siem,
                        reponduA: new Date()
                    };


                    // data.studen
                    console.log(data);
                    this.$http.post(`http://localhost:8080/jpope/save`, data, {
                        params:{},
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        console.log(response);
                        this.dialog=false;
                        
                    }, response => {
                        console.log("error", response);
                        this.error_snackbar = true;
                    });

                this.success_snackbar = true;
        },
            submitSurveyAnswer10: function () {
                let data = {
                        nessus:this.answer.nessus,
                        reponduA: new Date()
                    };


                    // data.studen
                    console.log(data);
                    this.$http.post(`http://localhost:8080/jpope/save`, data, {
                        params:{},
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        console.log(response);
                        this.dialog=false;
                        
                    }, response => {
                        console.log("error", response);
                        this.error_snackbar = true;
                    });

                this.success_snackbar = true;
        },
        mounted(){
            
        }
    }
  }
</script>

<style scoped>

</style>
