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
    <!-- <div class="row">

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

    </div> -->

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
      images:{
                    AH: require('../assets/img/jpope/AH.png'),
                    CI: require('../assets/img/jpope/CI.png'),
                    CS: require('../assets/img/jpope/CS.png'),
                    DH: require('../assets/img/jpope/DH.png'),
                    DI: require('../assets/img/jpope/DI.png'),
                    MK: require('../assets/img/jpope/MK.png'),
                    NS: require('../assets/img/jpope/NS.png'),
                    PG: require('../assets/img/jpope/PG.png'),
                    SI: require('../assets/img/jpope/SI.png'),
                    TI: require('../assets/img/jpope/TI.png'),
                },
      statsCards: [
        {
          type: "success",
          icon: "ti-pulse",
          title: "PIIGO",
          value: "0",
          footerText: "Total des votes"
        },
        {
          type: "success",
          icon: "ti-pulse",
          title: "CISCO ISE",
          value: "0",
          footerText: "Total des votes"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "SIEM",
          value: "0",
          footerText: "Total des votes"
        },
        {
          type: "info",
          icon: "ti-pulse",
          title: "Tenable / Nessus",
          value: "0",
          footerText: "Nombre total de votes"
        },
        {
          type: "warning",
          icon: "ti-pulse",
          title: "TOIP",
          value: "0",
          footerText: "Nombre total de votes"
        },
        {
          type: "success",
          icon: "ti-pulse",
          title: "Course Survey",
          value: "0",
          footerText: "Nombre total de votes"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Ahoe Gnoe",
          value: "0",
          footerText: "Nombre total de votes"
        },
        {
          type: "info",
          icon: "ti-pulse",
          title: "Doctor Help",
          value: "0",
          footerText: "Nombre total de votes"
        },
        {
          type: "danger",
          icon: "ti-pulse",
          title: "Detections d'intrusions",
          value: "0",
          footerText: "Nombre total de votes"
        },
        {
          type: "info",
          icon: "ti-pulse",
          title: "Mayaki",
          value: "0",
          footerText: "Nombre total de votes"
        }
      ],
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
    getTotalPiigo : function(){
      this.$http.get('http://localhost:8080/jpope/totalPiigo', {
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
    getTotalCI : function(){
      this.$http.get('http://localhost:8080/jpope/totalCI', {
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
    getTotalSiem : function(){
      this.$http.get('http://localhost:8080/jpope/totalSiem',{
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
    },
    getTotalNessus : function(){
      this.$http.get('http://localhost:8080/jpope/totalNS',{
                  headers: {
                      'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                      'Content-Type': 'application/json',
                  }
              })
      .then(response => {

          this.statsCards[3].value= (response.data);

      },response => {
          console.log(response);
      });
    },
    getTotalToIp : function(){
      this.$http.get('http://localhost:8080/jpope/totalTI',{
                  headers: {
                      'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                      'Content-Type': 'application/json',
                  }
              })
      .then(response => {

          this.statsCards[4].value= (response.data);

      },response => {
          console.log(response);
      });
    },
    getTotalCS : function(){
      this.$http.get('http://localhost:8080/jpope/totalCS',{
                  headers: {
                      'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                      'Content-Type': 'application/json',
                  }
              })
      .then(response => {

          this.statsCards[5].value= (response.data);

      },response => {
          console.log(response);
      });
    },
    getTotalAH : function(){
      this.$http.get('http://localhost:8080/jpope/totalAH',{
                  headers: {
                      'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                      'Content-Type': 'application/json',
                  }
              })
      .then(response => {

          this.statsCards[6].value= (response.data);

      },response => {
          console.log(response);
      });
    },
    getTotalDH : function(){
      this.$http.get('http://localhost:8080/jpope/totalDH',{
                  headers: {
                      'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                      'Content-Type': 'application/json',
                  }
              })
      .then(response => {

          this.statsCards[7].value= (response.data);

      },response => {
          console.log(response);
      });
    },
    getTotalDI : function(){
      this.$http.get('http://localhost:8080/jpope/totalDI',{
                  headers: {
                      'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                      'Content-Type': 'application/json',
                  }
              })
      .then(response => {

          this.statsCards[8].value= (response.data);

      },response => {
          console.log(response);
      });
    },
    getTotalMK : function(){
      this.$http.get('http://localhost:8080/jpope/totalMK',{
                  headers: {
                      'Authorization': `Bearer ${this.$store.state.userInfo.token}`,
                      'Content-Type': 'application/json',
                  }
              })
      .then(response => {

          this.statsCards[9].value= (response.data);

      },response => {
          console.log(response);
      });
    },
  },
  mounted(){
    this.getTotalPiigo();
    this.getTotalDI();
    this.getTotalMK();
    this.getTotalCI();
    this.getTotalSiem();
    this.getTotalNessus();
    this.getTotalToIp();
    this.getTotalCS();
    this.getTotalAH();
    this.getTotalDH();
  }
};
</script>
<style>
</style>
