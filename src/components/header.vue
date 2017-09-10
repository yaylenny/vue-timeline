<script>
  export default{
    props: {
      header: [ Number, String ]
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
  <li class="timeline-header">
    <slot>
      <span class="tag is-info is-large">{{header}}</span>
    </slot>
  </li>
</template>
