<template>
  <div class="buttonLang">
    <p v-if="$i18n.locale === 'fr'" @click="switchLang('en')">English version</p>
    <p v-if="$i18n.locale === 'en'" @click="switchLang('fr')">Version française</p>
  </div>
</template>

<script>
export default {
  name: 'ButtonLang',
  data() {
    return {}
  },
  components: {},
  props: {},
  computed: {},
  methods: {
    switchLang(locale) {
      if (this.$i18n.locale !== locale) {
        this.$i18n.locale = locale;
        this.$store.dispatch('updateLocale', locale);
      }
    }
  },
  watch: {},
  mounted() {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.buttonLang {
  display: flex !important;
  justify-content: space-evenly !important;
  height: 80%;
  text-align: center;
  border: #00568f solid 1px;
  margin: 1%;
  align-self: center;
  transition: background-color 0.5s;

  &:hover {
    background-color: #245e7f;
    cursor: pointer;
  }

  @media only screen and (max-width: 1025px) {
    height: 85%;
    min-width: 35vw;
  }

}
</style>
