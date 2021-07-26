<template>
  <div id='home'>
    <h1>weatherPlay</h1>
    <p>Rechercher une ville :</p>
    <input type="text" v-model="cityTemp" placeholder="Paris, France" />
    <p @click="updateCity" v-if='cityTemp != null '>RECHERCHER</p>
    <div>
      <h3>Vos favoris :</h3>
      <DisplayFavorites :key='cityTemp' />
    </div>
    <p>Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a></p>
  </div>
</template>

<script>
import DisplayFavorites from './DisplayFavorites.vue';

export default {
  name: 'Home',
  data(){
    return{
      cityTemp: null,
    }
  },
  components:{
    DisplayFavorites
  },
  computed:{
  },
  methods:{
    updateCity(){
      this.$store.commit('setCityFromSearchInput', this.cityTemp);
      this.$store.dispatch('callRealtime', this.cityTemp);
      this.$store.dispatch('callForecast', this.cityTemp);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #home{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;

    >div{
      width: 20vw;
    }
  }
</style>
