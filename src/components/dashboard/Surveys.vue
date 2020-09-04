<template>
    <v-app>
        <v-snackbar color="red darken-2" :timeout="500" v-model="error_snackbar">
            Erreur !!!!
        </v-snackbar>

        <v-snackbar color="green darken-2" :timeout="500" v-model="success_snackbar" >
            Succes!!!
        </v-snackbar>

        <v-card>
            <v-card-title>
                <span>Liste des Sondages</span>
                <v-btn color="info" dark style="margin-left: 20px;" @click="dialog = true">Ajouter</v-btn>
                <v-spacer/>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                />
            </v-card-title>
            <v-data-table id="data-table-x" v-model="selected" :headers="headers" :items="surveys" :search="search" @click:row="onTableRowSelected"/>

        </v-card>

        <v-spacer/>

        <div class="text-xs-center">
            <v-dialog v-model="dialog" width="500">

                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>Manager les Sondages</v-card-title>

                    <v-card-text>
                        <v-form id="surveyForm">

                            <v-text-field
                                v-model="surveyForm.code"
                                label="Code"
                                type="text" required="true"/>
                                
                            <v-text-field
                                v-model="surveyForm.libelle"
                                label="Libellé"
                                type="text" required="true"/>

                            <v-text-field
                                v-model="surveyForm.description"
                                label="Description"
                                type="text" required="true"/>

                            <v-text-field
                                v-model="surveyForm.beginDate"
                                label="Date de Début"
                                type="date" required="true"/>

                            <v-date-picker v-model="surveyForm.beginDate" show-current header-color="success" color="green lighten-1"/>


                            <v-text-field
                                v-model="surveyForm.endDate"
                                label="Date de Fin"
                                type="date" required="true"/>

                            <v-date-picker v-model="surveyForm.endDate" show-current header-color="error" color="red lighten-1"/>

                            <v-select
                                v-model="surveyForm.courses"
                                chips filled outlined label="Cours concernés" dense
                                :items="items_course" item-text="name" multiple item-value="id" />

                            <v-select
                                v-model="surveyForm.questions"
                                chips filled outlined label="Choisir les questions" dense
                                :items="items_questions" item-text="libelle" multiple item-value="id" />

                        </v-form>
                    </v-card-text>

                    <v-divider/>

                    <v-card-actions>
                        <v-spacer/>
                        <v-btn small color="primary" style="margin-right: 20px;" dark @click="save">Enrégistrer</v-btn>
                        <v-btn small color="red lighten-2" dark @click="remove" v-show="crud_mode === 'u'"
                               style="background-color: #f66f81;">
                            Supprimer
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
    </v-app>
</template>

