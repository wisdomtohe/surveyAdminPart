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
                <span>Liste des Réponses</span>
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
            <v-data-table id="data-table-x" v-model="selected" :headers="headers" :items="questions" :search="search" @click:row="onTableRowSelected"/>

        </v-card>

        <v-spacer/>

        <div class="text-xs-center">
            <v-dialog v-model="dialog" width="500">

                <v-card>
                    <v-card-title class="headline grey lighten-2" primary-title>Manager les Questions</v-card-title>

                    <v-card-text>
                        <v-form id="questionForm">

                            <v-text-field
                                v-model="questionForm.libelle"
                                label="Libellé"
                                type="text" required="true"/>

                            <v-text-field
                                v-model="questionForm.contenu"
                                label="Contenu"
                                type="text" required="true"/>



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
        name: "Responses",
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
                    { text: "Libéllé", value: "libelle" },
                    { text: "Contenu", value: "contenu" },
                    { text: "Date d'ajout", value: "createDateTime" },
                    { text: "Date de modification", value: "modDateTime" },
                ],
                questions: [],
                questionForm: {
                    libelle: "",
                    contenu: ""
                },
                error_snackbar: false,
                success_snackbar: false,
            };
        },

        methods: {
            onTableRowSelected: function (data) {
                this.questionForm.title = data.libelle;
                this.questionForm.contenu = data.contenu;
                this.selectedRow = data.id;
                this.dialog = true;
                this.crud_mode = 'u';
            },

            save: function () {
                let data = {
                    type: "question",
                    // createDateTime: Math.floor(Date.now() / 1000),
                    // modDateTime: Math.floor(Date.now() / 1000),
                    libelle: this.questionForm.libelle,
                    contenu: this.questionForm.contenu,
                    modBy: this.$cookies.get('userEntity').id
                };

                if (this.crud_mode === "c") {
                    this.$http.post('http://localhost:8080/save/question', data, {
                        headers: {
                            'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                            'Content-Type': 'application/json',
                        }
                    }).then(response => {

                        console.log(response);
                        this.questions.push(response.data);
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
                    for (let i = 0; i < this.questions.length; i++) {
                        if(this.questions[i].id === this.selectedRow) {
                            console.log('id: ', i);
                            data["id"] = this.selectedRow;
                            this.$http.post('http://localhost:8080/save/question', data, {
                                headers: {
                                    'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                                    'Content-Type': 'application/json',
                                }
                            }).then(response => {

                                console.log(response);
                                this.questions[i] = response.data;
                                this.questions.reverse();
                                this.questions.reverse();
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

                this.clean_form();
            },

            clean_form: function(){
                this.dialog = false;
                this.questionForm.title = "";
                this.crud_mode = 'c';
            },

            remove: function () {
                for (let i = 0; i < this.questions.length; i++) {
                    if(this.questions[i].id === this.selectedRow) {
                        console.log('id: ', i);

                        this.$http.get(`http://localhost:8080/delete/question/${this.selectedRow}`, {
                            params:{},
                            headers: {
                                'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                                'Content-Type': 'application/json',
                            }
                        }).then(response => {

                            this.questions = this.questions.slice(0, i).concat(this.questions.slice(i+1, this.questions.length));
                            // this.questions.reverse();
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
            this.$http.get(`http://localhost:8080/getAll/question`, {
                params:{},
                headers: {
                    'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                    'Content-Type': 'application/json',
                }
            }).then(response => {
                console.log(response.status);
                this.questions = response.body;
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
