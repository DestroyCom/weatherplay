# weatherPlay

weatherPlay is a web application made with Vue, used to display the weather of a requested city.
In the app the default language is french.

This project was developed with Vue3 including Vue-cli, vue3-chart-v2, vue I18n, Vuex, axios, weatherapi and normalize.css .

[DEMO.](#demo)

[Launch it yourself.](#run-it-via-localhost)

## What does this project use:
- Vue CLI, allows you to start a Vue app quickly. https://cli.vuejs.org/
- Vue3 Chart V2, a wrapper for Chart.js in vue 3. https://vue3-chart-v2.netlify.app/
- Vue I18N, a  Internationalization plugin for Vue.js. https://kazupon.github.io/vue-i18n/
- axios, a Promise based HTTP client for the browser and node.js. https://axios-http.com/
- weatherapi, is used to get the weather datas. https://www.weatherapi.com/

## Run it via localhost
You can start this project in a few steps :
1. Clone this directory,
2. run the command ```npm install ```,
3. Then rename the file ```'.env.dist'``` into ```'.env'```,
4. You will need a https://www.weatherapi.com/ account to get a API key,
5. Once you have your accounts, replace the variables in the ```'.env'``` with your own.
6. You can now launch it :
    - in development mode: with the command ```npm run serve ```
    - or create a build : with the command ```npm run build ```

#### Précisions

- The development mode launches a server locally on your machine at [http://localhost:8080](http://localhost:8080), the page will refresh on updates.
- The build, will create a folder ```'build'``` containing the site ready for use on any server, the file size is minimized.

## Demo

A demo is available on : https://weatherplay.netlify.app/ .