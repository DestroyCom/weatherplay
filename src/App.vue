<template>
  <div>
    <Nav v-if="getCityGlobal != null" />
    <div>
      <Home v-if="getCityGlobal === null" />
      <Realtime v-if="getCityGlobal != null" />
      <Forecast v-if="getCityDouble != null" />
    </div>
  </div>
</template>

<script>
import Home from './components/Home.vue';
import Nav from './components/Nav.vue';
import Realtime from './components/Realtime.vue';
import Forecast from './components/Forecast.vue';

export default {
  name: 'App',
  data() {
    return {
      tempCity: null,
    }
  },
  components: {
    Home,
    Nav,
    Realtime,
    Forecast,
  },
  computed: {
    getCityGlobal() {
      return this.$store.state.city;
    },
    getCityDouble() {
      return this.$store.state.city;
    }
  },
  mounted() {
    this.$store.commit('setFavoritesCity');
    this.$store.commit('setLocals', this.$i18n.locale);
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap');
html,
body {
  margin: 0;
  padding: 0;
  //background-color: #011728; 
}

#app {
  background-color: #011728;
  font-family: 'Comfortaa', Avenir, Helvetica, Arial, sans-serif;
  color: white;
  margin: 0;
  padding: 0;
  width: 100%;

  >div {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;

    >div {
      margin-left: 5vw;
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    @media only screen and (max-width: 1025px) {
      height: auto;
    }
  }
}
</style>
