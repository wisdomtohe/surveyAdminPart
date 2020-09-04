<template>
    <v-app>
        <v-card height="100"></v-card>
        <v-container class="grey lighten-5">

            <div class="text-center">
<!--                <v-btn dark color="red darken-2" @click="snackbar = true">Open Snackbar</v-btn>-->

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
                    <v-stepper-step :complete="stepper.e1 > 1" step="1">Rating</v-stepper-step>

                    <v-divider/>

                    <v-stepper-step step="2">Commentaires</v-stepper-step>

                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <v-card class="mb-12" color="grey lighten-1">
                            <v-card-title class="text-center">
                                <p class="text-center">Veuillez remplir ce formulaire: </p>
                            </v-card-title>
                            <v-form>
                                <v-row v-for="question in questions" :key="question.id" no-gutters>
                                    <v-col cols="4">
                                        <v-card class="pa-2 text-center" color="info">
                                            {{ question.libelle }}
                                        </v-card>
                                        <v-card style="height:70%">
                                            {{ question.contenu }}
                                        </v-card>
                                    </v-col>
                                    <v-col cols="8">
                                        <v-card class="pa-2">
                                            <v-row>
                                                <v-col cols="2">
                                                    <v-checkbox
                                                        v-model="checkboxes[question.id]"
                                                        @change="onResponseChanged(question.id, checkboxes[question.id])"
                                                        label="N/A"/>
                                                </v-col>
                                                <v-col cols="1"/>
                                                <v-col cols="9" class="mt-4">
<!--                                                    <v-btn color="success" class="mt-12" @click="overlay.overlay = !overlay.overlay">Show Overlay</v-btn>-->


                                                    <div class="text-center">
                                                        <v-rating
                                                            :id="`rating-${question.id}`"
                                                            :class="checkboxes[question.id]? `d-none`: ''"
                                                            color="red"
                                                            background-color="red lighten-3"
                                                            v-model="sliders[question.id]"
                                                            @input="onResponseChanged(question.id, sliders[question.id])"
                                                            :hover="true"/>
                                                    </div>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-card>

                        <v-btn rounded color="primary" @click="stepper.e1 = 2">Suivant</v-btn>

                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <v-card class="mb-12" color="">
                            <v-card-title class="text-center">
                                <p class="text-center">Voulez-vous ajouter un commentaire ?</p>
                            </v-card-title>
                            <v-form>
                                <v-row v-for="question in questions" :key="question.id" no-gutters>
                                    <v-col cols="4">
                                        <v-card class="pa-2 text-center" color="info">
                                            {{ question.libelle }}
                                        </v-card>
                                        <v-card style="height:70%">
                                            {{ question.contenu }}
                                        </v-card>
                                    </v-col>
                                    <v-col cols="8">
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
                    </v-stepper-content>

                </v-stepper-items>
            </v-stepper>


        </v-container>
    </v-app>
</template>

<script>
    import {mapMutations} from "vuex";

    export default {
        name: "SurveyQuestions",
        data: function() {
            return {
                questions: [],
                answers:{},
                sliders:{},
                checkboxes: {},
                comments: {},
                stepper: {
                    e1: 1,
                },
                error_snackbar: false,
                success_snackbar: false,

                items_response: null,

                student: 0
            };
        },
        mounted() {
            this.getAllResponses();
            this.getStudentByUser();

        },
        beforeCreate() {
            if (!this.$cookies.isKey("user")) {
                this.$router.push({name: "login"});
            }else {
                this.$store.commit('setUserInfo', this.$cookies.get("user"));
            }
        },
        methods: {
            ...mapMutations([
                'setSurveyAnswerSubmitted'
            ]),

            submitSurveyAnswer: function () {
                let data = {
                    question:{
                        id:0,
                        type:"question"
                    },
                    student:{
                        id:0,
                        type:"student"
                    },
                    survey:{
                        id:0,
                        type:"survey"
                    },
                    type:"response",
                    comments:'',
                    isNa:'',
                    rating:0,
                    modBy:0



                };

                for (let answer in this.answers) {

                    if(this.$store.state.surveyAnswerSubmitted === false) {
                        break;
                    }

                    if (this.checkboxes[answer] === false && this.answers[answer] === 0){
                        continue;
                    }

                    data.type = "response";
                    data.survey.id = parseInt(this.$route.params.id);
                    data.student.id = this.student;
                    data.question.id = parseInt(answer);
                    data.comments = this.comments[answer];
                    data.isNa = this.checkboxes[answer] ? 1 : 0;
                    data.rating = this.answers[answer];
                    data.modBy = this.$cookies.get('userEntity').id;
                    console.log(data);
                    this.$http.post(`http://localhost:8080/save/response`, data, {
                        params:{},
                        headers: {
                            'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        console.log(response);
                        this.$router.push('/surveys')
                        
                    }, response => {
                        console.log("error", response);
                        this.$store.commit('setSurveyAnswerSubmitted', false);
                        this.error_snackbar = true;
                    });
                }
                this.success_snackbar = true;
            },

            onResponseChanged(questionID, answer) {
                // console.log(this.checkboxes);
                if (answer === true) {//checked
                    this.answers[questionID] = null;
                     document.getElementById(`rating-${questionID}`).style.display = "none";
                     console.log(0);
                }
                else if (answer === false){//unchecked
                    this.answers[questionID] = this.sliders[questionID];
                    document.getElementById(`rating-${questionID}`).style.display = "block";
                    console.log(1);
                }
                else {
                    this.answers[questionID] = answer;
                    document.getElementById(`rating-${questionID}`).style.display = "block";
                    console.log(2);
                }
            },

            getAllResponses: function() {
                this.$http.get(`http://localhost:8080/getAll/response`, {
                        params:{},
                        headers: {
                            'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                    this.items_response = response.body;
                    this.getPendingSurvey();
                    console.log(this.items_response);

                }, response => {
                    console.log("error", response);
                });
            },

            getStudentByUser: function() {
                this.$http.get(`http://localhost:8080/get/user/student/${this.$cookies.get('userEntity').id}`, {
                    params:{},
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {

                    this.student = response.body

                }, response => {
                    console.log("error", response);
                });
            },

            getPendingSurvey: function() {
                this.$http.get(`http://localhost:8080/questions/pending/${this.$route.params.id}`, {
                    params:{},
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {

                    this.questions = response.body;
                    // this.questions = this.questions.concat(response.body.filter(this.checkValidQuestons));
                    // for (let q=0; q<this.questions.length; q++) {
                    //     this.sliders[this.questions[q].id] = 0;
                    //     this.answers[this.questions[q].id] = 0;
                    //     this.checkboxes[this.questions[q].id] = false;
                    //     this.comments[this.questions[q].id] = "";
                    // }
                }, response => {
                    console.log("error", response);
                });
            },

            checkValidQuestons: function (question) {
                console.log("error", parseInt(this.student));
                for (let i = 0; i < this.items_response.length; i++) {
                    if (
                        (question.id === this.items_response[i].id_question) &&
                        (this.items_response[i].id_survey === parseInt(this.$route.params.id)) &&
                        (this.items_response[i].id_student === parseInt(this.student))
                    ) {
                        return false;
                    }
                }
                return true;
            }
        },
        mounted(){
            this.getAllResponses();
            this.getStudentByUser();
            this.getPendingSurvey();
        }
    }

</script>

<style scoped>

</style>
