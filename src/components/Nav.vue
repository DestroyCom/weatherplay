<template>
    <nav class="nav close">
      <img :src='menu' @click='displayNav' v-if='!displayBar' class="iconMenu">
      <img :src='close' @click='displayNav' v-if='displayBar' class="iconMenu">
      <img :src='search' @click='displayNav' v-if='!displayBar' class="iconMenu">
      <img :src='star' @click='displayNav' v-if='!displayBar' class="iconMenu">

      <div class='displayField hidden'>
        <h1>weatherPlay</h1>
        <div>
          <p>{{ $t('searchIndication') }}</p>
          <input type="text" v-model="cityTemp" :placeholder="$t('searchRecommandation')" />
          <p @click="updateCity" v-if='cityTemp != null ' class="buttonSearchAvailable">{{ $t('searchButton') }}</p>
          <p v-if='cityTemp === null ' class="buttonSearch">{{ $t('searchButton') }}</p>
        </div>
        <div>
          <h4>{{ $t('favoritesMessage') }}</h4>
          <DisplayFavorites :key='getCityGlobal' v-bind:callFrom="nav" />
        </div>
        <p>{{ $t('creditsWeatherAPI') }}</p>
        <a href="https://www.weatherapi.com/" title="Free Weather API"><img
            src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com"
            border="0"></a>
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
  data() {
    return {
      cityTemp: null,
      displayBar: false,
      menu: menu,
      close: close,
      search: search,
      star: star,
      nav: 'nav'
    }
  },
  components: {
    DisplayFavorites
  },
  computed: {
    getCityGlobal() {
      return this.$store.state.city;
    },
    getRealtimeGlobal() {
      return this.$store.state.responseRealtime;
    },
  },
  watch:{
    getRealtimeGlobal: function(){
      if (this.displayBar === true) {
        document.querySelector('.nav').classList.remove('open');
        document.querySelector('.nav').classList.add('close');
        document.querySelector('.displayField').classList.add('hidden');
        this.displayBar = false;
      }
    }
  },
  methods: {
    updateCity() {
      this.$store.commit('setCityFromSearchInput', this.cityTemp);
      this.$store.dispatch('callRealtime', this.cityTemp);
      this.$store.dispatch('callForecast', this.cityTemp);
    },
    displayNav() {
      if (this.displayBar === false) {
        document.querySelector('.nav').classList.remove('close');
        document.querySelector('.displayField').classList.remove('hidden');
        document.querySelector('.nav').classList.add('open');
        this.displayBar = true;
      } else if (this.displayBar === true) {
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
  background-color: #01243d;
  overflow: hidden;

  img {
    filter: invert(100%);
  }

  >.displayField {
    height: 85vh;
    width: 19vw;
    opacity: 1;
    display: flex;
    flex-direction: column;
    align-self: center;
    align-items: center;
    text-align: center;

    >h1 {
      margin: 0;
    }

    >div:nth-child(2) {

      ::placeholder {
        color: white;
        opacity: 0.5;
      }

      >input {
        border: none;
        border-bottom: white solid 1px;
        background-color: transparent;
        outline: none;
        color: white;

        &:focus {
          color: white;
        }

        &:focus::placeholder {
          color: white;
        }
      }
    }

    >div:nth-child(3) {
      text-align: center;
      width: 75vh;
      overflow-x: auto;
      width: 100%;

      &::-webkit-scrollbar-track {
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        border-radius: 10px;
        background-color: #01243d;
      }

      &::-webkit-scrollbar {
        width: 12px;
        background-color: #01243d;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
        -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
        background-color: #FFFFFF;
      }

      @media only screen and (max-width: 1025px) {
        width: 50vw;
      }
    }
  }

  @media only screen and (max-width: 1025px) {
    width: 10vw;
    height: auto;
  }
}

.open {
  width: 20vw;

  @media only screen and (max-width: 1025px) {
    width: 65vw;
    height: 100vh;
    overflow: hidden;
  }
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

  @media only screen and (max-width: 1025px) {
    width: 8vw;
    height: auto;
  }
}

.buttonSearch {
  display: flex !important;
  justify-content: space-evenly !important;
  max-width: 15vw;
  text-align: center;
  border: #00568f solid 1px;
  margin-top: 5%;
  align-self: center;
  margin-left: auto;
  margin-right: auto;

  @media only screen and (max-width: 1025px) {
    max-width: 35vw;
  }
}

.buttonSearchAvailable {
  display: flex !important;
  justify-content: space-evenly !important;
  max-width: 15vw;
  text-align: center;
  border: #00568f solid 1px;
  margin-top: 5%;
  transition: background-color 0.5s;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background-color: #245e7f;
    cursor: pointer;
  }

  @media only screen and (max-width: 1025px) {
    max-width: 35vw;
  }
}
</style>
