<template>
  <section id='foreCast' v-if="getForecastGlobal !== null">
    <h3 v-if="!displayDetails">{{ $t('forecastMsg') }}</h3>
    <div>
      <div v-if="!displayDetails" class="threeDays">
        <div v-for="(day) in getForecastGlobal.data.forecast.forecastday" :key='day.date_epoch'
          @click="triggerDetails(day)">
          <h4> {{formateDate(day.date)}} </h4>
          <div>
            <DisplayIcon v-bind:conditionCode="day.day.condition.code" />
            <p> {{day.day.condition.text}} </p>
          </div>
          <p v-if="$i18n.locale === 'fr'">{{ $t('avgTemp') }} {{day.day.avgtemp_c}} {{ $t('tempUnit') }} </p>
          <p v-if="$i18n.locale === 'fr'">{{ $t('maxWindSpeed') }} {{day.day.maxwind_kph}} {{ $t('speedUnit') }} </p>
          <p v-if="$i18n.locale === 'en'">{{ $t('avgTemp') }} {{day.day.avgtemp_c}} °C / {{day.day.avgtemp_f}} {{ $t('tempUnit') }} </p>
          <p v-if="$i18n.locale === 'en'">{{ $t('maxWindSpeed') }} {{day.day.maxwind_kph}} km/h / {{day.day.maxwind_mph}} {{ $t('speedUnit') }} </p>
        </div>
      </div>
      <div v-if="displayDetails" class="oneDay">
        <div>
          <div class="responsiveChart">
            <Chart v-bind:chartData='dataChart' v-bind:chartOptions="chartOptions" style="width:100%;height:100%;" />
            <p style="text-align: center">{{ $t('chartIndication') }}</p>
          </div>
          <div v-if="!hourDay">
            <h4>{{ $t('summaryWeather') }} {{ formateDate(tmpDayDetails.date) }}</h4>
            <div>
              <p>{{tmpDayDetails.day.condition.text}}</p>
              <DisplayIcon v-bind:conditionCode="tmpDayDetails.day.condition.code" />
            </div>
            <div>
              <p v-if="$i18n.locale === 'fr'">{{ $t('avgTemp') }} {{tmpDayDetails.day.avgtemp_c}} {{ $t('tempUnit') }}
              </p>
              <p v-if="$i18n.locale === 'fr'">{{ $t('maxWindSpeed') }} {{tmpDayDetails.day.maxwind_kph}}
                {{ $t('speedUnit') }}</p>
              <p v-if="$i18n.locale === 'en'">{{ $t('avgTemp') }} {{tmpDayDetails.day.avgtemp_c}} °C | {{tmpDayDetails.day.avgtemp_f}} {{ $t('tempUnit') }}
              </p>
              <p v-if="$i18n.locale === 'en'">{{ $t('maxWindSpeed') }} {{tmpDayDetails.day.maxwind_kph}} km/h | {{tmpDayDetails.day.maxwind_mph}}
                {{ $t('speedUnit') }}</p>
              <p>{{ $t('avgHumidity') }} {{tmpDayDetails.day.avghumidity}}% </p>
              <p>{{ $t('UVindex') }} {{tmpDayDetails.day.uv}}% </p>
            </div>
          </div>
          <div v-if="hourDay" @click="changeDisplayHour()">
            <h4>{{ $t('forecastMsgSingleDayOne') }} {{formateDateFromDateAndHour(tmpDayHourDetails.time)}}
              {{ $t('forecastMsgSingleDayTwo') }}
              {{formatHour(tmpDayHourDetails.time)}} </h4>
            <div>
              <p>{{tmpDayHourDetails.condition.text}}</p>
              <DisplayIcon v-bind:conditionCode="tmpDayHourDetails.condition.code" />
            </div>
            <div>
              <p v-if="$i18n.locale === 'fr'">{{ $t('temp') }} {{tmpDayHourDetails.temp_c}} °C</p>
              <p v-if="$i18n.locale === 'en'">{{ $t('temp') }} {{tmpDayHourDetails.temp_c}} °C | {{tmpDayHourDetails.temp_f}} °F</p>
              <p v-if="$i18n.locale === 'fr'">{{ $t('windSpeed') }} {{tmpDayHourDetails.wind_kph}} km/h</p>
              <p v-if="$i18n.locale === 'en'">{{ $t('windSpeed') }} {{tmpDayHourDetails.wind_kph}} km/h | {{tmpDayHourDetails.wind_mph}} mph</p>
              <DisplayWindDirection v-bind:windDirection="tmpDayHourDetails.wind_dir" />
              <p>{{ $t('rainProbability') }} {{tmpDayHourDetails.chance_of_rain}} </p>
              <p>{{ $t('humidity') }} {{tmpDayHourDetails.humidity}}% </p>
              <p>{{ $t('cloud') }} {{tmpDayHourDetails.cloud}}% </p>
            </div>
          </div>
          <img :src='close' @click='triggerDetails({})' class="iconMenu invert">
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Chart from './Chart.vue';
import DisplayIcon from './DisplayIcon.vue';
import close from '../assets/closemenu.svg';
import DisplayWindDirection from './DisplayWindDirection.vue';

