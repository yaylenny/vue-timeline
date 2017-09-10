<script>
import item from "../components/item.vue";
import header from "../components/header.vue";
import form from "../components/form.vue";
import moment from "moment";

let __uid=0;

  const _uid=()=>++__uid;
  const itemMapper=( item, dateformat, monthformat )=>{
    const ret=Object.assign({
      date: null,
      content: "",
      css: null,
      icon: null,
      title: "",
      tags: []
    }, item );
    if( !item.date ) return null;
    ret.m=moment( ret.date, dateformat );
    ret.monthdisplay=ret.m.format( monthformat );
    ret.uid=_uid();
    return ret;
  }
  export default{
    props: {
      items: Array,
      dateformat:{ type: String, default: "MMMM D, YYYY"},
      monthformat:{ type: String, default: "MMMM D"},
      editable:{ type: Boolean, default: true }
    },
    data(){
      return {
        filters: [], // filters to apply to the set of items
        tempActive: false, // show the temporary item
        activeItem: 0,
        sortReverse: true,// if true newer items come first
        tempItem:{}
      };
    },
    components:{
      'timeline-item': item,
      'timeline-header': header,
      'timeline-form': form
    },
    methods:{
      cancelEdit( uid ){
        if( !uid ){
          this.tempActive=false;
          this.resetTempItem();
        }
      },
      newItem(){
        this.resetTempItem();
        this.tempActive=true;
      },
      resetTempItem(){
        [ 'title', 'date', 'icon', 'css', 'content' ].forEach( prop=>{
          this.$set( this.tempItem, prop, '' );
        })
        this.$set( this.tempItem, 'tags', []);
      },
      submitItem( formdata, id ){
        if( id ){
          console.log( 'timeline item updated!', id );
          this.$emit('update', formdata, id );
        }
        else{
          this.$emit('create', formdata );
          console.log( 'new timeline item created!');
          this.tempActive=false;
        }
      }
    },
    computed:{
      allItems(){
        return ( this.items || [] )
          .map( item=>itemMapper( item, this.dateformat, this.monthformat ))
          .filter(i=>i);
      },
      filteredItems(){
        let items=this.allItems.filter( item=>{
          // TODO: add filters
          return item;
        });
        items.sort(( a, b )=>{

          let ret=a.m.isBefore( b.m ) ? -1 : 1;
          return ret * ( this.sortReverse ? -1 : 1 );
        })
        return items;
      },
      itemGroups(){
        let years=[];
        this.filteredItems.forEach( item=>{
          let year=item.m.year();
          if( years.indexOf( year ) <0 ) years.push( year );
        });
        years.sort(( a, b )=>{
          return this.sortReverse ? ( b - a ) : ( a - b );
        });
        let groups=years.map( year=>{
          let items=this.filteredItems.filter( item=>item.m.year()===year );
          return {
            year,
            items
          }
        });
        if( this.tempActive ){
          groups.unshift({ year: false, items:[ this.tempItem ]})
        }
        return groups;

      }
    },
    created(){
      this.resetTempItem();
    },
    // mounted(){}
    // watch:{}
  }
</script>
<template>
<div class="vue-timeline">
  <p class="timeline-crown" v-if="editable" v-show="!tempActive">
    <button class="button is-success" @click="newItem">
      <span class="icon"><i class="fa fa-plus"></i></span>
      <span>Add item</span>
    </button>
  </p>
  <ul class="timeline">
    <!-- <timeline-form v-if="tempActive"
    @cancel="cancelEdit(0)"
    @submit="submitItem"
    :date="tempActive.date"
    :dateformat="dateformat"
    :monthformat="monthformat"
    :title="tempActive.title"
    :icon="tempActive.icon"
    :content="tempActive.content"
    :css="tempActive.css"
    :tags="tempActive.tags"
    :key="tempActive.content">
  </timeline-form> -->
    <template v-if="items">
      <template v-for="group in itemGroups">
        <timeline-header :header="group.year" v-if="group.year"></timeline-header>
        <timeline-item
          v-for="item in group.items"
          :monthformat="monthformat"
          :editable="editable"
          :id="item.id"
          :title="item.title"
          :date="item.date"
          :icon="item.icon"
          :content="item.content"
          :css="item.css"
          :tags="item.tags"
          :key="item.id">
        </timeline-item>
      </template>
      <timeline-header header="End"></timeline-header>
    </template>
    <slot v-else></slot>
  </ul>
</div>
</template>

<style lang="scss" src="../style/vue-timeline.scss"></style>
