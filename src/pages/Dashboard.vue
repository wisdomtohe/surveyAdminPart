<template>
  <div>

    <!--Stats cards-->
    <div class="row">
      <div class="col-md-6 col-xl-3" v-for="stats in statsCards" :key="stats.title">
        <stats-card>
          <div class="icon-big text-center" :class="`icon-${stats.type}`" slot="header">
            <i :class="stats.icon"></i>
          </div>
          <div class="numbers" slot="content">
            <p>{{stats.title}}</p>
            {{stats.value}}
          </div>
          <div class="stats" slot="footer">
            <i :class="stats.footerIcon"></i> {{stats.footerText}}
          </div>
        </stats-card>
      </div>
    </div>

    <!--Charts-->
    <div class="row">

      <div class="col-md-6 col-12">
        <chart-card title="Etat de Participation aux Sondages"
                    sub-title="Volumes ayant participé et restant"
                    :chart-data="preferencesChart.data"
                    chart-type="Pie">
          <span slot="footer">
            <i class="ti-timer"></i> Stats participations aux sondages non encore cloturés</span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Ont participé
            <i class="fa fa-circle text-warning"></i> N'ont pas participé
          </div>
        </chart-card>
      </div>

      <div class="col-md-6 col-12">
        <chart-card title="Réponses Année 2020"
                    sub-title="Toutes les réponses aux sondages de l'année en cours"
                    :chart-data="activityChart.data"
                    :chart-options="activityChart.options">
          <span slot="footer">
            <i class="ti-check"></i> Plus d'informations dans le menu Reponses
          </span>
          <div slot="legend">
            <i class="fa fa-circle text-info"></i> Satisfaits
            <i class="fa fa-circle text-warning"></i> Non Satisfaits
          </div>
        </chart-card>
      </div>

    </div>

  </div>
</template>
<script>
import { StatsCard, ChartCard } from "@/components/index";
import Chartist from 'chartist';
export default {
  components: {
    StatsCard,
    ChartCard
  },
  /**
   * Chart data used to render stats, charts. Should be replaced with server data
   */
  data() {
    return {
      statsCards: [
        {
          type: "warning",
          icon: "ti-user",
          title: "Total Etudiants",
          value: "347",
          footerText: "Nombre total d'étudiants",
          footerIcon: "ti-reload"
        },
        {
          type: "success",
          icon: "ti-wallet",
          title: "Total Sondages",
          value: "19",
          footerText: "Mois en cours",
          footerIcon: "ti-calendar"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Total Réponses",
          value: "6593",
          footerText: "Dernière mise à jour : Il y a 2 heures",
          footerIcon: "ti-timer"
        },
        {
          type: "info",
          icon: "ti-twitter-alt",
          title: "Followers",
          value: "+45",
          footerText: "Activité sur les reseaux",
          footerIcon: "ti-reload"
        }
      ],
      usersChart: {
        data: {
          labels: [
            "9:00AM",
            "12:00AM",
            "3:00PM",
            "6:00PM",
            "9:00PM",
            "12:00PM",
            "3:00AM",
            "6:00AM"
          ],
          series: [
            [287, 385, 490, 562, 594, 626, 698, 895, 952],
            [67, 152, 193, 240, 387, 435, 535, 642, 744],
            [23, 113, 67, 108, 190, 239, 307, 410, 410]
          ]
        },
        options: {
          low: 0,
          high: 1000,
          showArea: true,
          height: "245px",
          axisX: {
            showGrid: false
          },
          lineSmooth: Chartist.Interpolation.simple({
            divisor: 3
          }),
          showLine: true,
          showPoint: false
        }
      },
      activityChart: {
        data: {
          labels: [
            "Jan",
            "Fev",
            "Mar",
            "Avr",
            "Mai",
            "Jun",
            "Jul",
            "Aou",
            "Sep",
            "Oct",
            "Nov",
            "Dec"
          ],
          series: [
            [542, 543, 520, 680, 653, 753, 326, 434, 568, 610, 756, 895],
            [230, 293, 380, 480, 503, 553, 600, 664, 698, 710, 736, 795]
          ]
        },
        options: {
          seriesBarDistance: 10,
          axisX: {
            showGrid: false
          },
          height: "245px"
        }
      },
      preferencesChart: {
        data: {
          labels: ["62%", "38%"],
          series: [62, 38]
        },
        options: {}
      }
    };
  },
  methods:{
    getStudentsNumber : function(){
      this.$http.get('http://localhost:8080/count/student', {
                  headers: {
                      'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                      'Content-Type': 'application/json',
                  }
              })
      .then(response => {

          this.statsCards[0].value= (response.data);

      },response => {
          console.log(response);
      });
    },
    getSurveysNumber : function(){
      this.$http.get('http://localhost:8080/count/survey', {
                  headers: {
                      'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                      'Content-Type': 'application/json',
                  }
              })
      .then(response => {

          this.statsCards[1].value= (response.data);

      },response => {
          console.log(response);
      });
    },
    getResponsesNumber : function(){
      this.$http.get('http://localhost:8080/count/response',{
                  headers: {
                      'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                      'Content-Type': 'application/json',
                  }
              })
      .then(response => {

          this.statsCards[2].value= (response.data);

      },response => {
          console.log(response);
      });
    }
  },
  mounted(){
    this.getStudentsNumber();
    this.getSurveysNumber();
    this.getResponsesNumber();
  }
};
</script>
<style>
</style>
