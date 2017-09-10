<script>
  import moment from "moment";
  import spinner from "../spinner/spinner.vue";
  // import calendar from "./calendar.vue";

  function range( num ){
    let i=0;
    let ret=[];
    while( true ){
      ret.push( i + 0 );
      if( i + 1 >= num ) break;
      i++;
    }
    return ret;
  }
  export default{
    props: {
      format:{ type: String, default: 'MMMM DD, YYYY'},
      placeholder: { default: 'Enter date', type: String },
      theme:{ type: String, default: 'default '},
      value:{}
    },
    data(){
      return {
        activeMonth:0,
        activeYear:2014,
        activeDay: 1,
        dayNames: moment.weekdaysShort() ,
        textInputValue: '',
        datepickerVisible: false,
        timer: 0
      };
    },
    components:{
      // 'datepicker-calendar': calendar
      'year-spinner': spinner
    },
    computed:{
      activeFirst(){ // 1st of activeMonth
        return moment({ year: this.activeYear, month: this.activeMonth, date: 1})
      },
      activeStart(){// 1st visible day on active calendar
        let m=moment( this.activeFirst );
        m.subtract( m.weekday(), 'days');
        return m;
      },
      activeEnd(){// last day of activeMonth
        let m=moment( this.activeLast );
        m.add( 6 - m.weekday(), 'days' );
        return m;
      },
      activeLast(){// last visible day on active calendar
        let month=this.activeMonth+1;
        let year=this.activeYear;
        if( month > 11 ){
          month=0;
          year=year+1;
        }
        return moment({ year, month, date: 1 });
      },
      activeRange(){// an array of moments representing the visible calenadr month
        let m=moment( this.activeStart );
        let end=moment( this.activeEnd );
        let arr=[];
        while( true ){
          arr.push( moment( m ));
          if( m.isBefore( end )){
            m.add( 1, "days" );
          }
          else break;
        }
        return arr;
      },
      activeCalendarRows(){
        let count=Math.ceil( this.activeRange.length / 7 );
        return range( count ).map( num=>{
          return range( 7 ).map( i=>{
            let m=this.activeRange[ 7 * num + i ];
            return {
              m,
              date: m.date(),
              current: m.month()===this.activeMonth,

            }
          });
        })
      },
      activeMonthName(){
        return moment.months()[ this.activeMonth ];
      }
    },
    methods:{
      classNames( m ){
        return [{
          'is-current': this.isCurrent( m ),
          'is-today': this.isToday( m )
        }, this.isActive( m ) ? 'is-active' : 'is-inactive' ];
      },
      inputFocus( e ){
        e.target.select();
        this.datepickerVisible=true;
      },
      inputBlur( e ){
        clearTimeout( this.timer );
        this.timer=setTimeout(()=>{
          this.datepickerVisible=false;
          clearTimeout( this.timer );
        }, 200 );
      },
      isActive( m ){
        return moment({
          year: this.activeYear,
          month: this.activeMonth,
          date: this.activeDay
        }).isSame( m, "day" );
      },
      isCurrent( m ){
        return moment({
          year: this.activeYear,
          month: this.activeMonth
        }).isSame( m, "month" );
      },
      isToday( m ){
        return moment().isSame( m, "day" );
      },
      selectMoment( m ){// user has selected `day` of activeMonth/activeYear
        let dateString=m.format( this.format );
        this.$emit("input", dateString);
        this.textInputValue=dateString;
        this.datepickerVisible=false;
      },
      jumpMonth( month ){
        let year=this.activeYear;
        if( month < 0 ){
          month=11;
          year--;
        }
        else if( month > 11 ){
          month=0;
          year++;
        }
        this.activeMonth=month;
        this.activeYear=year;
      },
      writeActiveData(){ console.log( 'writing active data')
        let m=this.value ? moment( this.value, this.format ) : moment();
        this.activeMonth=m.month();
        this.activeYear=m.year();
        this.activeDay=m.date();
        if( this.value ){
          this.textInputValue=this.value;
        }
      }
    },
    mounted(){
      this.writeActiveData();
    },
    watch:{
      value: 'writeActiveData',
      datepickerVisible( v ){ console.log( 'pickerVisible change', v );
        if( v===true ) this.writeActiveData();
      }
    }
  }
</script>
<template>
  <div class="vue-datepicker" :class="'datepicker-theme-'+theme">
    <input type="text"
      class="input"
      :value="textInputValue"
      @focus="inputFocus"
      @keyup.esc="datepickerVisible=false"
      :placeholder="placeholder" />
    <div class="datepicker-popup" v-show="datepickerVisible" @mouseup.stop="">
      <div class="calendar">
        <div class="calendar-nav">
          <div class="calendar-nav-left">
            <button class="button is-link" @click="jumpMonth( activeMonth - 1 )">
              <i class="fa fa-chevron-left"></i>
            </button>
          </div>
          <div class="level is-marginless">
            <div class="level-left">
              <div class="calendar-month">{{activeMonthName}}</div>
            </div>
            <div class="level-right">
              <year-spinner v-model="activeYear"></year-spinner>
              <!-- <input class="input" type="text" v-model="activeYear" /> -->
            </div>
          </div>
          <div class="calendar-nav-right">
            <button class="button is-link"
              @click="jumpMonth( activeMonth + 1 )">
              <i class="fa fa-chevron-right"></i>
            </button>
          </div>
        </div>
          <div class="calendar-container">
            <div class="calendar-header">
              <div class="calendar-date"
                v-for="name in dayNames">
                {{name}}
              </div>
            </div>
          </div>
          <div class="calendar-body">
            <div class="calendar-date"
              v-for="m in activeRange"
              :class="isCurrent( m ) ? 'is-active' : 'is-inactive'">
              <button class="date-item"
                @click="selectMoment( m )"
                :class="classNames( m )">
                {{m.date()}}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- <style lang="scss" src="../style/vue-date-picker.scss"></style> -->
