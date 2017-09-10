<script>
import imixin from "./item-mixin.vue";
import datepicker from "./datepicker/datepicker.vue";

  export default{
    mixins:[ imixin ],
    props: {
      dateformat:{ type: String, default: "MMMM D, YYYY" }
    },
    data(){
      return {
        formdata:{
          title: "",
          content: "",
          date: "",
          icon: "",
          css: "",
          tags: []
        }
      };
    },
    components:{
      datepicker
    },
    computed:{
      isValid(){
        let { content, date }=this.formdata;
        return !!( content && date );
      }
    },
    methods:{
      cancel(){
        this.$emit('cancel');
      },
      submit(){
        console.log( 'submit form - valid?', this.isValid, this.formdata );
        if( this.isValid ){
          this.$emit('submit', this.formdata, this.id );
        }
      },
      writeFormData(){
        Object.keys( this.$props ).forEach( prop=>{
          this.formdata[ prop ]=this[ prop ];
        })
      }
    },
    mounted(){
      this.writeFormData();
    },
    watch:{}
  }
</script>
<template>
  <div class="timeline-form message"
      :class="id ? 'is-light' : 'is-info'">
    <div class="message-header">
      <p>{{ id ? 'Update' : 'Create'}} item</p>
      <button class="delete" @click="$emit('cancel')"></button>
    </div>
    <div class="message-body">
      <div class="field">
        <label class="label">Title</label>
        <div class="control">
          <input type="text" class="input" v-model="formdata.title"
          placeholder="e.g. Went to hospital with broken arm" />
        </div>
      </div>
      <div class="field">
        <label class="label">Date</label>
        <div class="control">
          <datepicker
            :dateformat="dateformat"
            v-model="formdata.date">
          </datepicker>
        </div>
      </div>
      <div class="field">
        <label class="label">Description <em>(markdown)</em></label>
        <div class="control">
          <textarea class="textarea" v-model="formdata.content"
          placeholder="Add details here..."></textarea>
        </div>
      </div>
      <div class="field is-grouped is-grouped-right">
        <div class="control">
          <button class="button" @click.prevent="cancel">Cancel</button>
        </div>
        <div class="control">
          <button class="button is-info" @click.prevent="submit">Submit</button>
        </div>
      </div>
    </div>

  </div>
</template>
