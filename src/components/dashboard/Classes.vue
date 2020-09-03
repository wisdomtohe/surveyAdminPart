<template>
    <v-app>
        <v-snackbar color="red darken-2" timeout="500" v-model="error_snackbar">
            Erreur !!!!
        </v-snackbar>

        <v-snackbar color="green darken-2" timeout="500" v-model="success_snackbar" >
            succes!!!
        </v-snackbar>

        <v-card>
            <v-card-title>
                <span>Liste des Classes</span>
                <v-btn color="red lighten-2" dark style="margin-left: 20px;" @click="dialog = true">Ajouter</v-btn>
                <v-spacer/>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                />
            </v-card-title>
            <v-data-table id="data-table-x" v-model="selected" :headers="headers" :items="classes" :search="search" @click:row="onTableRowSelected"/>

        </v-card>

        <v-spacer/>

        <div class="text-xs-center">
            <v-dialog v-model="dialog" width="500">

                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>Manager les Classes</v-card-title>

                    <v-card-text>
                        <v-form id="classeForm">

                            <v-text-field
                                v-model="classeForm.code"
                                label="Code"
                                type="text" required="true"/>

                            <v-text-field
                                v-model="classeForm.name"
                                label="Nom"
                                type="text" required="true"/>

                            <v-select v-model="classeForm.filiere"
                                      chips outlined :items="items_filieres"
                                      item-text="name" item-value="id"
                                      label="Filiere" dense/>

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
                    { text: "Code", sortable: true, value: "code" },
                    { text: "Nom", sortable: true, value: "name" },
                    { text: "Filière", sortable: true, value: "filiere.name" },
                    { text: "Date d'ajout", value: "createDateTime" },
                    { text: "Date de modification", value: "modDateTime" },
                ],
                classes: [],
                classeForm: {
                    code:'',
                    name:'',
                    filiere:'',
                },
                error_snackbar: false,
                items_filieres: Array,
                success_snackbar: false,
            };
        },

        methods: {
            onTableRowSelected: function (data) {
                this.classeForm.name = data.name;
                this.selectedRow = data.id;
                this.dialog = true;
                this.crud_mode = 'u';
            },

            save: function () {
                let data = {
                    type: "classe",
                    code: this.classeForm.code,
                    name: this.classeForm.name,
                    filiere: {
                        type:"filiere",
                        id:this.classeForm.filiere
                    },
                    modBy: this.$cookies.get('userEntity').id
                };

                if (this.crud_mode === "c") {
                    this.$http.post(`http://localhost:8080/save/classe`, data, {
                        headers: {
                            'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        console.log(response);
                        this.classes.push(response.data);
                        this.crud_mode = 'c';
                        this.clean_form();
                        this.success_snackbar = true;

                    }, response => {
                        console.log("error", response);
                        this.error_snackbar = true;
                    });
                }
                else {
                    console.log('U');
                    for (let i = 0; i < this.classes.length; i++) {
                        if(this.classes[i].id === this.selectedRow) {
                            console.log('id: ', i);
                            data["id"] = this.selectedRow;
                            this.$http.post(`http://localhost:8080/save/student`, data, {
                                headers: {
                                    'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                                    'Content-Type': 'application/json',
                                }
                            }).then(response => {

                                console.log(response);
                                this.classes[i] = response.data;
                                this.classes.reverse();
                                this.classes.reverse();
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
                this.classeForm.name = "";
                this.crud_mode = 'c';
            },

            getAllFilieres: function () {
                this.$http.get(`http://localhost:8080/getAll/filiere`, {
                    params:{},
                    headers: {
                        'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                        'Content-Type': 'application/json',
                    }
                }).then(response => {
                    this.items_filieres = response.body;
                    console.log(this.items_user);
                }, response => {
                    console.log("error", response);
                });
            },

            remove: function () {
                for (let i = 0; i < this.classes.length; i++) {
                    if(this.classes[i].id === this.selectedRow) {
                        console.log('id: ', i);

                        this.$http.get(`http://localhost:8080/delete/classe/${this.selectedRow}`, {
                            params:{},
                            headers: {
                                'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                                'Content-Type': 'application/json',
                            }
                        }).then(response => {

                            this.classes = this.classes.slice(0, i).concat(this.classes.slice(i+1, this.classes.length));
                            // this.classes.reverse();
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
            this.$http.get(`http://localhost:8080/getAll/classe`, {
                params:{},
                headers: {
                    'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                console.log(response.status);
                this.classes = response.body;
                this.getAllFilieres();
                console.log(response.body);
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
