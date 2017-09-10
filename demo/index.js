import Vue from 'vue';
import Demo from './views/Demo.vue';
import VueTimeline from "../src";
Vue.use( VueTimeline );

new Vue({
  el: `#demo`,
  render:h=>h( Demo )
});