export default {
  components: {
    Chart,
    DisplayIcon,
    DisplayWindDirection
  },
  name: 'Forecast',
  data() {
    return {
      Chart: Chart,
      DisplayIcon: DisplayIcon,
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
            fontColor: "#FFFFFF",
          }
        },
        scales: {
          yAxes: [{
            display: true,
            title: {
              display: true,
              align: 'center',
              value: '°C'
            },
            ticks: {
              fontColor: 'white'
            },
          }],
          xAxes: [{
            display: true,
            title: {
              display: true,
              align: 'center',
              value: 'Heures'
            },
            ticks: {
              fontColor: 'white'
            },
          }]
        },
        maintainAspectRatio: false,
        responsive: true,
        onClick: this.handle,
        onHover: this.graphHover,
      }
    }
  },
  watch: {
    getForecastGlobal: function () {
      this.hourDay = false;
      this.displayDetails = false;
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
      this.tmpDayDetails = day;
      if (this.displayDetails === true) {
        this.dataChart.data = [];
        this.displayDetails = false;
        this.hourDay = false;
      } else {
        this.tmpDayDetails.hour.map((hour) => {
          this.dataChart.datasets[0].data.push(hour.temp_c)
        })
        this.displayDetails = true;
      }
    },
    handle(point, event) {
      try {
        let item = event[0];
        this.tmpDayHourDetails = this.tmpDayDetails.hour[item._index];
        this.hourDay = true;
      } catch {
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
      date = date.slice(0, -6)
      tempString = date.substring(8) + '/' + date.substring(5).substring(0, 2) + '/' + date.substring(0).substring(0, 4);
      return tempString;
    },
    formatHour(hour) {
      if (this.$i18n.locale === 'en') {
        if (parseInt(hour.slice(-5).substring(0, 2)) > 12) {
          let hourTemp = parseInt(hour.slice(-5).substring(0, 2));
          hourTemp = hourTemp - 12
          hourTemp = hourTemp.toString()
          return hourTemp + ':' + hour.slice(-2) + ' PM'
        } else {
          return hour.slice(-5) + ' AM'
        }
      }
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

  >h3 {
    margin-top: 0;
  }

  >div>.threeDays {
    display: flex;
    justify-content: space-evenly;

    >div {
      border: black solid 1px;
      background-color: #01497c;
      border-radius: 10px;
      margin-right: 2%;
      margin-left: 2%;
      padding: 1%;
      opacity: 1;
      transition: opacity .5s;
      height: 40vh;
      width: 25vw;

      &:hover {
        opacity: 0.5;
        cursor: pointer;
      }

      >div {
        display: flex;
        justify-content: space-around;

        >img {
          max-width: 10vw;
        }
      }

      @media only screen and (max-width: 1025px) {
        width: 82vw;
        height: 100%;
        margin-top: 2%;
      }
    }

    @media only screen and (max-width: 1025px) {
      flex-direction: column;
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
      background-color: #01497c;
      border-radius: 10px;
      width: 88vw;
      margin-right: auto;
      margin-left: auto;
      padding: 1%;

      >.responsiveChart {
        width: 65vw;
        height: 35vh;

        >div {
          @media only screen and (max-width: 1025px) {
            height: auto !important;
          }
        }

        @media only screen and (max-width: 1025px) {
          width: 80vw;
          height: auto;
        }
      }

      >div:nth-child(2) {
        height: 40vh;
        overflow-y: auto;

        &::-webkit-scrollbar-track {
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          border-radius: 10px;
          background-color: #01497c;
        }

        &::-webkit-scrollbar {
          width: 12px;
          background-color: #01497c;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
          background-color: #FFFFFF;
        }

        >h4 {
          margin-top: 0;
        }

        >div:nth-child(2) {
          display: flex;
          justify-content: space-around;
          align-items: center;

          >img {
            max-width: 10vw;
          }
        }

        >div:nth-child(3) {
          display: flex;
          justify-content: space-evenly;
          flex-wrap: wrap;

          >p {
            width: 300px;

            @media only screen and (max-width: 1025px) {
              width: 200px;
            }
          }
        }
      }

      >.iconMenu {
        width: 2vw;
        max-width: 35px !important;
        align-self: flex-start;
        opacity: 1;
        transition: opacity .5s;

        &:hover {
          cursor: pointer;
          opacity: 0.5;
        }

        @media only screen and (max-width: 1025px) {
          width: 8vw;
          height: auto;
          align-self: flex-end;
        }
      }

      @media only screen and (max-width: 1025px) {
        height: auto;
        display: flex;
        flex-direction: column-reverse;
        width: 83vw;
        height: auto;
        margin-left: 0;
      }
    }

    @media only screen and (max-width: 1025px) {
      height: auto;
    }
  }

  @media only screen and (max-width: 1025px) {
    height: auto;
    margin-left: 6vw;
  }
}

.invert {
  filter: invert(100%);
}
</style>
