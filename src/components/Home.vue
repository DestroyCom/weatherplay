<template>
  <div id='home'>
    <h1>weatherPlay</h1>
    <p>Rechercher une ville :</p>
    <input type="text" v-model="cityTemp" placeholder="Paris, France" />
    <p @click="updateCity" v-if='cityTemp != null '>RECHERCHER</p>
    <p>Powered by <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a></p>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return{
      cityTemp: null,
    }
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
    width: 95vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
