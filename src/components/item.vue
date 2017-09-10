<script>
  import marker from "./marker.vue";
  import content from "./content.vue";
  import form from "./form.vue";
  import imixin from "./item-mixin.vue";

  export default{
    mixins:[ imixin ],
    props: {
    },
    data(){
      return {
        editing: !this.id
      };
    },
    components:{
      'item-marker': marker,
      'item-content': content,
      'item-form': form
    },
    computed:{
      classNames(){
        if( this.css ){
          return [ `is-${this.css}`];
        }
      }
    },
    methods:{
      cancelEdit(){
        this.editing=false;
      },
      editItem(){
        if( this.editable ){
          this.editing=!this.editing;
        }
      },
      submitItem( formdata ){
        this.$emit( 'submit', formdata, this.id );
        this.editing=false;
      }
    },
    created(){
      console.log( 'date', this.date, 'content', this.content )
    },
    watch:{}
  }
</script>
<template>
  <li class="timeline-item" :class="classNames">
    <slot name="marker">
      <item-marker :icon="icon"></item-marker>
    </slot>
    <slot name="content">
      <item-content
        :editable="editable"
        :title="title"
        :date="date"
        :icon="icon"
        :content="content"
        :css="css"
        :tags="tags"
        @edit="editItem">
        <item-form
          slot="form"
          v-if="( editable && editing )"
          @cancel="cancelEdit"
          @submit="submitItem"
          :id="id"
          :title="title"
          :date="date"
          :icon="icon"
          :content="content"
          :css="css"
          :tags="tags"
          :key="content">
        </item-form>
      </item-content>
    </slot>
  </li>
</template>
