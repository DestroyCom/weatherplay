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
  data(){
    return{
      tempCity : null,
    }
  },
  components: {
    Home,
    Nav,
    Realtime,
    Forecast,
  },
  computed:{
    getCityGlobal(){
      console.log('appel affichage ville')
      console.log(this.$store.state.city)
      return this.$store.state.city;
    },
    getCityDouble(){
      return this.$store.state.city;
    }
  }
}
</script>

<style lang="scss">
html, body{
  margin: 0;
  padding: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100vh;

  >div {
    display: flex;
    justify-content: flex-start;
    width: 100%;
    height: 100vh;

    >div{
      margin-left: 5vw;
      width: 100vw;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
}


</style>
