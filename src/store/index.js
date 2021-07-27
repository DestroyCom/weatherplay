import {
  createStore
} from 'vuex';
const axios = require('axios');

export default createStore({
  state: {
    city: null,
    responseRealtime: null,
    responseForecast: null,
    errorRealtime: null,
    errorForecast: null,
    favoritesCity: [],
    local:null
  },
  getters: {},
  mutations: {
    setCityFromSearchInput(state, newValue) {
      state.city = newValue;
    },
    setFavoritesCity(state) {
      if(localStorage.getItem('favoritesCityWeatherPlay')){
        state.favoritesCity = JSON.parse(localStorage.getItem('favoritesCityWeatherPlay'));
      }
    },
    setLocals(state, local) {
      if(local === 'fr'){
        state.local = 'fr'
      }
      else if(local === 'en'){
        state.local = 'en'
      }
      
    },
    setReponseRealtime(state, rep) {
      state.responseRealtime = rep;
    },
    setReponseForecast(state, rep) {
      state.responseForecast = rep;
    },
  },
  actions: {
    callRealtime({
      commit,
      state
    }, city) {
      let requestURL = ''
      if(state.local === 'fr'){
        requestURL = 'https://api.weatherapi.com/v1/current.json?key=' + process.env.VUE_APP_WEATHER_API_KEY + '&q=' + city + '&aqi=yes&lang=fr';
      }
      else if(state.local === 'en'){
        requestURL = 'https://api.weatherapi.com/v1/current.json?key=' + process.env.VUE_APP_WEATHER_API_KEY + '&q=' + city + '&aqi=yes';
      }
      axios.get(requestURL)
        .then(function (response) {
          commit('setReponseRealtime', response);
        })
        .catch(function (error) {
          location.reload()
          state.errorRealtime = error;
        })
    },
    callForecast({
      state,
      commit
    }, city) {
      let requestURL = ''
      if(state.local === 'fr'){
        requestURL = 'https://api.weatherapi.com/v1/forecast.json?key=' + process.env.VUE_APP_WEATHER_API_KEY + '&q=' + city + '&days=3&aqi=yes&lang=fr';
      }
      else if(state.local === 'en'){
        requestURL = 'https://api.weatherapi.com/v1/forecast.json?key=' + process.env.VUE_APP_WEATHER_API_KEY + '&q=' + city + '&days=3&aqi=yes';
      }
      axios.get(requestURL)
        .then(function (response) {
          commit('setReponseForecast', response);
        })
        .catch(function (error) {
          location.reload()
          state.errorForecast = error;
        })
    },
    addFavoritesCity({
      state,
      commit
    }, city) {
        let temp = state.favoritesCity;
        temp.push(city);
        commit('favoritesCity', temp);
        localStorage.setItem('favoritesCityWeatherPlay', JSON.stringify(state.favoritesCity))
    },
    removeFavoritesCity({
      state,
      commit
    }, city) {
        let temp = state.favoritesCity;
        let indexOfCity = temp.indexOf(city)
        if(indexOfCity > -1){
          temp.splice(indexOfCity, 1);
        }
        commit('favoritesCity', temp);
        localStorage.setItem('favoritesCityWeatherPlay', JSON.stringify(state.favoritesCity));
    },
  },
  modules: {}
})