<template>
  <section id='realTime' v-if="getRealtimeGlobal !== null">
      <div>
          <h3>{{getRealtimeGlobal.data.location.name + ', ' + getRealtimeGlobal.data.location.region + ', ' + getRealtimeGlobal.data.location.country }}</h3>
          <div>
            <p>Derniere mise à jour : {{ getRealtimeGlobal.data.current.last_updated }}</p>
            <img :src='refresh' @click='refreshResult'>
          </div>
      </div>
      <div>
          <div> 
                <img :src='getRealtimeGlobal.data.current.condition.icon' />
                <p> {{getRealtimeGlobal.data.current.condition.text}} </p>
          </div>
          <div>
              <p>Temperature : {{getRealtimeGlobal.data.current.temp_c}}  C°</p>
              <p>Vitesse du vent : {{getRealtimeGlobal.data.current.wind_kph}} km/h</p>
              <p>Direction du vent : {{getRealtimeGlobal.data.current.wind_dir}} </p>
              <p>Humidité : {{getRealtimeGlobal.data.current.humidity}}% </p>
              <p>Nuages : {{getRealtimeGlobal.data.current.cloud}}% </p>
          </div>
      </div>
  </section>
</template>

<script>
import refresh from '../assets/refresh.svg';

export default {
  name: 'Realtime',
  data(){
    return{
      refresh: refresh
    }
  },
  computed:{
    getRealtimeGlobal(){
      return this.$store.state.responseRealtime;
    },
    getCityGlobal(){
      return this.$store.state.city;
    },
  },
  methods:{
    refreshResult(){
      this.$store.dispatch('callRealtime', this.getCityGlobal);
      this.$store.dispatch('callForecast', this.getCityGlobal);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#realTime {
  margin-top: 1vh;
  height: 50vh;
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-self: center;
  z-index: 1;
  > div {
    &:nth-child(1) {
      display: flex;
      justify-content: space-between;
      align-items: center;

      
      div{
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 30vw;
      >img{
        width: 2vw;
        min-width: 30px;
        opacity: 1;
        transition: opacity 0.5s;

        &:hover{
          cursor: pointer;
          animation: rotation 2s infinite alternate linear;
          opacity: 0.5;
        }
      }
      }

    }

    &:nth-child(2) {
      display: flex;
      justify-content: space-around;
      border: black solid 1px;
      border-radius: 10px;
      padding: 2%;

      > div {
        &:nth-child(1), &:nth-child(2) {
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(359deg);
  }
}
</style>
