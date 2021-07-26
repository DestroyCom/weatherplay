<template>
  <section id='foreCast' v-if="getForecastGlobal !== null">
    <h3 v-if="!displayDetails">Prévision des 3 prochains jours</h3>
    <div>
      <div v-if="!displayDetails" class="threeDays">
        <div v-for="(day) in getForecastGlobal.data.forecast.forecastday" :key='day.date_epoch'
          @click="triggerDetails(day)">
          <h4> {{formateDate(day.date)}} </h4>
          <div>
          <DisplayIcon v-bind:conditionCode="day.day.condition.code" />
          <p> {{day.day.condition.text}} </p>
          </div>
          <p>Température moyenne : {{day.day.avgtemp_c}} C° </p>
          <p>Vitesse maximum du vent : {{day.day.maxwind_kph}} km/h </p>
        </div>
      </div>
      <div v-if="displayDetails" class="oneDay">
        <div>
          <div class="responsiveChart">
            <Chart v-bind:chartData='dataChart' v-bind:chartOptions="chartOptions" style="width:100%;height:100%;" />
            <p style="text-align: center">Cliquez sur les points pour avoir plus de details.</p>
          </div>
          <div v-if="!hourDay">
            <h4>Résumé de la journée du {{ formateDate(tmpDayDetails.date) }}</h4>
            <div>
              <p>{{tmpDayDetails.day.condition.text}}</p>
              <DisplayIcon v-bind:conditionCode="tmpDayDetails.day.condition.code" />
            </div>
            <div>
              <p>Temperature moyenne : {{tmpDayDetails.day.avgtemp_c}} C°</p>
              <p>Vitesse maximum du vent : {{tmpDayDetails.day.maxwind_kph}} km/h</p>
              <p>Humidité moyenne : {{tmpDayDetails.day.avghumidity}}% </p>
              <p>Index UV : {{tmpDayDetails.day.uv}}% </p>
            </div>
          </div>
          <div v-if="hourDay" @click="changeDisplayHour()">
            <h4>Prévision pour le {{formateDateFromDateAndHour(tmpDayHourDetails.time)}} à
              {{formatHour(tmpDayHourDetails.time)}} </h4>
            <div>
              <p>{{tmpDayHourDetails.condition.text}}</p>
              <DisplayIcon v-bind:conditionCode="tmpDayHourDetails.condition.code" />
            </div>
            <div>
              <p>Temperature : {{tmpDayHourDetails.temp_c}} C°</p>
              <p>Vitesse du vent : {{tmpDayHourDetails.wind_kph}} km/h</p>
              <p>Direction du vent : {{tmpDayHourDetails.wind_dir}} </p>
              <p>% de pluie : {{tmpDayHourDetails.chance_of_rain}} </p>
              <p>Humidité : {{tmpDayHourDetails.humidity}}% </p>
              <p>Nuages : {{tmpDayHourDetails.cloud}}% </p>
            </div>
          </div>
          <img :src='close' @click='triggerDetails({})' class="iconMenu">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Chart from './Chart.vue';
import DisplayIcon from './DisplayIcon.vue';
import close from '../assets/closemenu.svg';

