<template>
  <div id='home'>
    <h1>weatherPlay</h1>
    <p>{{ $t('searchIndication') }}</p>
    <input type="text" v-model="cityTemp" placeholder="Paris, France" />
    <div>
    <div @click="updateCity" v-if='cityTemp != null ' class="buttonSearchAvailable">
      <p>{{ $t('searchButton') }}</p>
    </div>
    <div v-if='cityTemp === null ' class="buttonSearch">
      <p>{{ $t('searchButton') }}</p>
    </div>
    <ButtonLang />
    </div>
    <div>
      <h3>{{ $t('favoritesMessage') }}</h3>
      <DisplayFavorites :key='cityTemp' />
    </div>
    <p>{{ $t('creditsWeatherAPI') }} <a href="https://www.weatherapi.com/" title="Weather API">WeatherAPI.com</a></p>
  </div>
</template>

<script>
import DisplayFavorites from './DisplayFavorites.vue';
import ButtonLang from './ButtonLang.vue';

export default {
  name: 'Home',
  data(){
    return{
      cityTemp: null,
    }
  },
  components:{
    DisplayFavorites,
    ButtonLang
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

    ::placeholder{
      color: white;
    }

    >input{
      border: none;
      border-bottom: white solid 1px;
      background-color: transparent;
      outline: none;
      color: white;
      
      &:focus{
        color: white;
      }

      &:focus::placeholder{
          color: white;
        }
    }

  >div:nth-child(4){
        display: flex;
        justify-content: space-evenly;
        width: 40vw;
        >p{
          text-align: center;
          align-self: center;
          height: 80%;
          vertical-align: middle;
        }
      }

    >div:nth-child(5){
      margin-top: 1%;
      width: 20vw;
      overflow-y: auto;

      >h3{
        margin: 0;
      }

      &::-webkit-scrollbar-track {
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) ;
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
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) ;
        background-color: #555;
      }
    }
  }

.buttonSearch {
    display: flex !important;
    justify-content: space-evenly !important;
    max-width: 15vw !important;
    text-align: center;
    border: #00568f solid 1px;
    margin: 1%;
}

.buttonSearchAvailable {
    display: flex !important;
    justify-content: space-evenly !important;
    max-width: 15vw !important;
    text-align: center;
    border: #00568f solid 1px;
    margin: 1%;
    transition: background-color 0.5s;
    
    &:hover{
        background-color: #245e7f;
        cursor: pointer;
    }
}
</style>
