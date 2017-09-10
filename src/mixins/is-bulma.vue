<script>
  import _ from lodash;
  let cap=_.capitalize;
  let capMap=n=>`is${cap(n)}`;
  let dashMap=n=>`is-${n}`;
  let _colors=[ 'primary', 'info', 'warning', 'danger', 'dark', 'black', 'light', 'white'];
  let _sizes=[ 'small', 'medium', 'large'];
  let _styles=[ 'outlined', 'loading', 'disabled'];
  let colors=_colors.map( capMap );
  let sizes=_sizes.map( capMap );
  let styles=_styles.map( capMap );
  let props={
    disabled: Boolean
  };
  colors.concat( sizes ).concat( styles ).forEach( n=>{
    props[n]=Boolean;
  })
  let findLocal=( arr, component, find=true ){
    if( find ){
      let ret=arr.find( n=>component[n]);
      if( ret ) return _.kebabCase( ret );
    }
    else{
      return arr.filter( n=>this[ n )).map( _.kebabCase )
    }
  }
  export default{
    props,
    computed:{
      colorClass(){
        return findLocal( colors, this );
      },
      sizeClass(){
        return findLocal( sizes, this );
      },
      stateClass(){
        return findLocal( styles, this, false );
      },
      classNames(){
        let ret=this.stateClass;
        if( this.sizeClass ) ret.push( this.sizeClass );
        if( this.colorClass ) ret.push( this.colorClass );
        return ret;
      }
    },
    methods:{
    }
  }
</script>
