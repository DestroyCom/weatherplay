<template>
    <p>{{ $t('windDir') }} {{ getRightDir(windDirection) }} </p>
</template>

<script>


export default {
  name: 'DisplayWindDirection',
  props: {
        windDirection: null,
    },
  data(){
    return{}
  },
  computed:{
    
  },
  methods: {
          getRightDir(dir) {
              switch (dir) {
                  case 'N':
                      return this.$t('windDir-N');
                  case 'NNE':
                      return this.$t('windDir-NNE');
                case 'NE':
                      return this.$t('windDir-NE');
                  case 'ENE':
                      return this.$t('windDir-ENE');
                    case 'E':
                      return this.$t('windDir-E');
                    case 'ESE':
                      return this.$t('windDir-ESE');
                  case 'SE':
                      return this.$t('windDir-SE');
                  case 'SSE':
                      return this.$t('windDir-SSE');
                  case 'S':
                      return this.$t('windDir-S');
                  case 'SSW':
                      return this.$t('windDir-SSW');
                  case 'SW':
                      return this.$t('windDir-SW');
                  case 'WSW':
                      return this.$t('windDir-WSW');
                  case 'W':
                      return this.$t('windDir-W');
                  case 'WNW':
                      return this.$t('windDir-WNW');
                  case 'NW':
                      return this.$t('windDir-NW');
                  case 'NNW':
                      return this.$t('windDir-NNW');
                  default:
                      break;
              }
      }
    }
  }
</script>