<template>
  <section id='realTime' v-if="getRealtimeGlobal !== null">
      <div>
        <div>
          <h3>{{getRealtimeGlobal.data.location.name + ', ' + getRealtimeGlobal.data.location.region + ', ' + getRealtimeGlobal.data.location.country }}</h3> 
          <img :src="starRegular" v-if="whichStar === 'inactive'" @click="updateFav" :title="$t('addFavorite')" >
          <img :src="starSolid" v-if="whichStar === 'active'" @click="updateFav" :title="$t('removeFavorite')" >
        </div>
          <div>
            <p>{{ $t('lastUpdate') }} {{ getRealtimeGlobal.data.current.last_updated }}</p>
            <img :src='refresh' @click='refreshResult' class="invert">
            <ButtonLang />
          </div>
      </div>
      <div>
          <div> 
                <DisplayIcon v-bind:conditionCode="getRealtimeGlobal.data.current.condition.code" />
                <p> {{getRealtimeGlobal.data.current.condition.text}} </p>
          </div>
          <div>
              <h4>{{ $t('actualWeather') }}</h4>
              <p v-if="$i18n.locale === 'fr'">{{ $t('temp') }} {{getRealtimeGlobal.data.current.temp_c}}  {{ $t('tempUnit') }}</p>
              <p v-if="$i18n.locale === 'fr'">{{ $t('windSpeed') }} {{getRealtimeGlobal.data.current.wind_kph}} {{ $t('speedUnit') }}</p>
              <p v-if="$i18n.locale === 'en'">{{ $t('temp') }} {{getRealtimeGlobal.data.current.temp_f}}  {{ $t('tempUnit') }}</p>
              <p v-if="$i18n.locale === 'en'">{{ $t('windSpeed') }} {{getRealtimeGlobal.data.current.wind_mph}} {{ $t('speedUnit') }}</p>
              <p>{{ $t('windDir') }} {{getRealtimeGlobal.data.current.wind_dir}} </p>
              <p>{{ $t('humidity') }} {{getRealtimeGlobal.data.current.humidity}}% </p>
              <p>{{ $t('cloud') }} {{getRealtimeGlobal.data.current.cloud}}% </p>
          </div>
      </div>
  </section>
</template>

<script>
import refresh from '../assets/refresh.svg';
import starRegular from '../assets/starRegular.svg';
import starSolid from '../assets/starSolid.svg';
import DisplayIcon from './DisplayIcon.vue';
import ButtonLang from './ButtonLang.vue';

export default {
  components:{
    DisplayIcon,
    ButtonLang
  },
  name: 'Realtime',
  data(){
    return{
      refresh: refresh,
      starRegular: starRegular,
      starSolid: starSolid,
      whichStar: 'inactive',
    }
  },
  computed:{
    getRealtimeGlobal(){
      return this.$store.state.responseRealtime;
    },
    getCityGlobal(){
      return this.$store.state.city;
    },
    getFavorites(){
      return this.$store.state.favoritesCity;
    },
  },
  methods:{
    refreshResult(){
      this.$store.dispatch('callRealtime', this.getCityGlobal);
      this.$store.dispatch('callForecast', this.getCityGlobal);
    },
    updateFav(){
      if(this.whichStar === 'active'){
        this.$store.dispatch('removeFavoritesCity', this.getCityGlobal, false);
        this.whichStar = 'inactive';
      }
      else{
        this.$store.dispatch('addFavoritesCity', this.getCityGlobal, true);
        this.whichStar = 'active';
      }
    }
  },
  watch:{
    getRealtimeGlobal: function(newValue){
      if(this.$store.state.favoritesCity.find(el => el.toLowerCase()=== newValue.data.location.name.toLowerCase())){
        this.whichStar = 'active';
      }
    },
    getCityGlobal: function(newValue){
      if(this.$store.state.favoritesCity.find(el => el.toLowerCase()=== newValue.toLowerCase())){
        this.whichStar = 'active';
      }else{
        this.whichStar = 'inactive';
      }
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#realTime {
  margin-top: 1vh;
  height: 48vh;
  width: 90vw;
  display: flex;
  flex-direction: column;
  align-self: center;
  overflow: hidden;

  >div {
    &:nth-child(1) {
      display: flex;
      justify-content: space-between;
      align-items: center;

      >img {
        max-width: 4vw;

        &:hover{
          cursor: pointer;
        }
      }

      div {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
        width: 40vw;

        >img {
          width: 2vw;
          max-width: 35px !important;
          min-width: 30px;
          opacity: 1;
          transition: opacity 0.5s;
          margin: 1%;

          &:hover {
            cursor: pointer;
            animation: rotation 2s infinite alternate linear;
            opacity: 0.5;
          }
        }
      }

      >div:nth-child(2){
        >p{
          min-width: 25vw;
          text-align: center;
        }
      }

    }

    &:nth-child(2) {
      display: flex;
      justify-content: space-around;
      border: black solid 1px;
      border-radius: 10px;
      margin: 1%;
      background-color: #01497c;

      >div {

        &:nth-child(1),
        &:nth-child(2) {
          margin-top: auto;
          margin-bottom: auto;
          display: flex;
          flex-direction: column;
          width: 15vw;
        }

        &:nth-child(1)>img {
          max-width: 75%;
          align-self: center;
        }

        &:nth-child(2)>p {
          margin: 3.5%;
          min-width: 20vw;
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

.invert{
  filter: invert(100%);
}
</style>
