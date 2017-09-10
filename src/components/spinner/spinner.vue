<script>
  import moment from "moment";
  export default{
    props: {
      min:{ type: Number, default: 0 },
      max:{ type: Number, default: Infinity },
      value: Number
    },
    data(){
      return {
        tempValue: this.value,
      };
    },
    components:{},
    computed:{
    },
    methods:{
      change( mod ){
        let value=this.tempValue + mod;
        value=Math.max( this.min, value );
        value=Math.min( this.max, value );
        this.tempValue=value;
        this.$emit('input', value );
      },
    },
    created(){
    },
    watch:{}
  }
</script>
<template>
  <div class="vue-spinner">
    <input v-model="tempValue" type="text" class="input" />
    <div class="spinner-buttons">
      <a @click.prevent="change(1)">
        <i class="fa fa-chevron-up"></i>
      </a>
      <a @click.prevent="change(-1)">
        <i class="fa fa-chevron-down"></i>
      </a>
    </div>
  </div>
</template>

<style lang="scss">
  .vue-spinner{
    display: flex;
    align-items: stretch;
    .input{
      text-align: center;
      max-width: 80px;
    }
    .spinner-buttons{
      display: flex;
      flex-direction: column;
      align-items: stretch;
      padding-left: 2px;
      a{
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        min-width: 24px;
        &, &:hover, &:focus, &:link{
          text-decoration: none;
        }
        font-size: 12px;
        //padding: 0 6px;
        // border-radius: 3px;
        // border: 1px solid #ccc;
        // background: rgb(240, 240, 240);
        // color: #333;
      }
    }
  }
</style>