<script>
    export default {
        name: "Surveys",
        props:{
            
        },
        data: function() {
            return {
                selected: null,
                drawer: false,
                search: "",
                dialog: false,
                crud_mode: "c",
                selectedRow: null,
                headers: [
                    { text: "ID", align: "start", sortable: true, value: "id"},
                    { text: "Code", value: "code" },
                    { text: "Libellé", value: "libelle" },
                    { text: "Description", value: "description" },
                ],
                surveys: [],
                surveyForm: {
                    code: '',
                    libelle: '',
                    description: '',
                    beginDate: Date,
                    endDate: Date,
                    courses:[],
                    questions:[]
                },
                error_snackbar: false,
                success_snackbar: false,

                items_course: Array,
                items_questions: Array,

                survey_courses:[],
                
                survey_questions:[],
                
                survey_question:{
                    type:'question',
                    id:0
                },
                survey_question2:{
                    type:'question',
                    id:0
                },
                survey_question3:{
                    type:'question',
                    id:0
                },
                survey_question4:{
                    type:'question',
                    id:0
                },
                survey_question5:{
                    type:'question',
                    id:0
                },
                survey_course:{
                        type:'course',
                        id:0
                    },
                survey_course2:{
                        type:'course',
                        id:0
                    },
                survey_course3:{
                        type:'course',
                        id:0
                    },
                survey_course4:{
                        type:'course',
                        id:0
                    },
                survey_course5:{
                        type:'course',
                        id:0
                    },

                request_counter: 0
            };
        },

        methods: {
            onTableRowSelected: function (data) {
                this.surveyForm.code = data.code;
                this.surveyForm.libelle = data.libelle;
                this.surveyForm.description = data.description;
                this.surveyForm.courses = data.courses;
                this.surveyForm.questions = data.questions;
                this.surveyForm.beginDate = data.beginDate;
                this.surveyForm.endDate = data.endDate;
                this.selectedRow = data.id;
                this.dialog = true;
                this.crud_mode = 'u';
            },

            courseEntities: function (){
                switch (this.surveyForm.courses.length) {
                    case 1:                        
                        this.survey_course.id= this.surveyForm.courses[0];

                        this.survey_courses.push(this.survey_course);

                        break;
                    case 2:
                        this.survey_course.id= this.surveyForm.courses[0];
                        this.survey_course2.id= this.surveyForm.courses[1];

                        this.survey_courses.push(this.survey_course);
                        this.survey_courses.push(this.survey_course2);
                        break;
                    case 3:
                        this.survey_course.id= this.surveyForm.courses[0];
                        this.survey_course2.id= this.surveyForm.courses[1];
                        this.survey_course3.id= this.surveyForm.courses[2];

                        this.survey_courses.push(this.survey_course);
                        this.survey_courses.push(this.survey_course2);
                        this.survey_courses.push(this.survey_course3);
                        break;
                    case 4:
                        this.survey_course.id= this.surveyForm.courses[0];
                        this.survey_course2.id= this.surveyForm.courses[1];
                        this.survey_course3.id= this.surveyForm.courses[2];
                        this.survey_course4.id= this.surveyForm.courses[3];

                        this.survey_courses.push(this.survey_course);
                        this.survey_courses.push(this.survey_course2);
                        this.survey_courses.push(this.survey_course3);
                        this.survey_courses.push(this.survey_course4);
                        break;
                    case 5:
                        this.survey_course.id= this.surveyForm.courses[0];
                        this.survey_course2.id= this.surveyForm.courses[1];
                        this.survey_course3.id= this.surveyForm.courses[2];
                        this.survey_course4.id= this.surveyForm.courses[3];
                        this.survey_course5.id= this.surveyForm.courses[4];

                        this.survey_courses.push(this.survey_course);
                        this.survey_courses.push(this.survey_course2);
                        this.survey_courses.push(this.survey_course3);
                        this.survey_courses.push(this.survey_course4);
                        this.survey_courses.push(this.survey_course5);
                        break;
                }

            },

            questionEntities: function (){
                switch (this.surveyForm.questions.length) {
                    case 1:                        
                        this.survey_question.id= this.surveyForm.questions[0];

                        this.survey_questions.push(this.survey_question);

                        break;
                    case 2:
                        this.survey_question.id= this.surveyForm.questions[0];
                        this.survey_question2.id= this.surveyForm.questions[1];

                        this.survey_questions.push(this.survey_question);
                        this.survey_questions.push(this.survey_question2);
                        break;
                    case 3:
                        this.survey_question.id= this.surveyForm.questions[0];
                        this.survey_question2.id= this.surveyForm.questions[1];
                        this.survey_question3.id= this.surveyForm.questions[2];

                        this.survey_questions.push(this.survey_question);
                        this.survey_questions.push(this.survey_question2);
                        this.survey_questions.push(this.survey_question3);
                        break;
                    case 4:
                        this.survey_question.id= this.surveyForm.questions[0];
                        this.survey_question2.id= this.surveyForm.questions[1];
                        this.survey_question3.id= this.surveyForm.questions[2];
                        this.survey_question4.id= this.surveyForm.questions[3];

                        this.survey_questions.push(this.survey_question);
                        this.survey_questions.push(this.survey_question2);
                        this.survey_questions.push(this.survey_question3);
                        this.survey_questions.push(this.survey_question4);
                        break;
                    case 5:
                        this.survey_question.id= this.surveyForm.questions[0];
                        this.survey_question2.id= this.surveyForm.questions[1];
                        this.survey_question3.id= this.surveyForm.questions[2];
                        this.survey_question4.id= this.surveyForm.questions[3];
                        this.survey_question5.id= this.surveyForm.questions[4];

                        this.survey_questions.push(this.survey_question);
                        this.survey_questions.push(this.survey_question2);
                        this.survey_questions.push(this.survey_question3);
                        this.survey_questions.push(this.survey_question4);
                        this.survey_questions.push(this.survey_question5);
                        break;
                }

            },
            

            save: function () {
                this.courseEntities();
                this.questionEntities();
                let data = {
                    survey:{
                        type : "survey",
                        libelle : this.surveyForm.libelle,
                        code : this.surveyForm.code,
                        beginDate : this.surveyForm.beginDate,
                        endDate : this.surveyForm.endDate,
                        description : this.surveyForm.description,
                        modBy: this.$cookies.get('userEntity').id
                    },
                    courses: this.survey_courses,
                    questions: this.survey_questions
                };

                console.log(data);

                if (this.crud_mode === "c") {
                    this.$http.post('http://localhost:8080/surveys/save', data, {
                        headers: {
                            'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        if (response.data.error === null) {
                            console.log(response);
                            this.surveys.push(response.data);
                            this.clean_form();
                            this.clean_form();
                            this.crud_mode = 'c';
                            this.success_snackbar = true;
                        }

                    }, response => {
                        console.log("error", response);
                        this.error_snackbar = true;
                    });
                }
                else {
                    console.log('U');
                    for (let i = 0; i < this.surveys.length; i++) {
                        if(this.surveys[i].id === this.selectedRow) {
                            console.log('id: ', i);
                            data["id"] = this.selectedRow;
                            his.$http.post('http://localhost:8080/surveys/save', data, {
                                headers: {
                                    'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                                    'Content-Type': 'application/json',
                                }
                            }).then(response => {
                                    console.log(response);
                                    this.surveys[i] = response.data;
                                    this.clean_form();
                                    this.surveys.reverse();
                                    this.surveys.reverse();
                                    this.crud_mode = 'c';
                                    this.success_snackbar = true;

                            }, response => {
                                console.log("error", response);
                                this.error_snackbar = true;
                            });


                        }
                    }
                }
            },

            clean_form: function(){
                this.dialog = false;
                this.surveyForm.code = null;
                this.surveyForm.libelle = null;
                this.surveyForm.description = null;
                this.surveyForm.courses = null;
                this.surveyForm.questions = null;
                this.surveyForm.beginDate = null;
                this.surveyForm.endDate = null;
                this.crud_mode = 'c';
            },

            remove: function () {
                for (let i = 0; i < this.surveys.length; i++) {
                    if(this.surveys[i].id === this.selectedRow) {
                        console.log('id: ', i);

                        this.$http.get(`http://localhost:8080/delete/survey/${this.selectedRow}`, {
                            params:{},
                            headers: {
                                'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                                'Content-Type': 'application/json',
                            }
                        }).then(response => {

                            this.surveys = this.surveys.slice(0, i).concat(this.surveys.slice(i+1, this.surveys.length));
                            console.log(response.body);
                            this.dialog = false;
                            this.clean_form();
                            this.success_snackbar = true;

                        }, response => {
                            console.log("error", response);
                            this.error_snackbar = true;
                        });
                    }
                }

            },

            getAllCourses: function () {
                this.$http.get(`http://localhost:8080/getAll/course`, {
                    params:{},
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {
                    this.items_course = response.body;
                    this.request_counter++;
                }, response => {
                    console.log("error", response);
                });
            },

            getAllQuestions: function () {
                this.$http.get(`http://localhost:8080/getAll/question`, {
                    params:{},
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {
                    this.items_questions = response.body;
                    this.request_counter++;
                }, response => {
                    console.log("error", response);
                });
            },

        },

        mounted() {
            console.log(this.$store.state);
            this.$http.get(`http://localhost:8080/getAll/survey`, {
                    params:{},
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {
                    this.surveys = response.body;
                    this.success_snackbar = true;
                    this.getAllCourses();
                    this.getAllQuestions();

            }, response => {
                console.log("error", response);
                this.error_snackbar = true;
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

</style>
