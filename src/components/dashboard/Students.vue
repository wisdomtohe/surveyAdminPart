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
                <span>Liste des Etudiants</span>
                <v-btn color="info" dark style="margin-left: 20px;" @click="dialog = true">Ajouter</v-btn>
                <v-spacer/>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Rechercher"
                    single-line
                    hide-details
                />
            </v-card-title>
            <v-data-table id="data-table-x" v-model="selected" :headers="headers" :items="students" :search="search" @click:row="onTableRowSelected"/>

        </v-card>

        <v-spacer/>

        <div class="text-xs-center">
            <v-dialog v-model="dialog" width="500">

                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>Gérer les Etudiants</v-card-title>

                    <v-card-text>
                        <v-form id="studentForm">

                            <v-text-field
                                v-model="studentForm.matricule"
                                label="Matricule" outlined
                                type="text" required="true"/>

                            <v-select
                                v-model="studentForm.user"
                                chips outlined :items="items_user"
                                item-text="userName" item-value="id"
                                label="Utilisateur" dense/>


                           <v-select v-model="studentForm.classe"
                                      chips outlined :items="items_classes"
                                      item-text="name" item-value="id"
                                      label="Classe" dense/>

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
                    { text: "Nom", value: "user.lastName" },
                    { text: "Prenoms", value: "user.firstName" },
                    { text: "Matricule", value: "matricule" },
                    { text: "Classe", value: "classe.name" },
                    { text: "Date d'inscription", value: "createDateTime" },
                ],
                students: [],
                studentForm: {
                    matricule: "STU-",
                    user:'',
                    classe:''
                },

                error_snackbar: false,
                success_snackbar: false,

                items_classes: Array,
                items_user: Array,
                items_teacher: Array,

                requests_counter: 0,
            };
        },

        methods: {
            onTableRowSelected: function (data) {
                this.studentForm.matricule = data.matricule;
                this.selectedRow = data.id;
                this.dialog = true;
                this.crud_mode = 'u';
            },

            save: function () {
                let data = {
                    type: "student",
                    matricule: this.studentForm.matricule,
                    user:{
                        type:'user',
                        id:this.studentForm.user,
                    },
                    classe:{
                        type:'classe',
                        id:this.studentForm.classe,
                    },
                    modBy: this.$cookies.get('userEntity').id
                };

                if (this.crud_mode === "c") {
                    console.log('C');
                    this.$http.post(`http://localhost:8080/save/student`, data, {
                        headers: {
                            'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        this.students.push(response.data);
                        this.crud_mode = 'c';
                        this.clean_form();
                        this.success_snackbar = true;

                    },response => {
                        console.log(response);
                        this.error_snackbar = true;
                    });
                }
                else {
                    console.log('U');
                    for (let i = 0; i < this.students.length; i++) {
                        if(this.students[i].id === this.selectedRow) {
                            console.log('id: ', i);
                            data["id"] = this.selectedRow;
                            this.$http.post(`http://localhost:8080/save/student`, data, {
                                headers: {
                                    'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                                    'Content-Type': 'application/json',
                                }
                            }).then(response => {

                                console.log(response);
                                this.students[i] = response.data;
                                this.students.reverse();
                                this.students.reverse();
                                this.crud_mode = 'c';
                                this.clean_form();
                                this.success_snackbar = true;

                            }, response => {
                                console.log("error", response);
                                this.error_snackbar = true;
                            });
                        }
                    }
                    this.clean_form();
                }
            },

            clean_form: function(){
                this.dialog = false;
                this.studentForm.matricule = "";
                this.studentForm.user = "";
                this.studentForm.classe = "";
                this.crud_mode = 'c';
            },

            remove: function () {
                for (let i = 0; i < this.students.length; i++) {
                    if(this.students[i].id === this.selectedRow) {
                        console.log('id: ', i);

                        this.$http.get(`http://localhost:8080/delete/student/${this.selectedRow}`, {
                            params:{},
                            headers: {
                                'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                                'Content-Type': 'application/json',
                            }
                        }).then(response => {

                            this.students = this.students.slice(0, i).concat(this.students.slice(i+1, this.students.length));
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
                this.dialog = false;
                this.clean_form();
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
                    console.log(response.body);
                    this.requests_counter++;
                }, response => {
                    console.log("error", response);
                });
            },

            getAllUsers: function () {
                this.$http.get(`http://localhost:8080/getAll/user`, {
                    params:{},
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {
                    this.items_user = response.body.filter(this.checkValidUser);
                    console.log(this.items_user);
                }, response => {
                    console.log("error", response);
                });
            },

            getAllTeachers: function () {
                this.$http.get(`http://localhost:8080/getAll/teacher`, {
                    params:{},
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {
                    this.items_teacher = response.body;
                    this.requests_counter++;
                }, response => {
                    console.log("error", response);
                });
            },

            checkValidUser: function (user) {
                let arr = this.students.concat(this.items_teacher);
                for (let i = 0; i < arr.length; i++) {
                    if (user.id === arr[i].id_user)
                        return false;
                }
                return true;
            }
        },

        watch: {
            requests_counter: function (val) {
                if (val === 2) {
                    this.getAllUsers();
                }
            }
        },

        mounted() {
            console.log(this.$store.state);
            this.$http.get(`http://localhost:8080/getAll/student`, {
                params:{},
                headers: {
                    'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                this.students = response.body;
                this.success_snackbar = true;
                this.getAllClasses();
                this.getAllTeachers();
                this.getAllUsers();
            }, response => {
                console.log("error loading students", response);
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
