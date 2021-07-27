<template>
    <img :src='getRightSrc(conditionCode)'>
</template>

<script>
import thunderstormRain from '../assets/weatherIcons/thunderstorms-rain.svg';
import thunderstormSnow from '../assets/weatherIcons/thunderstorms-snow.svg';
import thunderstorm from '../assets/weatherIcons/thunderstorms.svg';
import snow from '../assets/weatherIcons/snow.svg';
import rain from '../assets/weatherIcons/rain.svg';
import partlyCloudySleet from '../assets/weatherIcons/partly-cloudy-day-sleet.svg';
import partlyCloudy from '../assets/weatherIcons/partly-cloudy-day.svg';
import overcast from '../assets/weatherIcons/overcast.svg';
import mist from '../assets/weatherIcons/mist.svg';
import hail from '../assets/weatherIcons/hail.svg';
import fog from '../assets/weatherIcons/fog.svg';
import drizzle from '../assets/weatherIcons/drizzle.svg';
import cloudy from '../assets/weatherIcons/cloudy.svg';
import clearDay from '../assets/weatherIcons/clear-day.svg';

export default {
  name: 'DisplayIcon',
  props: {
        conditionCode: null,
    },
  data(){
    return{
      thunderstormRain: thunderstormRain,
      thunderstormSnow: thunderstormSnow,
      thunderstorm:thunderstorm,
      snow: snow,
      rain: rain,
      partlyCloudySleet: partlyCloudySleet,
      overcast: overcast,
      mist:mist,
      hail:hail,
      fog:fog,
      drizzle:drizzle,
      cloudy:cloudy,
      clearDay: clearDay,
      partlyCloudy: partlyCloudy
    }
  },
  computed:{
    
  },
  methods: {
          getRightSrc(code) {
              switch (code) {
                  case 1000:
                      return this.clearDay;                   
                  case 1006:
                      return this.cloudy;                   
                  case 1009:
                      return this.overcast;                      
                  case 1030:
                      return this.mist                    
                  case 1003:
                      return this.partlyCloudy
                  case 1087:
                      return this.thunderstorm
                  case 1279:
                  case 1282:
                      return this.thunderstormSnow
                  case 1273:
                  case 1276:
                      return this.thunderstormRain
                  case 1135:
                  case 1147:
                      return this.fog
                  case 1237:
                  case 1261:
                  case 1264:
                      return this.hail
                  case 1072:
                  case 1150:
                  case 1153:
                  case 1168:
                  case 1171:
                      return this.drizzle
                  case 1069:
                  case 1204:
                  case 1207:
                  case 1249:
                  case 1252:
                      return this.partlyCloudySleet
                  case 1066:
                  case 1114:
                  case 1117:
                  case 1210:
                  case 1213:
                  case 1216:
                  case 1219:
                  case 1222:
                  case 1225:
                  case 1255:
                  case 1258:
                      return this.snow
                  case 1063:
                  case 1180:
                  case 1183:
                  case 1186:
                  case 1189:
                  case 1192:
                  case 1195:
                  case 1198:
                  case 1201:
                  case 1240:
                  case 1243:
                  case 1246:
                      return this.rain
                  default:
                      break;
              }
      }
    }
  }
</script>
