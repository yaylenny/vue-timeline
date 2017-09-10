<script>
  export default{
    props: {
      icon: String
    },
    data(){
      return {};
    },
    components:{},
    computed:{},
    methods:{},
    created(){},
    watch:{}
  }
</script>
<template>
  <li class="timeline-marker is-32x32" :class="{ 'is-icon': icon }">
    <slot>
      <i  v-if="icon" class="fa" :class="'fa-'+icon"></i>
    </slot>
  </li>
</template>
