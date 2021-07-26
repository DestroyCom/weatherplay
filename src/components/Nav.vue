<template>
    <nav class="nav close">
        <img :src='menu' @click='displayNav'  v-if='!displayBar' class="iconMenu" >
        <img :src='close' @click='displayNav' v-if='displayBar' class="iconMenu" >
        <img :src='search' @click='displayNav' v-if='!displayBar' class="iconMenu" >
        <img :src='star' @click='displayNav' v-if='!displayBar' class="iconMenu" >
        
        <div class='displayField hidden'>
          <h1>weatherPlay</h1>
          <div>
            <p>Rechercher une ville :</p>
            <input type="text" v-model="cityTemp" placeholder="Paris, France" />
            <p @click="updateCity" v-if='cityTemp != null '>RECHERCHER</p>
          </div>
          <div>
            <h4>Vos favoris:</h4>
            <DisplayFavorites :key='getCityGlobal' />
          </div>
          <p>Powered by</p>
          <a href="https://www.weatherapi.com/" title="Free Weather API"><img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0"></a>
        </div>

    </nav>
</template>

<script>
import menu from '../assets/menu.svg';
import close from '../assets/closemenu.svg';
import search from '../assets/search.svg';
import star from '../assets/star.svg';
import DisplayFavorites from './DisplayFavorites.vue';

export default {
  name: 'Nav',
  data(){
    return{
      cityTemp: null,
      displayBar: false,
      menu: menu,
      close: close,
      search:search,
      star:star
    }
  },
  components:{
    DisplayFavorites
  },
  computed:{
    getCityGlobal(){
      return this.$store.state.city;
    },
    getRealtimeGlobal(){
      return this.$store.state.responseRealtime;
    },
  },
  methods:{
    updateCity(){
      this.$store.commit('setCityFromSearchInput', this.cityTemp);
      this.$store.dispatch('callRealtime', this.cityTemp);
      this.$store.dispatch('callForecast', this.cityTemp);
    },
    displayNav(){
        if(this.displayBar === false){
            document.querySelector('.nav').classList.remove('close');
            document.querySelector('.displayField').classList.remove('hidden');
            document.querySelector('.nav').classList.add('open');
            this.displayBar = true;
        }
        else if(this.displayBar === true){
            document.querySelector('.nav').classList.remove('open');
            document.querySelector('.nav').classList.add('close');
            document.querySelector('.displayField').classList.add('hidden');
            this.displayBar = false;
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
nav {
  position: fixed;
  z-index: 100;
  height: 100vh;
  width: 5vw;
  display: flex;
  flex-direction: column;
  transition: width 0.2s, opacity 1.5s;
  border-right: grey solid 1px;
  background-color: white;
  overflow: hidden;

  >.displayField {
    height: 85vh;
    width: 19vw;
    opacity: 1;
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;

    >div:nth-child(3) {
      text-align: center;
      width: 75vh;
      overflow-x: auto;
      width: 100%;

      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #F5F5F5;
      }

      &::-webkit-scrollbar {
        width: 12px;
        background-color: #F5F5F5;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #555;
      }
    }
  }
}

.open {
  width: 20vw;
}

.hidden {
  display: none;
  opacity: 0 !important;
}

.iconMenu {
  width: 4vw;
  max-width: 60px !important;
  height: 4vw;
  max-height: 60px !important;
  align-self: center;
  opacity: 1;
  transition: opacity .5s;
  margin-top: 1vh;
  margin-bottom: 5vh;

  &:hover {
    cursor: pointer;
    opacity: 0.5;
  }
}
</style>
