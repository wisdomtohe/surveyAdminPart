<template>
<!--    <v-app>-->
        <v-card class="mx-auto" max-width="400">
            <v-list two-line>
            <v-list-item-group
                v-model="selected"
                multiple
                active-class="pink--text"
            >
            <template v-for="(item, index) in items">
          <v-list-item :key="item.title">
            <template v-slot:default="{ active, toggle }">
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
                <v-list-item-subtitle class="text--primary" v-text="item.headline"></v-list-item-subtitle>
                <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action>
                <v-list-item-action-text v-text="item.action"></v-list-item-action-text>
                <v-icon
                  v-if="!active"
                  color="grey lighten-1"
                >
                  star_border
                </v-icon>

                <v-icon
                  v-else
                  color="yellow"
                >
                  star
                </v-icon>
              </v-list-item-action>
            </template>
          </v-list-item>
        </v-card>
<!--    </v-app>-->
</template>

<script>
    export default {
        name: "SurveyInList",
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
