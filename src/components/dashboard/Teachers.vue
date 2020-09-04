<template>
    <v-app>

        <v-snackbar color="red darken-2" :timeout="500" v-model="error_snackbar">
            Erreur !!!!
        </v-snackbar>

        <v-snackbar color="green darken-2" :timeout="500" v-model="success_snackbar" >
            succes!!!
        </v-snackbar>

        <v-card>
            <v-card-title>
                <span>Liste des Enseignants</span>
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
            <v-data-table id="data-table-x" v-model="selected" :headers="headers" :items="teachers" :search="search" @click:row="onTableRowSelected"/>

        </v-card>

        <v-spacer/>

        <div class="text-xs-center">
            <v-dialog v-model="dialog" width="500">

                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>Teachers form</v-card-title>

                    <v-card-text>
                        <v-form id="teacherForm">

                            <v-text-field
                                v-model="teacherForm.matricule"
                                label="Matricule" outlined
                                type="text" required="true"/>
                                
                            <v-select
                                v-model="teacherForm.user"
                                chips outlined :items="items_user"
                                item-text="userName" item-value="id"
                                label="Utilisateur" dense/>

                            <v-select v-model="teacherForm.courses"
                                      chips outlined :items="items_courses"
                                      item-text="name" item-value="id"
                                      label="Cours dispensés" multiple dense/>

                        </v-form>
                    </v-card-text>

                    <v-divider/>

                    <v-card-actions>
                        <v-spacer/>
                        <v-btn small color="primary" style="margin-right: 20px;" dark @click="save">Enregistrer</v-btn>
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
        name: "Students",
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
                    { text: "Nom", align: "start", sortable: true, value: "user.lastName"},
                    { text: "Prénoms", align: "start", sortable: true, value: "user.firstName"},
                    { text: "Nom d'utilisateur", value: "user.userName" },
                    { text: "Matricule", value: "matricule" }
                ],
                teachers: [],
                teacherForm: {
                    matricule: "TEA-",
                    user:'',
                    courses:[]
                },
                error_snackbar: false,
                success_snackbar: false,
                items_user: Array,
                items_courses: Array,
                teacher_courses:[],
                teacher_course:{
                    type:'course',
                    id:0
                },
                teacher_course2:{
                    type:'course',
                    id:0
                },
                teacher_course3:{
                    type:'course',
                    id:0
                },
                teacher_course4:{
                    type:'course',
                    id:0
                },
                teacher_course5:{
                    type:'course',
                    id:0
                },
                requests_counter: 0
            };
        },

        methods: {
            onTableRowSelected: function (data) {
                this.teacherForm.matricule = data.matricule;
                this.teacherForm.user = data.user;
                this.selectedRow = data.id;
                this.dialog = true;
                this.crud_mode = 'u';
            },

            courseEntities: function (){
                switch (this.teacherForm.courses.length) {
                    case 1:                        
                        this.teacher_course.id= this.teacherForm.courses[0];

                        this.teacher_courses.push(this.teacher_course);

                        break;
                    case 2:
                        this.teacher_course.id= this.teacherForm.courses[0];
                        this.teacher_course2.id= this.teacherForm.courses[1];

                        this.teacher_courses.push(this.teacher_course);
                        this.teacher_courses.push(this.teacher_course2);

                        break;
                    case 3:
                        this.teacher_course.id= this.teacherForm.courses[0];
                        this.teacher_course2.id= this.teacherForm.courses[1];
                        this.teacher_course3.id= this.teacherForm.courses[2];

                        this.teacher_courses.push(this.teacher_course);
                        this.teacher_courses.push(this.teacher_course2);
                        this.teacher_courses.push(this.teacher_course3);
                        break;
                    case 4:
                        this.teacher_course.id= this.teacherForm.courses[0];
                        this.teacher_course2.id= this.teacherForm.courses[1];
                        this.teacher_course3.id= this.teacherForm.courses[2];
                        this.teacher_course4.id= this.teacherForm.courses[3];

                        this.teacher_courses.push(this.teacher_course);
                        this.teacher_courses.push(this.teacher_course2);
                        this.teacher_courses.push(this.teacher_course3);
                        this.teacher_courses.push(this.teacher_course4);
                        break;
                    case 5:
                        this.teacher_course.id= this.teacherForm.courses[0];
                        this.teacher_course2.id= this.teacherForm.courses[1];
                        this.teacher_course3.id= this.teacherForm.courses[2];
                        this.teacher_course4.id= this.teacherForm.courses[3];
                        this.teacher_course4.id= this.teacherForm.courses[5];

                        this.teacher_courses.push(this.teacher_course);
                        this.teacher_courses.push(this.teacher_course2);
                        this.teacher_courses.push(this.teacher_course3);
                        this.teacher_courses.push(this.teacher_course4);
                        this.teacher_courses.push(this.teacher_course5);
                        break;
                }

            },

            save: function () {
                this.courseEntities();
                let data = {
                    teacher:{
                        type:"teacher",
                        matricule:this.teacherForm.matricule,
                        modBy: this.$cookies.get('userEntity').id,
                        user:{
                            type:"user",
                            id:this.teacherForm.user
                        }
                    },
                    courses:this.teacher_courses
                };

                if (this.crud_mode === "c") {
                    console.log('C');
                    this.$http.post('http://localhost:8080/users/save/teacher', data, {
                        headers: {
                            'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                            'Content-Type': 'application/json',
                        }
                    })
                    .then(response => {

                        this.teachers.push(response.data);
                        this.crud_mode = 'c';
                        this.clean_form();
                        this.success_snackbar = true;

                    },response => {
                        console.log("error creating teacher");
                        this.error_snackbar = true;
                    });
                }
                else {
                    console.log('U');
                    for (let i = 0; i < this.teachers.length; i++) {
                        if(this.teachers[i].id === this.selectedRow) {
                            console.log('id: ', i);
                            data["id"] = this.selectedRow;
                            this.$http.post('http://localhost:8080/users/save/teacher', data, {
                                headers: {
                                    'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                                    'Content-Type': 'application/json',
                                }
                            }).then(response => {

                                console.log(response);
                                this.teachers[i] = response.data;
                                this.teachers.reverse();
                                this.teachers.reverse();
                                this.crud_mode = 'c';
                                this.clean_form();
                                this.success_snackbar = true;

                            }, response => {
                                console.log("error updating teacher", response);
                                this.error_snackbar = true;
                            });
                        }
                    }
                    this.clean_form();
                }
            },

            clean_form: function(){
                this.dialog = false;
                this.teacherForm.matricule = "";
                this.teacherForm.user = "";
                this.crud_mode = 'c';
            },

            remove: function () {
                for (let i = 0; i < this.teachers.length; i++) {
                    if(this.teachers[i].id === this.selectedRow) {
                        console.log('id: ', i);

                        this.$http.get(`http://localhost:8080/delete/teacher/${this.selectedRow}`, {
                            params:{},
                            headers: {
                                'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                                'Content-Type': 'application/json',
                            }
                        }).then(response => {

                            this.teachers = this.teachers.slice(0, i).concat(this.teachers.slice(i+1, this.teachers.length));
                            console.log(response.body);
                            this.dialog = false;
                            this.clean_form();
                            this.success_snackbar = true;

                        }, response => {
                            console.log("error deleting teacher", response);
                            this.error_snackbar = true;
                        });
                    }
                }
                this.dialog = false;
                this.clean_form();
            },

            getAllUsers: function () {
                this.$http.get(`http://localhost:8080/getAll/user`, {
                    params:{},
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {
                    this.items_user = response.body;
                }, response => {
                    console.log("error", response);
                });
            },

            getAllCourses: function () {
                this.$http.get(`http://localhost:8080/getAll/course`, {
                    params:{},
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {
                    this.items_courses = response.body;
                    this.requests_counter++;
                }, response => {
                    console.log("error", response);
                });
            },
        },

        mounted() {
            console.log(this.$store.state);
            this.$http.get(`http://localhost:8080/getAll/teacher`, {
                    params:{},
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {

                this.teachers = response.body;
                this.getAllUsers();
                this.getAllCourses();
                this.success_snackbar = true;

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
