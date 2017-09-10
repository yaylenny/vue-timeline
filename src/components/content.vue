<script>
import imixin from "./item-mixin.vue";
  export default{
    mixins:[ imixin ],
    // props: {
    // },
    // data(){
    //   return {};
    // },
    // components:{},
    // computed:{},
    // methods:{},
    // created(){},
    // watch:{}
  }
</script>
<template>
  <div class="timeline-content">
    <slot name="date">
      <p class="heading" @click="$emit('edit')">{{date}}</p>
    </slot>
    <slot name="title">
      <h5 class="title is-5" v-if="title">{{title}}</h5>
      <em v-else>No title!</em>
    </slot>
    <slot>
      <p class="subtitle is-6">
        {{content}}
      </p>
    </slot>
    <slot name="form"></slot>
    <slot name="controls">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="tags">
              <span class="tag is-dark" v-for="tag in tags">{{tag}}</span>
            </div>
          </div>
          <a class="level-item"
            v-if="editable"
            @click.prevent="$emit('edit')">Edit
          </a>
        </div>
      </div>
    </slot>
  </div>
</template>
