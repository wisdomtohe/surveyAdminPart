<template>
<!--    <v-app>-->
        <v-card class="mx-auto" max-width="400">
            <v-img class="white--text align-end" height=200 :src="images.userOnSurvey">
            </v-img>

            <v-card-text class="text--primary text-center">
                <div style="font-weight: bolder">{{ survey.libelle }}</div>
                <v-alert colored-border elevation="2" border="left" color="indigo">{{ survey.description }}</v-alert>
                <v-row no-gutters>
                    <v-col> Se colture le: </v-col>
                    <v-col> {{`${survey.endDate.slice(8,10)}-${survey.endDate.slice(5,7)}-${survey.endDate.slice(0,4)} à ${survey.endDate.slice(11,16)}`}} </v-col>
                </v-row>
            </v-card-text>

            <v-card-actions>
                <div class="mr-auto ml-auto">
                    <v-badge
                        bordered
                        color="success"
                        icon="mdi-check"
                        overlap
                    >
                        <v-btn class="white--text"
                            color="primary"
                            depressed 
                            :to="`/surveyQuestions/${survey.id}`"
                            @click="$store.commit('setCurrentSurvey', survey)">
                            Repondre
                        </v-btn>
                    </v-badge>
                </div>
            </v-card-actions>
        </v-card>
<!--    </v-app>-->
</template>

<script>
    export default {
        name: "Survey",
        props: {
            survey: Object
        },
        data: function() {
            return {
                images: {
                userOnSurvey: require('../assets/img/userOnSurvey.jpg')
            }
            };
        },
        methods: {
            randomImg: function () {

            }
        }
    }
</script>

<style scoped>

</style>
