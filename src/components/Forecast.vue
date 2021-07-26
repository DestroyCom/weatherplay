<template>
  <section id='foreCast' v-if="getForecastGlobal !== null">
      <h3 v-if="!displayDetails" >Prévision des 3 prochains jours</h3>
      <div>
        <div v-if="!displayDetails">
          <div v-for="(day) in getForecastGlobal.data.forecast.forecastday" :key='day.date_epoch' @click="triggerDetails(day)" >
              <h4> {{day.date}} </h4>
              <img :src='day.day.condition.icon' />
              <p> {{day.day.condition.text}} </p>
              <p>Température moyenne : {{day.day.avgtemp_c}} C° </p>
              <p>Vitesse maximum du vent : {{day.day.maxwind_kph}} km/h </p>
          </div>
        </div>
        <div v-if="displayDetails" @click="triggerDetails({})">
          <h3>Prévision pour le {{tmpDayDetails.date}}</h3>
          <Chart :v-bind='dataChart' />
          <div>
              <div>
              <p>{{tmpDayDetails.day.condition.text}}</p>
              <img :src="tmpDayDetails.day.condition.icon" >
              <p>Temperature : {{tmpDayDetails.day.avgtemp_c}}  C°</p>
              <p>Vitesse maximum du vent : {{tmpDayDetails.day.maxwind_kph}} km/h</p>
              <p>Humidité : {{tmpDayDetails.day.avghumidity}}% </p>
              <p>Index UV : {{tmpDayDetails.day.uv}}% </p>
          </div>
          </div>
        </div>
      </div>
  </section>
</template>

<script>
import Chart from './Chart.vue';

export default {
  components: { Chart },
  name: 'Forecast',
  data(){
    return{
      Chart: Chart,
      displayDetails: false,
      tmpDayDetails:{},
      dataChart:{
        labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
        datasets: [{
            label: 'Temperature',
            data: [],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    }
    }
  },
  computed:{
    getForecastGlobal(){
      return this.$store.state.responseForecast;
    }, 
    getCityGlobal(){
      return this.$store.state.city;
    },
  },
  methods:{
    triggerDetails(day){
      console.log(day)
      this.tmpDayDetails = day;
      if (this.displayDetails === true){
        this.dataChart.data = [];
        this.displayDetails = false;
      }
      else{
        this.tmpDayDetails.hour.map((hour)=>{
          console.log('laaaaaaa',hour.temp_c, this.dataChart.datasets)
          this.dataChart.datasets[0].data.push(hour.temp_c) 
        })
        this.displayDetails = true;
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#foreCast {
  height: 50vh;
  width: 90vw;
  align-self: center;
  z-index: 1;

  >div>div{
    display: flex;
    justify-content: space-evenly;

    >div{
      border: black solid 1px;
      border-radius: 10px;
      margin-right: 2%;
      margin-left: 2%;
      padding: 1%;
    }
  }
}
</style>
