<script>
  import dummy from "../dummy.js";
  export default{
    data(){
      return {
        items: [

        ]
      };
    },
    components:{},
    computed:{
    },
    methods:{
      createItem( data ){
        console.log( "Demo.vue creating new item")
        this.items.push( data );
      }
    },
    created(){
      this.items.push( ...dummy )
    },
    watch:{}
  }
</script>
<template>
  <div class="demo-app">
    <div class="demo-sidebar">
      <div class="demo-sidebar-section">
        <h4>Dataset</h4>
        <div class="dataset">
          <div class="dataset-item" v-for="item in items">
            <div class="dataset-entry"
              v-for="( value, prop ) in item">
              <span class="dataset-key">{{prop}}:</span>
              <span class="dataset-value">{{value}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="demo-content">
      <div class="demo-entries">
        <div class="demo-entry">
          <h3 class="title is-3">Basic timeline</h3>
          <div class="demo-row">
            <div class="demo-block">
              <div class="demo-entry-content">
                <div class="demo-wrapper">
                  <vue-timeline
                    @create="createItem"
                    :items="items">
                  </vue-timeline>
                </div>
              </div>
            </div>
            <div class="demo-block">
                <pre>
                  <code>&lt;vue-timeline :items="items"></vue-timeline>
                  </code>
                </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" src="../style/demo.scss"></style>
