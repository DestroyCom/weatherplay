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
  },
  getters: {},
  mutations: {
    setCityFromSearchInput(state, newValue) {
      state.city = newValue;
    },
    setFavoritesCity(state) {
      console.log('favcity', state.favoritesCity, localStorage.getItem('favoritesCityWeatherPlay'))
      if(localStorage.getItem('favoritesCityWeatherPlay')){
        console.log('localstorage existant')
        state.favoritesCity = JSON.parse(localStorage.getItem('favoritesCityWeatherPlay'));
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
      let requestURL = 'https://api.weatherapi.com/v1/current.json?key=' + process.env.VUE_APP_WEATHER_API_KEY + '&q=' + city + '&aqi=yes&lang=fr';
      axios.get(requestURL)
        .then(function (response) {
          commit('setReponseRealtime', response);
        })
        .catch(function (error) {
          state.errorRealtime = error;
        })
    },
    callForecast({
      state,
      commit
    }, city) {
      let requestURL = 'https://api.weatherapi.com/v1/forecast.json?key=' + process.env.VUE_APP_WEATHER_API_KEY + '&q=' + city + '&days=3&aqi=yes&lang=fr';
      axios.get(requestURL)
        .then(function (response) {
          commit('setReponseForecast', response);
        })
        .catch(function (error) {
          console.log(error);
          state.errorForecast = error;
        })
    },
    addFavoritesCity({
      state,
      commit
    }, city) {
        let temp = state.favoritesCity;
        temp.push(city);
        console.log('favcity', state.favoritesCity)
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
        console.log('favcity', state.favoritesCity)
        localStorage.setItem('favoritesCityWeatherPlay', JSON.stringify(state.favoritesCity));
    },
  },
  modules: {}
})