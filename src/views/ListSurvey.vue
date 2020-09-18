<template>
    <div>
        <v-card height="100"></v-card>
    <v-app>
    <v-tabs vertical>
      <v-tab>
        <v-icon left>mdi-close-octagon</v-icon>
        Sondages en attente
      </v-tab>
      <v-tab>
        <v-icon left>mdi-check-decagram</v-icon>
        Sondages deja faits
      </v-tab>

      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-container fluid>
                <v-row align="center">
                    <v-col class="d-flex" cols="12" sm="12">
                        <v-alert dense outlined type="error" width="100%">
                            <strong>Liste des sondages en attente</strong>
                        </v-alert>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-row align="center" justify="center" class="grey lighten-5">
                            <Survey v-for="survey in surveys" :key="survey.id" :survey="survey" class="survey"/>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-container fluid>
                <v-row align="center">
                    <v-col class="d-flex" cols="12" sm="12">
                        <v-alert dense outlined type="success" width="100%">
                            <strong>Liste des surveys déja passés!</strong>
                        </v-alert>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12">
                        <v-row align="center" justify="center" class="grey lighten-5">
                            <v-card class="mx-auto" max-width="400">
                                <v-list two-line>
                                <v-list-item-group
                                    v-model="selected"
                                    multiple
                                    active-class="blue--text"
                                >
                                <template v-for="(item, index) in passed_surveys">
                            <v-list-item :key="item.id">
                                <template >
                                <v-list-item-content>
                                    <v-list-item-title v-text="item.code"></v-list-item-title>
                                    <v-list-item-subtitle class="text--primary" v-text="item.libelle"></v-list-item-subtitle>
                                    <v-list-item-subtitle v-text="item.description"></v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-list-item-action-text v-text="`${item.modDateTime.slice(8,10)}-${item.modDateTime.slice(5,7)}-${item.modDateTime.slice(0,4)} à ${item.modDateTime.slice(11,16)}`"></v-list-item-action-text>
                                        <v-btn
                                            color="green darken-1"
                                            text
                                            @click="dialog = true"
                                        >
                                        <v-icon>mdi-star-circle</v-icon>
                                            </v-btn>
                                </v-list-item-action>
                                
                                </template>
                                <v-dialog
                                        v-model="dialog"
                                        max-width="290"
                                        >
                                        <v-card>
                                            <v-card-title class="headline">Use Google's location service?</v-card-title>

                                            <v-card-text>
                                            Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.
                                            </v-card-text>

                                            <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn
                                                color="green darken-1"
                                                text
                                                @click="dialog = false"
                                            >
                                                Disagree
                                            </v-btn>

                                            <v-btn
                                                color="green darken-1"
                                                text
                                                @click="dialog = false"
                                            >
                                                Agree
                                            </v-btn>
                                            </v-card-actions>
                                        </v-card>
                                        </v-dialog>
                            </v-list-item>
                                <v-divider
                                    v-if="index + 1 < passed_surveys.length"
                                    :key="index"
                                ></v-divider>
                            </template>
                            </v-list-item-group>
                            </v-list>
                            </v-card>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
          </v-card-text>
        </v-card>
                
      </v-tab-item>
    </v-tabs>
    </v-app>
  </div>
</template>

<script>
    import Survey from "../components/Survey";
    export default {
        name: "ListSurvey",
        components: {Survey},
        data: function() {
            return {
                label: "Afficher",
                selected:[0],
                surveys: [],

                passed_surveys: [],
                dialog:false
            };
        },

        methods: {
            getPassedSurveys: function () {
                this.$http.get(`http://localhost:8080/surveys/passed/${this.$cookies.get('userEntity').id}`, {
                            params:{},
                            headers: {
                                'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                                'Content-Type': 'application/json',
                            }
                        }).then(response => {

                            this.passed_surveys = response.body
                            console.log(this.passed_surveys);


                        }, response => {
                            console.log("error", response);
                            return false;
                        });
            }
        },

        mounted() {
            this.$http.get(`http://localhost:8080/surveys/pending/${this.$cookies.get('userEntity').id}`, {
                params:{},
                headers: {
                    'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                    'Content-Type': 'application/json',
                }
            }).then(response => {

                this.surveys = response.body;
                this.getPassedSurveys();

            }, response => {
                console.log("error", response);
            })
        },

        beforeCreate() {
            if (!this.$cookies.isKey("user")) {
                this.$router.push({name: "login"});
            }else {
                this.$store.commit('setUserInfo', this.$cookies.get("user"));
            }
        }
    }
</script>

<style scoped>
    .survey {
        margin-left: 30px;
        margin-bottom: 60px;
    }
</style>
