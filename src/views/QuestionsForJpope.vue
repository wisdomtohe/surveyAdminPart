<template>
    <v-app>
        <v-card height="100"></v-card>
        <v-container class="grey lighten-5">

            <div class="text-center">

                <v-snackbar color="red darken-2" v-model="error_snackbar" :multi-line="true">
                    Erruer survenue lors de la soummision. Veillez recommencer svp.
                    <v-btn color="white" text @click="snackbar = false">Close</v-btn>
                </v-snackbar>

                <v-snackbar color="green darken-2" timeout="5000"  v-model="success_snackbar" :multi-line="true">
                    Vos réponses ont bien été enrégistrés Merci de votre participation!
                </v-snackbar>
            </div>

            <v-stepper v-model="stepper.e1">
                <v-stepper-header>
                    <v-stepper-step :complete="stepper.e1 > 1" step="1">Génie Logiciel</v-stepper-step>

                    <v-divider/>

                    <v-stepper-step step="2">Sécurité & Réseaux</v-stepper-step>

                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card class="mb-12">
                            <v-card-title class="text-center">
                                <center><p class="text-center">Veuillez noter votre appreciation du projet sur une echelle  de 1 a 5: </p></center>
                            </v-card-title>
                            <v-form>
                                <v-row no-gutters>
                                    <v-col cols="8">
                                        <!-- <v-container>
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
          color="error"
          depressed
        >
          Lock Account
        </v-btn>
      </v-badge>

      <div class="mx-3"></div>

      <v-badge
        bordered
        bottom
        color="deep-purple accent-4"
        dot
        offset-x="10"
        offset-y="10"
      >
        <v-avatar size="40">
          <v-img src="https://cdn.vuetifyjs.com/images/lists/2.jpg"></v-img>
        </v-avatar>
      </v-badge>

      <div class="mx-3"></div>

    </v-row>
  </v-container> -->
                                        <v-card class="pa-2 text-center">
                                                    Course Survey
                                            
                                        </v-card>
                                        <v-card>
                                            
                                            <v-row>
                                                <v-col cols="3">
                                                <v-img
                                                    class="elevation-6"
                                                    :src="images.CS"
                                                    height="30"
                                                    width="30"
                                                ></v-img>
                                                </v-col>
                                                <v-col cols="9">
                                                    Application web de sondages en ligne permettant d'évaluer la qualite de l'enseignement.
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-card class="pa-2">
                                            <v-row>

                                                    <div class="text-center">
                                                        <v-rating
                                                            :id="1"
                                                            color="red"
                                                            background-color="red lighten-3"
                                                            v-model="answer.course_survey"
                                                            :hover="true"/>
                                                    </div>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters>
                                    <v-col cols="8">
                                        <v-card class="pa-2 text-center">
                                            Mayaki
                                            
                                        </v-card>
                                        <v-card>
                                            <v-row>
                                                <v-col cols="3">
                                                <v-img
                                                    class="elevation-6"
                                                    :src="images.MK"
                                                    height="30"
                                                    width="30"
                                                ></v-img>
                                                </v-col>
                                                <v-col cols="9">
                                                    Site web E-commerce dde vente et achats d'articles en ligne, style Amazon/Ebay.
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-card class="pa-2">
                                            <v-row>

                                                    <div class="text-center">
                                                        <v-rating
                                                            :id="2"
                                                            color="red"
                                                            background-color="red lighten-3"
                                                            v-model="answer.mayaki"
                                                            :hover="true"/>
                                                    </div>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters>
                                    <v-col cols="8">
                                        <v-card class="pa-2 text-center">
                                            Ahoe Gnoe
                                            
                                        </v-card>
                                        <v-card>
                                            <v-row>
                                                <v-col cols="3">
                                                <v-img
                                                    class="elevation-6"
                                                    :src="images.AH"
                                                    height="30"
                                                    width="30"
                                                ></v-img>
                                                </v-col>
                                                <v-col cols="9">
                                                    Application de publication et de location de biens immobiliers.
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-card class="pa-2">
                                            <v-row>

                                                    <div class="text-center">
                                                        <v-rating
                                                            :id="3"
                                                            color="red"
                                                            background-color="red lighten-3"
                                                            v-model="answer.ahoe_gnoe"
                                                            :hover="true"/>
                                                    </div>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters>
                                    <v-col cols="8">
                                        <v-card class="pa-2 text-center">
                                                    Piigo
                                        </v-card>
                                        <v-card>
                                            <v-row>
                                                <v-col cols="3">
                                                <v-img
                                                    class="elevation-6"
                                                    :src="images.PG"
                                                    height="30"
                                                    width="30"
                                                ></v-img>
                                                </v-col>
                                                <v-col cols="9">
                                                    Application de localisation et de réservation de taxis/motos.
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-card class="pa-2">
                                            <v-row>

                                                    <div class="text-center">
                                                        <v-rating
                                                            :id="4"
                                                            color="red"
                                                            background-color="red lighten-3"
                                                            v-model="answer.piigo"
                                                            :hover="true"/>
                                                    </div>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>

                                <v-row no-gutters>
                                    <v-col cols="8">
                                        <v-card class="pa-2 text-center">
                                                    Doctor Help
                                        </v-card>
                                        <v-card>
                                            <v-row>
                                                <v-col cols="3">
                                                <v-img
                                                    class="elevation-6"
                                                    :src="images.DH"
                                                    height="30"
                                                    width="30"
                                                ></v-img>
                                                </v-col>
                                                <v-col cols="9">
                                            Application web sécurisée de prise de rendez-vous, de gestion de dossier médical et de consultation pour les médecins.
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-card class="pa-2">
                                            <v-row>

                                                    <div class="text-center">
                                                        <v-rating
                                                            :id="5"
                                                            color="red"
                                                            background-color="red lighten-3"
                                                            v-model="answer.doctor_help"
                                                            :hover="true"/>
                                                    </div>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                
                            </v-form>
                        </v-card>

                        <v-btn rounded color="primary" @click="stepper.e1 = 2">Suivant</v-btn>

                    </v-stepper-content>

                    <!-- <v-stepper-content step="2">
                        <v-card class="mb-12" color="">
                            <v-card-title class="text-center">
                                <p class="text-center">Voulez-vous ajouter un commentaire ?</p>
                            </v-card-title>
                            <v-form>
                                <v-row v-for="question in questions" :key="question.id" no-gutters>
                                    <v-col cols="4">
                                        <v-card class="pa-2 text-center">
                                            {{ question.libelle }}
                                        </v-card>
                                        <v-card>
                                            {{ question.contenu }}
                                        </v-card>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-card class="pa-2">
                                            <v-row>
                                                <v-col cols="2"/>
                                                <v-col cols="9">
                                                    <v-textarea
                                                        height="50"
                                                        outlined
                                                        v-model="comments[question.id]"
                                                        name="input-7-4"
                                                        label="Votre commentaire"
                                                    />
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card>

                        <v-btn rounded color="primary" @click="stepper.e1 = 1">Précédent</v-btn>
                        <v-btn rounded color="success" class="ml-4" dark @click.prevent="submitSurveyAnswer">Soumettre</v-btn>
                    </v-stepper-content> -->

                    <v-stepper-content step="2">
                        <v-card class="mb-12" color="grey lighten-1">
                            <v-card-title class="text-center">
                                <p class="text-center">Donnez svp une note sur 5: </p>
                            </v-card-title>
                            <v-form>
                                <v-row no-gutters>
                                    <v-col cols="8">
                                        <v-card class="pa-2 text-center">
                                                    Détection/Prévention d'intrusions
                                            
                                        </v-card>
                                        <v-card>
                                            <v-row>
                                                <v-col cols="3">
                                                <v-img
                                                    class="elevation-6"
                                                    :src="images.DI"
                                                    height="30"
                                                    width="30"
                                                ></v-img>
                                                </v-col>
                                                <v-col cols="9">
                                            Système de détection et de prévention des intrusions sur le réseau au moyen de SNORT (open source IDPS).
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-card class="pa-2">
                                            <v-row>

                                                    <div class="text-center">
                                                        <v-rating
                                                            :id="6"
                                                            color="red"
                                                            background-color="red lighten-3"
                                                            v-model="answer.detection_intrusion"
                                                            :hover="true"/>
                                                    </div>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters>
                                    <v-col cols="8">
                                        <v-card class="pa-2 text-center">
                                                    CISCO ISE
                                            
                                        </v-card>
                                        <v-card>
                                            <v-row>
                                                <v-col cols="3">
                                                <v-img
                                                    class="elevation-6"
                                                    :src="images.CI"
                                                    height="30"
                                                    width="30"
                                                ></v-img>
                                                </v-col>
                                                <v-col cols="9">
                                            Contrôle d'accès au réseau au moyen de CISCO ISE (Identity Services Engine).
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-card class="pa-2">
                                            <v-row>

                                                    <div class="text-center">
                                                        <v-rating
                                                            :id="7"
                                                            color="red"
                                                            background-color="red lighten-3"
                                                            v-model="answer.cisco_ise"
                                                            :hover="true"/>
                                                    </div>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters>
                                    <v-col cols="8">
                                        <v-card class="pa-2 text-center">
                                                    TOIP
                                            
                                        </v-card>
                                        <v-card>
                                            <v-row>
                                                <v-col cols="3">
                                                <v-img
                                                    class="elevation-6"
                                                    :src="images.TI"
                                                    height="30"
                                                    width="30"
                                                ></v-img>
                                                </v-col>
                                                <v-col cols="9">
                                            Téléphonie sur IP avec intégration de la vidéo la vidéosurveillance, et du portier téléphonique.
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-card class="pa-2">
                                            <v-row>

                                                    <div class="text-center">
                                                        <v-rating
                                                            :id="8"
                                                            color="red"
                                                            background-color="red lighten-3"
                                                            v-model="answer.toip"
                                                            :hover="true"/>
                                                    </div>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                                <v-row no-gutters>
                                    <v-col cols="8">
                                        <v-card class="pa-2 text-center">
                                                    SIEM
                                            
                                        </v-card>
                                        <v-card>
                                            <v-row>
                                                <v-col cols="3">
                                                <v-img
                                                    class="elevation-6"
                                                    :src="images.SI"
                                                    height="30"
                                                    width="30"
                                                ></v-img>
                                                </v-col>
                                                <v-col cols="9">
                                            Security Information and Event Management.
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-card class="pa-2">
                                            <v-row>

                                                    <div class="text-center">
                                                        <v-rating
                                                            :id="9"
                                                            color="red"
                                                            background-color="red lighten-3"
                                                            v-model="answer.siem"
                                                            :hover="true"/>
                                                    </div>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>

                                <v-row no-gutters>
                                    <v-col cols="8">
                                        <v-card class="pa-2 text-center">
                                                    Tenable / Nessus
                                            
                                        </v-card>
                                        <v-card>
                                            <v-row>
                                                <v-col cols="3">
                                                <v-img
                                                    class="elevation-6"
                                                    :src="images.NS"
                                                    height="30"
                                                    width="30"
                                                ></v-img>
                                                </v-col>
                                                <v-col cols="9">
                                            Gestion de vulnérabilités informatiques avec Tenable/Nessus.
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-card class="pa-2">
                                            <v-row>

                                                    <div class="text-center">
                                                        <v-rating
                                                            :id="10"
                                                            color="red"
                                                            background-color="red lighten-3"
                                                            v-model="answer.nessus"
                                                            :hover="true"/>
                                                    </div>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card>

                        <v-btn rounded color="primary" @click="stepper.e1 = 1">Précédent</v-btn>
                        <v-btn rounded color="success" class="ml-4" dark @click.prevent="submitSurveyAnswer">Soumettre</v-btn>

                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>


        </v-container>
    </v-app>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: "QuestionsJpope",
        data: function() {
            return {
                images:{
                    AH: require('../assets/img/jpope/AH.png'),
                    CI: require('../assets/img/jpope/CI.png'),
                    CS: require('../assets/img/jpope/CS.png'),
                    DH: require('../assets/img/jpope/DH.png'),
                    DI: require('../assets/img/jpope/DI.png'),
                    MK: require('../assets/img/jpope/MK.png'),
                    NS: require('../assets/img/jpope/NS.png'),
                    PG: require('../assets/img/jpope/PG.png'),
                    SI: require('../assets/img/jpope/SI.png'),
                    TI: require('../assets/img/jpope/TI.png'),
                },
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
                stepper: {
                    e1: 1,
                },
                error_snackbar:false,
                success_snackbar:false
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
                        mayaki:this.answer.mayaki,
                        ahoeGnoe:this.answer.ahoe_gnoe,
                        piigo:this.answer.piigo,
                        doctorHelp:this.answer.doctor_help,
                        ciscoIse:this.answer.cisco_ise,
                        detectionIntrusion:this.answer.detection_intrusion,
                        toIp:this.answer.toip,
                        siem:this.answer.siem,
                        nessus:this.answer.nessus,
                        reponduA: new Date()
                    };

                this.$http.post(`http://localhost:8080/jpope/save`, data, {
                        params:{},
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        console.log(response);
                        this.$router.push('/admin/resultats')
                        
                    }, response => {
                        console.log("error", response);
                        this.error_snackbar = true;
                    });

                this.success_snackbar = true;
            }
        },
        mounted(){
            
        }
    }

</script>

<style scoped>

</style>
