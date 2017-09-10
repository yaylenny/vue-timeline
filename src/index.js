import VueTimeline from "./core/VueTimeline.vue";

export default{
  install( Vue ){
    console.log( 'installing VueTimeline');
    Vue.component('vue-timeline', VueTimeline );
  },
  VueTimeline
}
