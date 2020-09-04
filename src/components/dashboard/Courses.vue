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
                <span>Liste des Cours</span>
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
            <v-data-table id="data-table-x" v-model="selected" :headers="headers" :items="courses" :search="search" @click:row="onTableRowSelected"/>

        </v-card>

        <v-spacer/>

        <div class="text-xs-center">
            <v-dialog v-model="dialog" width="500">

                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>Manager les Cours</v-card-title>

                    <v-card-text>
                        <v-form id="CourseForm">

                            <v-text-field
                                v-model="CourseForm.code"
                                label="Code"
                                type="text" required="true"/>

                            <v-text-field
                                v-model="CourseForm.name"
                                label="Intitulé"
                                type="text" required="true"/>

                            <v-select v-model="CourseForm.classes"
                                      chips outlined :items="items_classes"
                                      item-text="name" item-value="id"
                                      label="Classes" multiple dense/>

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
        name: "Courses",
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
                    { text: "Code", align: "start", sortable: true, value: "code"},
                    { text: "Intitulé", value: "name" }
                ],
                courses: [],

                CourseForm: {
                    code: '',
                    name: '',
                    classes: []
                },

                error_snackbar: false,
                success_snackbar: false,
                items_classes: Array,
                course_classes:[],
                course_classe:{
                    id:0,
                    type:"classe"
                },
                course_classe2:{
                    id:0,
                    type:"classe"
                },
                course_classe3:{
                    id:0,
                    type:"classe"
                },
                course_classe4:{
                    id:0,
                    type:"classe"
                },
                request_counter: 0
            };
        },

        methods: {
            onTableRowSelected: function (data) {
                this.CourseForm.code = data.code;
                this.CourseForm.name = data.name;
                this.selectedRow = data.id;
                this.dialog = true;
                this.crud_mode = 'u';
            },

            classeEntities: function (){
                switch (this.CourseForm.classes.length) {
                    case 1:                        
                        this.course_classe.id= this.CourseForm.classes[0];

                        this.course_classes.push(this.course_classe);

                        break;
                    case 2:
                        this.course_classe.id= this.CourseForm.classes[0];
                        this.course_classe2.id= this.CourseForm.classes[1];

                        console.log(this.CourseForm.classes[0]);
                        console.log(this.CourseForm.classes[1]);

                        this.course_classes.push(this.course_classe);
                        this.course_classes.push(this.course_classe2);

                        console.log(this.course_classe);
                        console.log(this.course_classe2);
                        break;
                    case 3:
                        this.course_classe.id= this.CourseForm.classes[0];
                        this.course_classe2.id= this.CourseForm.classes[1];
                        this.course_classe3.id= this.CourseForm.classes[2];

                        this.course_classes.push(this.course_classe);
                        this.course_classes.push(this.course_classe2);
                        this.course_classes.push(this.course_classe3);
                        break;
                    case 4:
                        this.course_classe.id= this.CourseForm.classes[0];
                        this.course_classe2.id= this.CourseForm.classes[1];
                        this.course_classe3.id= this.CourseForm.classes[2];
                        this.course_classe4.id= this.CourseForm.classes[3];

                        this.course_classes.push(this.course_classe);
                        this.course_classes.push(this.course_classe2);
                        this.course_classes.push(this.course_classe3);
                        this.course_classes.push(this.course_classe4);
                        break;
                }
                
            },

            save: function () {
                this.classeEntities();
                let data = {
                    course: {
                        type: "course",
                        code: this.CourseForm.code,
                        name: this.CourseForm.name,
                        modBy: this.$cookies.get('userEntity').id
                    },
                    classes:this.course_classes
                };

                if (this.crud_mode === "c") {
                    this.$http.post('http://localhost:8080/courses/save', data, {
                        headers: {
                            'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        if (response.data.error === null) {
                            this.courses.push(response.data);
                            this.crud_mode = 'c';
                            this.cleaform();
                            this.success_snackbar = true;
                        }

                    }, response => {
                        console.log("error creating course", response);
                        this.error_snackbar = true;
                    });
                }
                else {
                    console.log('U');
                    for (let i = 0; i < this.courses.length; i++) {
                        if(this.courses[i].id === this.selectedRow) {
                            console.log('id: ', i);
                            data["id"] = this.selectedRow;
                            this.$http.post('http://localhost:8080/courses/save', data, {
                                headers: {
                                    'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                                    'Content-Type': 'application/json',
                                }
                            }).then(response => {
                                console.log(response.data.error);
                                if (response.data.error === null) {
                                    console.log('IN');
                                    this.courses[i] = response.data;
                                    console.log(this.courses);
                                    this.courses.reverse();
                                    this.courses.reverse();
                                    this.crud_mode = 'c';

                                    this.success_snackbar = true;
                                    this.clean_form();
                                }

                            }, response => {
                                console.log("error updating course", response);
                                this.error_snackbar = true;
                            });
                        }
                    }
                }
            },

            clean_form: function(){
                this.dialog = false;
                this.CourseForm.code = "";
                this.CourseForm.name = "";
                this.CourseForm.classes = [];
                this.crud_mode = 'c';
            },

            remove: function () {
                for (let i = 0; i < this.courses.length; i++) {
                    if(this.courses[i].id === this.selectedRow) {
                        console.log('id: ', i);

                        this.$http.get(`http://localhost:8080/delete/course/${this.selectedRow}`, {
                            params:{},
                            headers: {
                                'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                                'Content-Type': 'application/json',
                            }
                        }).then(response => {

                            this.courses = this.courses.slice(0, i).concat(this.courses.slice(i+1, this.courses.length));
                            console.log(response.body);
                            this.dialog = false;
                            this.clean_form();
                            this.success_snackbar = true;

                        }, response => {
                            console.log("error deleting course", response);
                            this.error_snackbar = true;
                        });
                    }
                }

            },

            getAllClasses: function () {
                this.$http.get(`http://localhost:8080/getAll/classe`, {
                    params:{},
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {
                    this.items_classes = response.body;
                    this.request_counter++;
                }, response => {
                    console.log("error loading classes", response);
                });
            },

            // getStudentById: function (id) {
            //     let res = null;
            //     for (let i = 0; i < this.items_student.length; i++) {
            //         if (id === this.items_student[i].id) {
            //             res = this.items_student[i];
            //         }
            //     }
            //     return res;
            // }

        },

        mounted() {
            this.$http.get(`http://localhost:8080/getAll/course`, {
                params:{},
                headers: {
                    'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                console.log(response.body);
                this.getAllClasses();
                this.courses = response.body;
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
