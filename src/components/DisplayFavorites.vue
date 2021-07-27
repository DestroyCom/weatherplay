<template>
  <section id='favorites'>
      <a v-for="city, index in getFavorites" :key='city' @click="goToCityFav(city)">
          <img :src="starSolid">
          <p> {{city}} </p>
          <DisplayIcon v-bind:conditionCode="codeCondition[index]" v-show="callFrom === nav" />
      </a>
  </section>
</template>

<script>
const axios = require('axios');
import starSolid from '../assets/starSolid.svg';
import DisplayIcon from './DisplayIcon.vue';

export default {
  name: 'DisplayFavorites',
  data(){
    return{
        starSolid:starSolid,
        codeCondition: [],
        nav: 'nav'
      }
  },
  components:{
      DisplayIcon
  },
  props: {
        callFrom: null,
    },
  computed:{
    getFavorites(){
      return this.$store.state.favoritesCity;
    }
  },
  methods:{
    goToCityFav(city){
      this.$store.commit('setCityFromSearchInput', city);
      this.$store.dispatch('callRealtime', city);
      this.$store.dispatch('callForecast', city);
    }
  },
  watch:{},
  mounted() {
      this.getFavorites.map((city) => {
          let tempValue = this.codeCondition
          let requestURL = 'https://api.weatherapi.com/v1/current.json?key=' + process.env.VUE_APP_WEATHER_API_KEY + '&q=' + city + '&aqi=no';
          axios
              .get(requestURL)
              .then(function (response) {
                  tempValue.push(response.data.current.condition.code)
              })
              .catch(function (error) {
                  console.log(error)
              })

          this.codeCondition = tempValue
      })
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#favorites{
display: flex;
flex-direction: column;
width: 95%;
margin-top: 5vh ;
margin-bottom: 5vh;

  a{
    border-bottom: black solid 1px;
    display: flex;
    justify-content: space-between;
    opacity: 1;
    transition: opacity 0.5s;

    &:hover{
      cursor: pointer;
      opacity: 0.5;
    }

    >img:nth-child(1){
      max-width: 15%;
    }

    >img:nth-child(3){
      max-width: 25%;
    }
  }
}
</style>