export default {
  components: {
    Chart,
    DisplayIcon
  },
  name: 'Forecast',
  data() {
    return {
      Chart: Chart,
      DisplayIcon : DisplayIcon,
      close: close,
      displayDetails: false,
      hourDay: false,
      tmpDayDetails: {},
      tmpDayHourDetails: {},
      dataChart: {
        labels: ['0H', '1H', '2H', '3H', '4H', '5H', '6H', '7H', '8H', '9H', '10H', '11H', '12H', '13H', '14H', '15H', '16H', '17H', '18H', '19H', '20H', '21H', '22H', '23H'],
        datasets: [{
          label: 'Temperature en °C',
          data: [],
          borderColor: [
            'rgb(32, 206, 254)'
          ],
          pointBackgroundColor: '#018fb7',
          borderWidth: 1,
          fill: false,
        }]
      },
      chartOptions: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: "#000000",
          }
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              align: 'center',
              value: 'Heures'
            }
          },
          y: {
            display: true,
            title: {
              display: true,
              align: 'center',
              value: '°C'
            }
          },
          suggestedMin: -50,
          suggestedMax: 50
        },
        maintainAspectRatio: false,
        responsive: true,
        onClick: this.handle,
        onHover: this.graphHover,
      }
    }
  },
  watch:{
    getForecastGlobal: function(newValue){
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',newValue)
      this.hourDay = false;
      this.displayDetails =  false;
    }
  },
  computed: {
    getForecastGlobal() {
      return this.$store.state.responseForecast;
    },
    getCityGlobal() {
      return this.$store.state.city;
    }
  },
  methods: {
    triggerDetails(day) {
      console.log(day)
      this.tmpDayDetails = day;
      if (this.displayDetails === true) {
        this.dataChart.data = [];
        this.displayDetails = false;
        this.hourDay = false;
      } else {
        this.tmpDayDetails.hour.map((hour) => {
          console.log('laaaaaaa', hour.temp_c, this.dataChart.datasets)
          this.dataChart.datasets[0].data.push(hour.temp_c)
        })
        this.displayDetails = true;
      }
    },
    handle(point, event) {
      try{
        let item = event[0];
        console.log(item._index, point);
        this.tmpDayHourDetails = this.tmpDayDetails.hour[item._index];
        console.log(this.tmpDayHourDetails);
        this.hourDay = true;
      }
      catch{
        return;
      }
    },
    graphHover(e, array) {
      if (array.length > 0) {
        e.target.style.cursor = 'pointer';
      } else {
        e.target.style.cursor = '';
      }
    },
    changeDisplayHour() {
      if (this.hourDay === true) {
        this.hourDay = false;
      }
    },
    formateDate(date) {
      return date.substring(8) + '/' + date.substring(5).slice(0, 2) + '/' + date.substring(0).slice(0, 4);
    },
    formateDateFromDateAndHour(date) {
      let tempString = '';
      console.log('date', date)
      date = date.slice(0, -6)
      tempString = date.substring(8) + '/' + date.substring(5).substring(0, 2) + '/' + date.substring(0).substring(0, 4);
      console.log(tempString)
      return tempString;
    },
    formatHour(hour) {
      return hour.slice(-5)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#foreCast {
  height: 45vh;
  width: 90vw;
  align-self: center;

  >h3{
    margin-top: 0;
  }

  >div>.threeDays {
    display: flex;
    justify-content: space-evenly;

    >div {
      border: black solid 1px;
      border-radius: 10px;
      margin-right: 2%;
      margin-left: 2%;
      padding: 1%;
      opacity: 1;
      transition: opacity .5s;
      height: 40vh;
      width: 25vw;

      &:hover{
        opacity: 0.5;
        cursor: pointer;
      }

      >div{
        display: flex;
        justify-content: space-around;

        >img{
        max-width: 10vw;
      }
      }
    }
  }

  >div>.oneDay {
    display: flex;
    flex-direction: column;
    margin-top: 1%;
    padding: 1%;
    height: 40vh;

    >div {
      display: flex;
      justify-content: space-around;
      border: black solid 1px;
      border-radius: 10px;
      width: 88vw;
      margin-right: auto;
      margin-left: auto;
      padding: 1%;

      >.responsiveChart {
        width: 65vw;
        height: 35vh !important;
      }

      >div:nth-child(2){
        height: 40vh;
        overflow-y: auto;

        >h4{
          margin-top: 0;
        }

        >div:nth-child(2){
          display: flex;
          justify-content: space-around;
          align-items: center;
          >img{
            max-width: 10vw;
          }
        }

        >div:nth-child(3){
          display: flex;
          justify-content: space-evenly;
          flex-wrap: wrap;

          >p{
            width: 300px;
            max-width: 40%;
          }
        }
      }

      >.iconMenu{
        width: 2vw;
        max-width: 35px !important;
        align-self: flex-start;
        opacity: 1;
        transition: opacity .5s;

        &:hover{
          cursor: pointer;
          opacity: 0.5;
        }
      }
    }
  }
}
</style>
