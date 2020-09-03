<template>
    <v-app>

        <v-snackbar color="red darken-2" :timeout="500" v-model="error_snackbar">
            <p class="text-center">Erreur de chargement</p>
        </v-snackbar>

        <v-snackbar color="green darken-2" :timeout="500" v-model="success_snackbar" >
            <p class="text-center">Chargement réussi</p>
        </v-snackbar>

        <v-card>
            <v-card-title>
                <span>Liste des Utilisateurs</span>
                <v-btn color="red lighten-2" dark style="margin-left: 20px;" @click="dialog = true">Ajouter</v-btn>
                <v-spacer/>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details/>
            </v-card-title>
            <v-data-table id="data-table-x" v-model="selected" :headers="headers" :items="users" :search="search" @click:row="onTableRowSelected"/>

        </v-card>

        <v-spacer/>

        <div class="text-xs-center">
            <v-dialog v-model="dialog" width="500">

                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>Ajout d'utilisateur</v-card-title>

                    <v-card-text>
                        <v-form id="userForm">

                            <v-text-field
                                v-model="userForm.lastName"
                                label="Nom"
                                type="text" required="true"/>

                            <v-text-field
                                v-model="userForm.firstName"
                                label="Prenoms"
                                type="text" required="true"/>

                            <v-text-field
                                name="userName"
                                v-model="userForm.userName"
                                label="Username"
                                type="text" required="true"/>

                            <v-text-field
                                v-model="userForm.phone"
                                label="Téléphone"
                                type="text" required="true"/>

                            <v-text-field
                                v-model="userForm.email"
                                label="Email"
                                type="email" required="true"/>

                            <v-text-field
                                id="password"
                                v-model="userForm.password"
                                label="Password"
                                type="password" required="true"/>

                            <v-select v-model="userForm.roles"
                                      chips outlined :items="items_roles"
                                      item-text="name" item-value="id"
                                      label="Roles" multiple dense/>
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
        name: "Users",
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
                    { text: "Nom", align: "start", sortable: false, value: "lastName"},
                    { text: "Prénoms", align: "start", sortable: false, value: "firstName"},
                    { text: "Pseudo", value: "userName" },
                    { text: "telephone", value: "phone" },
                    { text: "Email", value: "email" },
                    // { text: "Date d'ajout", value: "createDateTime" },
                    // { text: "Date de modification", value: "modDateTime" },
                ],
                users: [],
                userForm: {
                    firstName: "",
                    lastName:'',
                    userName: "",
                    password: "",
                    phone: "",
                    email: "@ipnetinstitute.com",
                    roles:[]
                },
                my_roles:[],
                my_role:{
                    id:0
                },
                my_role2:{
                    id:0
                },
                my_role3:{
                    id:0
                },
                error_snackbar: false,
                items_roles:Array,
                success_snackbar: false,
            };
        },

        methods: {
            onTableRowSelected: function (data) {
                this.userForm.firstName = data.firstName;
                this.userForm.lastName = data.lastName;
                this.userForm.userName = data.userName;
                this.userForm.password = data.password;
                this.userForm.phone = data.phone;
                this.userForm.email = data.email;
                this.selectedRow = data.id;
                this.dialog = true;
                this.crud_mode = 'u';
            },

            roleEntities: function (){
                switch (this.userForm.roles.length) {
                    case 1:                        
                        this.my_role.id= this.userForm.roles[0];

                        this.my_roles.push(this.my_role);

                        break;
                    case 2:
                        this.my_role.id= this.userForm.roles[0];
                        this.my_role2.id= this.userForm.roles[1];

                        this.my_roles.push(this.my_role);
                        this.my_roles.push(this.my_role2);
                        break;
                    case 3:
                        this.my_role.id= this.userForm.roles[0];
                        this.my_role2.id= this.userForm.roles[1];
                        this.my_role3.id= this.userForm.roles[2];

                        this.my_roles.push(this.my_role);
                        this.my_roles.push(this.my_role2);
                        this.my_roles.push(this.my_role3);
                        break;
                }

            },

            save: function () {
                this.roleEntities();     
                let data = {
                    user: {
                        type: "user",
                        firstName: this.userForm.firstName,
                        lastName:this.userForm.lastName,
                        userName: this.userForm.userName,
                        password: this.userForm.password,
                        phone: this.userForm.phone,
                        email: this.userForm.email,
                        modBy: this.$cookies.get('userEntity').id
                    },
                    roles: this.my_roles
                };

                if (this.crud_mode === "c") {
                    console.log('C');
                    //this.$http.post('http://ec2-18-224-141-43.us-east-2.compute.amazonaws.com/services/api/auth/signup', data)
                    this.$http.post('http://localhost:8080/users/save', data, {
                                headers: {
                                    'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                                    'Content-Type': 'application/json',
                                }
                            })
                    .then(response => {

                        this.users.push(response.data);
                        this.crud_mode = 'c';
                        this.clean_form();
                        this.success_snackbar = true;

                    },response => {
                        console.log(this.$store.state.userInfo.token);
                        console.log(response);
                        this.error_snackbar = true;
                    });
                }
                else {
                    console.log('U');
                    for (let i = 0; i < this.users.length; i++) {
                        if(this.users[i].id === this.selectedRow) {
                            console.log('id: ', i);
                            data.user["id"] = this.selectedRow;
                            this.$http.post(`http://localhost:8080/users/save`, data, {
                                headers: {
                                    'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                                    'Content-Type': 'application/json',
                                }
                            }).then(response => {

                                this.users[i] = response.data;
                                this.users.reverse();
                                this.users.reverse();
                                this.crud_mode = 'c';
                                this.clean_form();
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
                this.userForm.firstName = "";
                this.userForm.lastName = "";
                this.userForm.userName = "";
                this.userForm.password = "";
                this.userForm.phone = "";
                this.userForm.email = "";
                this.crud_mode = 'c';
            },

            getAllRoles: function () {
                this.$http.get(`http://localhost:8080/roles/all`, {
                    params:{},
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {
                    this.items_roles = response.body;
                    console.log(response.body);
                    this.requests_counter++;
                }, response => {
                    console.log("error getting roles", response);
                });
            },

            remove: function () {
                for (let i = 0; i < this.users.length; i++) {
                    if(this.users[i].id === this.selectedRow) {
                        console.log('id: ', i);

                        this.$http.get(`http://localhost:8080/delete/user/${this.selectedRow}`, {
                            params:{},
                            headers: {
                                'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                                'Content-Type': 'application/json',
                            }
                        }).then(response => {

                            this.users = this.users.slice(0, i).concat(this.users.slice(i+1, this.users.length));
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
            }
        },

        mounted() {
            console.log(this.$store.state);
            this.$http.get(`http://localhost:8080/getAll/user`, {
                params:{},
                headers: {
                    'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                this.users = response.body;
                this.success_snackbar = true;
                this.getAllRoles();
            },
            response => {
                console.log("error loading users", response);
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
