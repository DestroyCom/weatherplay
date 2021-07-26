<template>
    <nav class="nav close">
        <img :src='menu' @click='displayNav'  v-if='!displayBar' class="iconMenu" >
        <img :src='close' @click='displayNav' v-if='displayBar' class="iconMenu" >
        
        <div class='displayField hidden'>
            <p>Rechercher une ville :</p>
            <input type="text" v-model="cityTemp" placeholder="Paris, France" />
            <p @click="updateCity" v-if='cityTemp != null '>RECHERCHER</p>
            <a href="https://www.weatherapi.com/" title="Free Weather API"><img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" border="0"></a>
        </div>

    </nav>
</template>

<script>
import menu from '../assets/menu.svg';
import close from '../assets/closemenu.svg';

export default {
  name: 'Nav',
  data(){
    return{
      cityTemp: null,
      displayBar: false,
      menu: menu,
      close: close
    }
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
    width: 19vw;
    opacity: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
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
  max-width: 4vw;
  max-height: 4vw;
  margin-left: 0.5vw;

  &:hover {
    cursor: pointer;
  }
}

</style>
